const express=require("express");
const User = require("../Models/User");
const userRouter=express.Router();
const bcrypt=require("bcrypt");
const userAuth = require("../Middlewares/userAuth");

userRouter.post("/signup",async(req,res)=>{
    try{
        const {name,emailId,password,number,college,branch,Year}=req.body;
        const user1=await User.findOne({emailId});
        if(user1)
        {
            throw new Error("User Exists");
        }

        const hashPwd=await bcrypt.hash(password,10);

        const user=new User({
            name,emailId,password:hashPwd,number,college,branch,Year
        })
        await user.save();

        const token=await user.getJwt();
        res.cookie("token",token,  {
  httpOnly: true,
  secure: true, // set to true in production (https)
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000 // 1 day
})
res.json({data:user,message:"signup success"});

    }
    catch(error)
    {
        console.log(error.message);
        res.status(400).json({message:error.message});
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId});
        if(!user)
            {
                throw new Error("User Not found");
            } 

            const check=await user.validatePassword(password);
            if(!check)
            {
                throw new Error("Invalid credentials");
            }
            const token=await user.getJwt();
            res.cookie("token",token, {
  httpOnly: true,
  secure: true, // set to true in production (https)
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000 // 1 day
})

            res.status(200).json({data:user,message:"Login Success"})

    }
    catch(error)
    {
        console.log(error.message);
        res.status(400).json({messgae:error.message});
    }
})
userRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user1=await User.findById(user._id)

    res.status(200).json({ data: user1, message: "Profile" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

userRouter.put('/profile/edit', userAuth, async (req, res) => {
  try {
    const { name, emailId, college, number, branch, Year } = req.body;

    // Basic validation
    if (!name || !emailId || !college || !number) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, college, and phone number are required'
      });
    }
// Convert to number explicitly
const parsedNumber = Number(number);

if (!parsedNumber || isNaN(parsedNumber)) {
  return res.status(400).json({ message: "Number must be valid" });
}

if (parsedNumber.toString().length !== 10) {
  return res.status(400).json({ message: "Number must be 10 digits" });
}


    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    

    // Find current user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Ensure this is not an admin trying to use user route
    if (user.admin === true) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Use admin edit endpoint.'
      });
    }

    // For students, validate academic fields
    if (user.admin === false) {
      if (!branch || !Year) {
        return res.status(400).json({
          success: false,
          message: 'Branch and Year are required for students'
        });
      }

      // Validate Year options
      const validYears = ["First","Second","Third","Final","Other"];
      if (!validYears.includes(Year)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid year. Must be 1st Year, 2nd Year, 3rd Year, or 4th Year'
        });
      }
    }

    // Check if email is already taken by another user
    if (emailId !== user.emailId) {
      const existingUser = await User.findOne({ 
        emailId: emailId.toLowerCase(), 
        _id: { $ne: req.user.id } 
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered with another account'
        });
      }
    }

    // Check if phone number is already taken by another user
  
    // Prepare update data
    const updateData = {
      name: name.trim(),
      emailId: emailId.toLowerCase().trim(),
      college: college.trim(),
      number,
      updatedAt: new Date()
    };

    // Add academic fields for students
    if (user.admin === false) {
      updateData.branch = branch.trim();
      updateData.Year = Year;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { 
        new: true, 
        runValidators: true,
        select: '-password' // Exclude password from response
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'Failed to update user profile'
      });
    }

    // Return updated profile data
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        emailId: updatedUser.emailId,
        college: updatedUser.college,
        number: updatedUser.number,
        branch: updatedUser.branch,
        Year: updatedUser.Year,
        admin: updatedUser.admin || false,
        updatedAt: updatedUser.updatedAt
      }
    });

  } catch (error) {
    console.error('Update user profile error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});





module.exports=userRouter;