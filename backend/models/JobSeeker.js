const mongoose = require("mongoose");

const jobSeekerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  email: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  location: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  discription: {  
    type: String,
    required: true
  },
  resume: {
    type: String
  },
  profilePicture: {
    type: String 
  }
}, { timestamps: true });

module.exports = mongoose.model("JobSeeker", jobSeekerSchema);
