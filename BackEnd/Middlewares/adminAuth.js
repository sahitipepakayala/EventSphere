const jwt=require("jsonwebtoken");
const Admin=require("../Models/Admin");
require("dotenv").config();
const adminAuth=async (req,res,next)=>{
    try{
    const token=req.cookies.token;
    if(!token)
    {
       return res.status(400).send("No tokem found");
    }
    const decode=jwt.verify(token,process.env.TOKEN);
    const admin=await Admin.findById(decode._id);
    if(!admin)
    {
         return res.status(400).send("You are not a admin");
    }
    req.admin=admin;
    next();
}
catch(error)
{
    console.log(error.message);
    res.status(400).send(error.message)
}
}
module.exports= adminAuth;