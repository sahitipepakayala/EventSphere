// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config()

const cloud_name =process.env.CLOUDNAME
const api_key =process.env.API_KEY
const api_secret =process.env.API_SECRET

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});




const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "eventsphere",
    allowed_formats: ["jpeg", "png", "jpg", "webp"],
  },
});

module.exports = { cloudinary, storage };
