const express=require("express");
const bcrypt=require("bcrypt");
const Admin = require("../Models/Admin");
const adminRouter=express.Router();
const adminAuth=require("../Middlewares/adminAuth")

adminRouter.post("/signup",async (req,res)=>{
    const {name,emailId,password,number,college}=req.body;
    const admindup=await Admin.findOne({emailId});
    try{
        if(admindup)
        {
          return res.status(409).json({ message: "User Exists!" });
        }
        const hashpwd=await bcrypt.hash(password,10);
        const admin1=new Admin({
            name,
            emailId,
            password:hashpwd,
            number,
            college
        });
       await admin1.save();

       const token=await admin1.getJWT();
     res.cookie("token", token,  {
  httpOnly: true,
  secure: true, // set to true in production (https)
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});
       res.send(admin1);

    }
    catch(error)
    {
        console.log(error.message);
        res.status(400).json({ message: "Please provide all required fields." });
    }
})
adminRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const admin1 = await Admin.findOne({ emailId });
        if (!admin1) {
            return res.status(404).json({ message: "No User Found!" });
        }

        const check = await admin1.validatePassword(password);
        if (!check) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = await admin1.getJWT();
        res.cookie("token", token,  {
  httpOnly: true,
  secure: true, // set to true in production (https)
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

        res.status(200).json({ data: admin1, message: "Login success" });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: error.message});
    }
});
adminRouter.get("/profile", adminAuth, async (req, res) => {
  try {
    const user = req.admin;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: user, message: "Profile" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


adminRouter.put('/profile/edit', adminAuth, async (req, res) => {
  try {
    const { name, emailId, college, number } = req.body;

    // Basic validation
    if (!name || !emailId || !college || !number) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, college, and phone number are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Phone validation
    // const phoneRegex = /^\d{10}$/;
    // const cleanNumber = number.replace(/\D/g, '');
    // if (!phoneRegex.test(cleanNumber)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Phone number must be 10 digits'
    //   });
    // }


    // Find current admin
    const admin = await Admin.findById(req.admin.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    if (admin.admin !== true) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    // Check if email is already taken by another user
    if (emailId !== admin.emailId) {
      const existingUser = await Admin.findOne({ 
        emailId: emailId.toLowerCase(), 
        _id: { $ne: req.admin.id } 
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered with another account'
        });
      }
    }

const cleanNumber = number.toString().replace(/\D/g, ""); // remove non-digits
if (cleanNumber.length !== 10) {
  return res.status(400).json({ message: "Number must be 10 digits" });
}


    // Prepare update data (exclude student-specific fields)
    const updateData = {
      name: name.trim(),
      emailId: emailId.toLowerCase().trim(),
      college: college.trim(),
      number: Number(cleanNumber),
      updatedAt: new Date()
    };

    // Update admin profile
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.admin.id,
      updateData,
      { 
        new: true, 
        runValidators: true,
        select: '-password' // Exclude password from response
      }
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Failed to update admin profile'
      });
    }

    // Return updated profile data
    res.status(200).json({
      success: true,
      message: 'Admin profile updated successfully',
      data: {
        id: updatedAdmin._id,
        name: updatedAdmin.name,
        emailId: updatedAdmin.emailId,
        college: updatedAdmin.college,
        number: updatedAdmin.number,
        admin: updatedAdmin.admin,
        updatedAt: updatedAdmin.updatedAt
      }
    });

  } catch (error) {
    console.error('Update admin profile error:', error);
    
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





module.exports=adminRouter;