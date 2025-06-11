import React, { useState } from "react";
import axios from "axios";
import Particles from "react-tsparticles";
import Footer from "./Footer";
import "../CSS/ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setStatus(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/api", formData);
      if (response.status === 200) {
        setStatus({ success: true, message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ success: false, message: "Failed to send message. Please try again." });
      }
    } catch (error) {
      console.error("Email send error:", error);
      setStatus({ success: false, message: "Error sending message. Please try again." });
    }

    setLoading(false);
  };

  return (
    <>
      <div className="contact-banner">
        <Particles
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,
            particles: {
              number: { value: 30, density: { enable: true, area: 800 } },
              color: { value: "#ffffff" },
              shape: { type: "circle" },
              opacity: { value: 0.3 },
              size: { value: 2, random: true },
              move: { enable: true, speed: 0.4, random: true, outModes: "out" },
              links: { enable: false },
            },
            interactivity: {
              events: { onHover: { enable: true, mode: "grab" }, resize: true },
              modes: { grab: { distance: 140, links: { opacity: 0.5 } } },
            },
            detectRetina: true,
          }}
          className="particles-background"
        />
        <div className="banner-content">
          <h1>Contact Us</h1>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-left">
          <h2>Get in Touch</h2>
          <p>We’d love to hear from you. Reach out anytime!</p>
          <div className="contact-info">
            <h4>Our Address:</h4>
            <p><strong>CovaiJobs</strong></p>
            <p>132, 4th Street, Cross Cut Rd,</p>
            <p>Gandhipuram, Tamil Nadu 641012</p>

            <h4>Phone:</h4>
            <p><a href="tel:+919345687654" className="phone-link">+91 93456 87654</a></p>

            <h4>Email:</h4>
            <p><a href="mailto:contact@covaijobs.com" className="email-link">contact@covaijobs.com</a></p>

            <h4>Location Map:</h4>
          </div>
        </div>

        <div className="contact-right border-none">
          <h2>Send Us a Message</h2>
          <p>Your email address will not be published. Required fields are marked *</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              rows="6"
              name="message"
              placeholder="Your Message *"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status && (
            <p className={status.success ? "success-msg" : "error-msg"} aria-live="polite">
              {status.message}
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
