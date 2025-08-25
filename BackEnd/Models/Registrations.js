const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    festid:{
         type: mongoose.Schema.Types.ObjectId,
        ref: "Fest",
        required: true
    }
}, { timestamps: true });

// Prevent duplicate registration for the same event by same user
registrationSchema.index({ user: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
