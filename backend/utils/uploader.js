const multer = require("multer");//importing multer to fetch images from requests
const path = require("path"); //importing path to fetch images from uploads folder

const storage = multer.diskStorage({
  destination: function (req, file, cb) {cb(null, "uploads/")},//defining destionation from where multer should take images from
  filename: function (req, file, cb) {const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9); cb(null , uniqueName + path.extname(file.originalname))} //creating filename for multer images
});

const uploader = multer({ storage });//passing storage data to mmulter to format it

module.exports = uploader;//exporting utility