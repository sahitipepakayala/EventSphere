const jwt=require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();
const userAuth=async(req,res,next)=>{
    try{
    const token=req.cookies.token;
    if(!token)
    {
         throw new Error("No token found");
    }
    const decode=jwt.verify(token,process.env.TOKEN);
    const user=await User.findById(decode._id);
    if(!user)
    {
        throw new Error("Not an authenticated user");
    }
    req.user=user;
    next();
    }
    catch(error)
    {
        console.log(error.message);
        res.status(401).send(error.message);
    }
}

module.exports=userAuth;