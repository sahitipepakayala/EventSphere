const express = require("express");
const Admin = require("../Models/Admin");
const Fest = require("../Models/Fests");
const adminAuth = require("../Middlewares/adminAuth");
const Event = require("../Models/Event");
const Registrations = require("../Models/Registrations");
const upload = require("../Middlewares/multer");
const uploadImage = require("../cloudinary"); // Cloudinary helper

const festRouter = express.Router();
// Example: /fest/all?search=astra
festRouter.get("/all", async (req, res) => {
  try {
    const search = req.query.search;

    let fests;
    if (!search || search.trim() === "" || search.toLowerCase() === "all") {
      // No search term – fetch all fests
      fests = await Fest.find();
    } else {
      // Search with regex (case-insensitive)
      fests = await Fest.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { college: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      });
    }
    if(fests.length==0)
    {
      throw new Error ("No results found");
    }

    res.status(200).json(fests);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message:err.message });
  }
});
// Create New FestfestRouter.post("/new", adminAuth, upload.single("image"), async (req, res) => {
 festRouter.post("/new", adminAuth, upload.single("image"), async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) return res.status(400).send("You are not authorized");

    const { name, college, date, location } = req.body;
    if (!name || !college || !date || !location)
      return res.status(400).send("All fields are required");

    if (!req.file) return res.status(400).send("Image is required");

    const imageUrl = req.file.path;

    const fest = new Fest({
      festAdmin: admin._id,
      name,
      college,
      date,
      location,
      image: imageUrl,
    });

    await fest.save();
    res.status(200).json({ data: fest, message: "Fest added successfully" });

  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// Edit FestfestRouter.put("/:id/edit", adminAuth, upload.single("image"), async (req, res) => {
festRouter.put("/:id/edit", adminAuth, upload.single("image"), async (req, res) => {
  try {
    const { name, college, date, location } = req.body;
    const { id } = req.params;

    const fest = await Fest.findById(id);
    if (!fest) return res.status(404).send("Fest not found");

    const admin = req.admin._id;
    if (admin.toString() !== fest.festAdmin.toString())
      return res.status(403).send("You are not authorized");

    if (name) fest.name = name;
    if (college) fest.college = college;
    if (date) fest.date = date;
    if (location) fest.location = location;

    if (req.file) {
      const imageUrl = req.file.path;
      fest.image = imageUrl;
    }

    await fest.save();
    res.status(200).json({ data: fest, message: "Fest updated successfully" });

  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Delete Fest + Events + Registrations
festRouter.delete("/:id/delete", adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const fest = await Fest.findById(id);
        if (!fest) return res.status(404).send("Fest not found");

        if (req.admin._id.toString() !== fest.festAdmin.toString())
            return res.status(403).send("You are not the fest admin");

        await Fest.findByIdAndDelete(id);
        await Event.deleteMany({ festId: id });
        await Registrations.deleteMany({ festid: id });

        res.status(200).send("Deleted fest and all related events/registrations");

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

// Get All Fests
festRouter.get("/allFests", async (req, res) => {
    try {
        const fests = await Fest.find().sort({ date: -1 });
        if (!fests.length) return res.status(404).send("No fests found");
        res.status(200).json({ data: fests });

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

// Get Fest by ID
festRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const fest = await Fest.findById(id);
        if (!fest) return res.status(404).send("Fest not found");
        res.status(200).send(fest);

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

// Get Fests by Admin
festRouter.get("/author/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const fests = await Fest.find({ festAdmin: id });
        if (!fests.length) return res.status(404).send("No fests found");
        res.status(200).json({ data: fests, message: "Fests created by you" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});


module.exports = festRouter;
