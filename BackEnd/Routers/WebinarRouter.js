const express=require("express");
const Webinar = require("../Models/Webinar");
const adminAuth = require("../Middlewares/adminAuth");
const upload = require("../Middlewares/multer");
const WebReg = require("../Models/WebReg");
const userAuth = require("../Middlewares/userAuth");
const webinarRouter=express.Router();


webinarRouter.get("/myRegistrations",userAuth,async(req,res)=>{
    try{
        const user=req.user._id;
        const regs=await WebReg.find({user}).populate("webinar","name location date registrationFee image");
        if(regs.length==0)
        {
            return res.status(500).send("Still not registered for any webinar");
        }
        res.status(200).json({data:regs,message:"My Registrations"})

    }
    catch(error)
    {
        console.log(error);
    }
})

webinarRouter.get("/all",async(req,res)=>{
    try{
        const web=await Webinar.find().sort({date:-1});
        if(web.length==0)
            return res.status(500).send("No webinars found");
        res.status(200).json({data:web,message:"All Webinars"});
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

webinarRouter.get("/myWebinars", adminAuth, async (req, res) => {
  try {
    const webinars = await Webinar.find({ webAdmin: req.admin._id }).sort({ date: -1 });
    res.status(200).json({ data: webinars, message: "My Webinars" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});



webinarRouter.post("/newWebinar",adminAuth,upload.single("image"),async(req,res)=>{
    try{
        const admin=req.admin._id;
        const {name,description,college,location,date,registrationFee}=req.body;
        if(!name || !description || !college || !location || !date)
        {
            return res.status(500).send("All fields are required");
        }
        const webi=await Webinar.findOne({name,date,college});
        if(webi)
        {
            return res.status(200).send("Webinar already exists")
        }
        const imageUrl=req.file.path;

        const web1=new Webinar({
            name,
            description,college,
            location,
            date,
            registrationFee,
            webAdmin:admin,
            image:imageUrl
        })

        await web1.save();

        res.status(200).json({data:web1,message:"Added Successfully"})
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

webinarRouter.put("/:id/edit",adminAuth,upload.single("image"),async(req,res)=>{
    try{
        const {id}=req.params;
        const admin=req.admin._id;
        const web=await Webinar.findById(id);
        if(!web)
        {
            return res.status(500).send("No webinar found");
        }
        if(admin.toString()!=web.webAdmin.toString()){
          return res.status(500).send("You are not admin");   
        }
        const {name,description,college,location,date,registrationFee}=req.body;

        web.name=name;
        web.description=description;
        web.location=location;
        web.date=date;
        web.college=college;
        web.registrationFee=registrationFee;
        if(req.file)
        {
            web.image=req.file.path;
        }
        await web.save();
         res.status(200).json({data:web,message:"Updated Successfully"})

    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

webinarRouter.delete("/:id/delete",adminAuth,async(req,res)=>{
    try{
        const {id}=req.params;
        const admin=req.admin._id;
        const web=await Webinar.findById(id);

        if(admin.toString()!=web.webAdmin.toString())
        {
            return res.status(500).send("You are not the admin");
        }
        await WebReg.deleteMany({webinar:id});

        await Webinar.findByIdAndDelete(id);
        res.status(200).send("Deleted successfully")

    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})


webinarRouter.get("/:id",async(req,res)=>{
    try{

        const {id}=req.params;
        const web=await Webinar.findById(id);
        if(!web)
        {
            return res.status(500).send("No webinar found");
        }
        res.status(200).send(web);
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})


module.exports=webinarRouter