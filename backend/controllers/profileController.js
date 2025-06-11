const JobSeeker = require('../models/JobSeeker');

exports.saveProfile = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      experience,
      skills,
      location,
      phoneNumber,
    } = req.body;

    let parsedSkills = [];
    try {
      parsedSkills = JSON.parse(skills); // expecting a JSON string
    } catch (err) {
      console.log("Failed to parse skills:", err);
    }

    const resume = req.files?.resume?.[0]?.filename || '';
    const profilePicture = req.files?.profilePicture?.[0]?.filename || '';

    const newProfile = new JobSeeker({
      userId,
      name,
      email,
      experience,
      skills: parsedSkills,
      location,
      phoneNumber,
      resume,
      profilePicture,
    });

    await newProfile.save();

    res.status(200).json({ success: true, jobSeeker: newProfile });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ success: false, message: "Failed to save profile" });
  }
};
