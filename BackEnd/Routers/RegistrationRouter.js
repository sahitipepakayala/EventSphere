const express=require("express");
const userAuth = require("../Middlewares/userAuth");
const User = require("../Models/User");
const Registrations = require("../Models/Registrations");
const Event = require("../Models/Event");
const adminAuth = require("../Middlewares/adminAuth");
const regRouter=express.Router();

regRouter.get("/registeredEvents", userAuth, async (req, res) => {
    try {
        const userId = req.user._id;

        // Populate complete event details
        const registrations = await Registrations.find({ user: userId }).populate("eventId");

        if (registrations.length === 0) {
            return res.status(200).json({ data: [], message: "No events registered" });
        }

        // Extract populated event data
        const events = registrations.map(reg => reg.eventId);

        res.status(200).json({ data: events, message: "Registered event details" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

regRouter.post("/:id/newRegistration",userAuth,async(req,res)=>{
    try{
        const user=req.user._id;
        const {id}=req.params;
        const alreadyRegistered = await Registrations.findOne({ user: user, eventId: id });
        if (alreadyRegistered) {
            return res.status(200).json({data:alreadyRegistered, message: "Already registered for this event" });
        }
        const event1=await Event.findById(id)
        if(!event1)
        {
              return res.status(409).json({ message: "No event found" });
        }

        const reg=new Registrations({
            user,
            eventId:id,
            festid:event1.festId
        })
        await reg.save();
        res.status(200).json({message:"registerd Succesfully",data:reg})
    }
    catch(error)
    {
       console.log(error.message);
        res.status(500).send(error.message);  
    }
})

regRouter.delete("/unregister/:id", userAuth, async (req, res) => {
    try {
        const { id } = req.params; // id is eventId
        const userId = req.user._id;

        const reg = await Registrations.findOne({ eventId: id, user: userId });
        if (!reg) {
            return res.status(404).send("Registration not found");
        }

        if (userId.toString() !== reg.user.toString()) {
            return res.status(400).send("You are not the registered user");
        }

        await Registrations.findByIdAndDelete(reg._id);
        res.status(200).send("Unregistered for the event");
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

regRouter.get("/count/:id",adminAuth,async(req,res)=>{
    try{
        const {id}=req.params;
        const regCount=await Registrations.countDocuments({festid:id});
        const registrations=await Registrations.find({festid:id}).populate("eventId","name").populate("user","name emailId")

        const grouped={};
        registrations.forEach((reg)=>{
            const eventname=reg.eventId.name;
            if(!grouped[eventname])
                grouped[eventname]=[];

            grouped[eventname].push({
                username:reg.user.name,
                emailId:reg.user.emailId
            })
        })
        res.json({regCount:regCount,eventRegistrations:grouped});

    }
    catch(error)
    {
        console.log(error.message);
    }
})


module.exports=regRouter;

