//import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2;
// const multer = require("multer");
// const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Creating uploads folder if not already present 
// In "uploads" folder we will temporarily upload 
// image before uploading to cloudinary 
// if (!fs.existsSync("./uploads")) {
//     fs.mkdirSync("./uploads");
// }

// Multer setup 
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

module.exports = {
    // storage,
    cloudinary
}
