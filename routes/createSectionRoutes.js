const express = require("express");
const path = require('path');
const fs = require('fs');
const router = express.Router();
const {
  getAddSectionView,
  addSectionToDB,getSectionByType,getSectionByTypeID
} = require("../controllers/addSectionController");

const multer = require("multer");

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDirectory = path.join(__dirname, "..", "public", "images", "section_thumbnails");
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Define your routes
router.get("/", getAddSectionView);
router.post("/post", upload.single("image"), addSectionToDB);
router.get("/api/get_section/:sectionType", getSectionByType);
router.get("/api/get_section/:section_type/:section_id", getSectionByTypeID);

module.exports = router;
