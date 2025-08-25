const express = require("express");
const Event = require("../Models/Event");
const adminAuth = require("../Middlewares/adminAuth");
const Fest = require("../Models/Fests");
const upload = require("../Middlewares/multer"); // uses memoryStorage
const uploadImage = require("../cloudinary"); // your cloudinary helper
const Registrations = require("../Models/Registrations");

const eventRouter = express.Router();

// Get all events
eventRouter.get("/all", async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        if (!events.length) return res.status(404).send("No events found");
        res.status(200).json({ data: events, message: "All Events data" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

// Get single event by ID
eventRouter.get("/getEvent/:id", async (req, res) => {
    try {
      const{id}=req.params;
        const event = await Event.findById(id).populate("festId","name");
        if (!event) return res.status(404).send("No event found");
        res.status(200).json({ data: event, message: "Event data" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

// Get all events of a fest by category
eventRouter.get("/:id/allEvents/:category", async (req, res) => {
    try {
        const { id, category } = req.params;
        const events = await Event.find({ festId: id, category });
        if (!events.length) return res.status(404).send("No events found");
        res.status(200).json({ data: events, message: "All events of the fest" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

// Create new event (with image)
eventRouter.post("/:id/newEvent", adminAuth, upload.single("image"), async (req, res) => {
  try {
    const admin = req.admin;
    const { id } = req.params;
    const { name, description, date, category } = req.body;

    if (!name || !description || !date || !category || !req.file)
      return res.status(400).send("All fields including image are required");

    const fest = await Fest.findById(id);
    if (!fest) return res.status(404).json({ message: "Fest not found" });

    const existingEvent = await Event.findOne({ name, date });
    if (existingEvent)
      return res.status(409).json({ message: "An event with same name and date already exists" });

    const imageUrl = req.file.path; // ✅ from multer-storage-cloudinary

    const event = new Event({
      festId: id,
      name,
      description,
      college: fest.college,
      location: fest.location,
      date,
      category,
      eventAdmin: admin._id,
      image: imageUrl,
    });

    await event.save();
    res.status(200).json({ data: event, message: "Successfully added an event" });

  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Edit event
eventRouter.put("/:id/edit", adminAuth, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date, category } = req.body;

    const updatedFields = {
      name,
      description,
      date,
      category,
    };

    if (req.file) {
      updatedFields.image = req.file.path; // ✅ Cloudinary image URL
    }

    const event = await Event.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ data: event, message: "Successfully updated the event" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Delete event
eventRouter.delete("/:id/delete", adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const adminId = req.admin._id;
        const event = await Event.findById(id);

        if (!event) return res.status(404).send("Event not found");

        if (event.eventAdmin.toString() !== adminId.toString())
            return res.status(403).send("You are not authorized to delete this event");

        await Event.findByIdAndDelete(id);
        res.status(200).send("Event successfully deleted");

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

// Get events by category
eventRouter.get("/category/:category", async (req, res) => {
    try {
        const events = await Event.find({ category: req.params.category });
        if (!events.length) return res.status(404).send("No events in this category");
        res.status(200).json({ data: events, message: `Events in category '${req.params.category}'` });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

// Get upcoming events
eventRouter.get("/upcoming", async (req, res) => {
    try {
        const today = new Date();
        const events = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
        res.status(200).json({ data: events, message: "Upcoming events" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

eventRouter.get("/registrations/:id",async(req,res)=>{
  try{
    const {id}=req.params();
    const reg=await Registrations.find({eventId:id});
    if(reg.length==0)
    {
      return res.status(200).send("No registrations for the event yet!");
    }
    res.statusCode(200).json({message:"Registrations for the event",data:reg});

  }
  catch(error)
  {
    console.log(error.message);
  }
})

module.exports = eventRouter;
