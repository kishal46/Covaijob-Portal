import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../Home/Footer";
import "./CompleteProfile.css";

const CompleteProfile = () => {
  const [user, setUser] = useState({ userName: "", email: "" });
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [discription, setDiscription] = useState("");
  const [resume, setResume] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRaw = localStorage.getItem("user");
    if (!storedRaw) return navigate("/login");

    const storedUser = JSON.parse(storedRaw);
    setUser({ userName: storedUser.userName || "", email: storedUser.email || "" });

    const storedDetailsRaw = localStorage.getItem("jobSeekerDetails");
    if (storedDetailsRaw) {
      const storedDetails = JSON.parse(storedDetailsRaw);

      // Match only if logged-in email is same as profile details email
      if (storedDetails.email === storedUser.email) {
        setExperience(storedDetails.experience || "");
        setSkills(storedDetails.skills || []);
        setLocation(storedDetails.location || "");
        setPhoneNumber(storedDetails.phoneNumber || "");
        setDiscription(storedDetails.discription || "");
      }
    }
  }, [navigate]);

  const handleUserChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSkillInput = (e) => {
    if ((e.key === "Enter" || e.key === " ") && inputSkill.trim() && !isSubmitted) {
      e.preventDefault();
      const skill = inputSkill.trim();
      if (!skills.includes(skill)) setSkills([...skills, skill]);
      else toast.warning("Skill already added");
      setInputSkill("");
    }
  };

  const handleSkillDelete = (skillToRemove) => {
    if (!isSubmitted) {
      setSkills(skills.filter((skill) => skill !== skillToRemove));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const userId = user.email;
    if (!userId) {
      toast.error("Invalid user data — please log out and log back in.");
      setIsSubmitted(false);
      return;
    }

    const fd = new FormData();
    fd.append("userId", userId);
    fd.append("name", user.userName);
    fd.append("email", user.email);
    fd.append("experience", experience);
    fd.append("skills", JSON.stringify(skills));
    fd.append("location", location);
    fd.append("phoneNumber", phoneNumber);
    fd.append("discription", discription);
    if (resume) fd.append("resume", resume);
    if (profilePicture) fd.append("profilePicture", profilePicture);

    try {
      const { data } = await axios.post(
        "http://localhost:3001/jobseeker/profile/details",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success("Profile saved!", { autoClose: 2000 });
        localStorage.setItem("jobSeekerDetails", JSON.stringify(data.jobSeeker));
        setTimeout(() => navigate("/finddev"), 2500);
      } else {
        toast.error(data.message || "Failed to save profile");
        setIsSubmitted(false);
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Error saving profile");
      setIsSubmitted(false);
    }
  };

  return (
    <div className="main-container">
      <ToastContainer position="top-right" />
      <div className="container py-5">
        <div className="card p-4 profile-card mx-auto shadow-lg">
          <h3 className="text-center mb-4 text-primary fw-bold">Complete Your Profile</h3>
          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-4">

              {/* Name */}
              <div className="col-md-6 form-group">
                <label htmlFor="userName" className="form-label">
                  <i className="bi bi-person-fill me-2"></i>Name
                </label>
                <input
                  id="userName"
                  type="text"
                  name="userName"
                  className="form-control form-control-lg"
                  placeholder="Your full name"
                  value={user.userName}
                  onChange={handleUserChange}
                  disabled={isSubmitted}
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6 form-group">
                <label htmlFor="email" className="form-label">
                  <i className="bi bi-envelope-fill me-2"></i>Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Your email address"
                  value={user.email}
                  onChange={handleUserChange}
                  disabled={isSubmitted}
                  required
                />
              </div>

              {/* Experience */}
              <div className="col-md-6 form-group">
                <label htmlFor="experience" className="form-label">
                  <i className="bi bi-briefcase-fill me-2"></i>Experience (years)
                </label>
                <input
                  id="experience"
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Years of experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  disabled={isSubmitted}
                  min={0}
                  required
                />
              </div>

              {/* Location */}
              <div className="col-md-6 form-group">
                <label htmlFor="location" className="form-label">
                  <i className="bi bi-geo-alt-fill me-2"></i>Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={isSubmitted}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="col-md-6 form-group">
                <label htmlFor="phoneNumber" className="form-label">
                  <i className="bi bi-telephone-fill me-2"></i>Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  className="form-control form-control-lg"
                  placeholder="Your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isSubmitted}
                  required
                />
              </div>

              {/* Description */}
              <div className="col-12 form-group">
                <label htmlFor="discription" className="form-label fw-bold">
                  Profile Description
                </label>
                <textarea
                  id="discription"
                  className="form-control"
                  placeholder="Write a short description about yourself"
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  rows={4}
                  disabled={isSubmitted}
                  required
                />
              </div>

              {/* Skills */}
              <div className="col-md-6 form-group">
                <label htmlFor="inputSkill" className="form-label">
                  <i className="bi bi-lightning-charge-fill me-2"></i>Add Skills
                </label>
                <input
                  id="inputSkill"
                  type="text"
                  className="form-control form-control-lg"
                  value={inputSkill}
                  onChange={(e) => setInputSkill(e.target.value)}
                  onKeyDown={handleSkillInput}
                  placeholder="Type skill and press Enter/Space"
                  disabled={isSubmitted}
                />
                <div className="mt-2 skill-badges">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge bg-primary me-2 mb-2 d-inline-flex align-items-center skill-badge"
                      style={{ cursor: isSubmitted ? "default" : "pointer" }}
                    >
                      {skill}
                      {!isSubmitted && (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger ms-2 p-0 d-flex align-items-center justify-content-center"
                          style={{ width: "1.2rem", height: "1.2rem", borderRadius: "50%" }}
                          onClick={() => handleSkillDelete(skill)}
                        >
                          ✕
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resume Upload */}
              <div className="col-md-6 form-group">
                <label htmlFor="resume" className="form-label fw-bold">Upload Resume (PDF)</label>
                <input
                  id="resume"
                  type="file"
                  className="form-control"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept=".pdf"
                  disabled={isSubmitted}
                />
              </div>

              {/* Profile Picture Upload */}
              <div className="col-md-6 form-group">
                <label htmlFor="profilePicture" className="form-label fw-bold">Upload Profile Picture</label>
                <input
                  id="profilePicture"
                  type="file"
                  className="form-control"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  accept="image/*"
                  disabled={isSubmitted}
                />
              </div>

            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-success btn-lg px-5 py-2 rounded-pill"
                disabled={isSubmitted}
              >
                Save Profile
              </button>
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompleteProfile;
