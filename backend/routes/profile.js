const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const JobSeeker = require("../models/JobSeeker");

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

// POST route for profile submission
router.post(
  "/profile/details",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        userId,
        name,
        email,
        experience,
        skills,
        location,
        phoneNumber,
        discription,
      } = req.body;

      if (!userId || !name || !email) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields" });
      }

      const resume = req.files?.resume ? req.files.resume[0].filename : null;
      const profilePicture = req.files?.profilePicture
        ? req.files.profilePicture[0].filename
        : null;

      const jobSeekerData = {
        userId,
        name,
        email,
        experience,
        skills: skills ? JSON.parse(skills) : [],
        location,
        phoneNumber,
        resume,
        profilePicture,
        discription, // ✅ Now included
      };

      const jobSeeker = await JobSeeker.findOneAndUpdate(
        { userId },
        jobSeekerData,
        { new: true, upsert: true }
      );

      res.json({ success: true, jobSeeker });
    } catch (error) {
      console.error("Profile save error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// GET all profiles
router.get("/profiles/all", async (req, res) => {
  try {
    const profiles = await JobSeeker.find({});
    res.json({ success: true, profiles });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET profile by ID
router.get("/profiles/:id", async (req, res) => {
  try {
    const profile = await JobSeeker.findById(req.params.id); // ✅ Fixed model name
    if (!profile)
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });

    res.json({ success: true, profile });
  } catch (error) {
    console.error("Error fetching profile by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE profile by ID
router.delete("/profiles/delete/:id", async (req, res) => {
  try {
    const profileId = req.params.id;

    const profile = await JobSeeker.findById(profileId);
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    if (profile.resume) {
      const resumePath = path.join(uploadsDir, profile.resume);
      if (fs.existsSync(resumePath)) fs.unlinkSync(resumePath);
    }

    if (profile.profilePicture) {
      const picPath = path.join(uploadsDir, profile.profilePicture);
      if (fs.existsSync(picPath)) fs.unlinkSync(picPath);
    }

    await JobSeeker.findByIdAndDelete(profileId);

    res.json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
