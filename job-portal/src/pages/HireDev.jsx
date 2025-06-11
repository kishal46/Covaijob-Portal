import React, { useState } from "react";
import axios from "axios";
import "../CSS/DeveloperHiringForm.css";

const DeveloperHiringForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    companyName: "",
    email: "",
    phone: "",
    hearAbout: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/send-emailss",
        formData
      );
      alert(response.data.message || "Form submitted successfully!");
      setFormData({
        name: "",
        jobTitle: "",
        companyName: "",
        email: "",
        phone: "",
        hearAbout: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-grid">
        <h2 className="form-title">Hire the best dedicated developers</h2>
        <p className="form-subtitle">
          Hire pre-vetted developers with strong technical and communication skills
          at unbeatable prices. <br />
          If you decide to stop within one week, you pay nothing.
        </p>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name *"
          required
          disabled={loading}
          className="form-input"
        />

        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Job Title *"
          required
          disabled={loading}
          className="form-input"
        />

        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company Name *"
          required
          disabled={loading}
          className="form-input"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Work Email *"
          required
          disabled={loading}
          className="form-input"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone *"
          required
          disabled={loading}
          className="form-input"
        />

        <select
          name="hearAbout"
          value={formData.hearAbout}
          onChange={handleChange}
          required
          disabled={loading}
          className="form-input"
        >
          <option value="" disabled>
            How did you hear about us? *
          </option>
          <option value="email">Email</option>
          <option value="search">Search engine</option>
          <option value="social">Social media</option>
          <option value="others">Others</option>
        </select>

        <div className="form-button-container">
          <button type="submit" disabled={loading} className="form-button">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeveloperHiringForm;
