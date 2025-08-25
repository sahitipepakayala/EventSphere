const express=require("express");
const webinarRegRouter=express.Router();
const userAuth=require("../Middlewares/userAuth");
const Webinar = require("../Models/Webinar");
const WebReg = require("../Models/WebReg");
const adminAuth = require("../Middlewares/adminAuth");

webinarRegRouter.post("/register/:id",userAuth,async(req,res)=>{
    try{
        const {id}=req.params;
        const user=req.user;
        const reg=await WebReg.findOne({user:user._id,webinar:id})
        if(reg)
        {
            return res.send("Already Registered");
        }
        const newReg=new WebReg({
            user:user._id,
            webinar:id
        })
        await newReg.save();
        res.status(200).json({message:"Registered Succesfully",data:newReg});
    }
    catch(error)
    {
        console.log(error.message)
    }

})


webinarRegRouter.delete("/delete/:id",userAuth,async(req,res)=>{
    try{
        const {id}=req.params;
     const deletereg = await WebReg.findById(id);
if (!deletereg) {
  return res.status(404).json({ message: "Registration not found" });
}
if (deletereg.user.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "Unauthorized" });
}
await WebReg.findByIdAndDelete(id);
res.status(200).json({ message: "Unregistered Successfully" });

    }
    catch(error)
    {
        console.log(error);
    }
})

webinarRegRouter.get("/allRegistrations/:id",adminAuth,async(req,res)=>{
    try{
        const admin=req.admin._id;
        const {id}=req.params;
        const web=await Webinar.findById(id);
        if(admin.toString()!=web.webAdmin.toString())
        {
             return res.status(403).send("You are not authorized to view registrations!");
        }
        const regs=await WebReg.find({webinar:id}).populate("user" ,"name emailId").populate("webinar","name");
        res.status(200).json({message:"Registraitons for the webinar",data:regs});

    }
    catch(error)
    {
        console.log(error.message);
    }
})



webinarRegRouter.get("/count/:webinarId", adminAuth, async (req, res) => {
  try {
    const count = await WebReg.countDocuments({ webinar: req.params.webinarId });
    res.status(200).json({ count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports=webinarRegRouter;