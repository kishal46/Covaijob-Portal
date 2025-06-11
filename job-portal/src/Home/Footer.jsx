import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from '../Images/logo.png';
import { FaWhatsapp, FaLinkedin, FaInstagram, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-black text-white pt-4 pb-2 px-4 w-100">
      <div className="w-100 px-4">

        <div className="row text-center text-md-start mb-3">
          <div className="col-md-4 mb-3 mb-md-0">
            <img src={Logo} alt="CovaiJobs Logo" style={{ width: '140px' }} className="mb-2" />
            <p className="small mb-2">CovaiJobs – Trusted Job Consultancy</p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 fs-5">
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="text-white"><FaWhatsapp /></a>
              <a href="https://www.linkedin.com/company/covaijobs" target="_blank" rel="noreferrer" className="text-white"><FaLinkedin /></a>
              <a href="https://www.instagram.com/covaijobs" target="_blank" rel="noreferrer" className="text-white"><FaInstagram /></a>
              <a href="tel:+919876543210" className="text-white"><FaPhone /></a>
            </div>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="fw-bold mt-2">Quick Links</h6>
            <ul className="list-unstyled small mt-3">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/contact" className="text-white">Contact Us</Link></li>
              <li><Link to="/signup" className="text-white">Sign Up</Link></li>
              <li><Link to="/login" className="text-white">Employer Login</Link></li>
              <li><Link to="/currentjobs" className="text-white">Current Jobs</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold">Address</h6>
            <p className="small mb-2">
              132, 4th Street, Cross Cut Rd,<br />
              Gandhipuram, Tamil Nadu 641009
            </p>
            <div className="map-responsive">
              <iframe
                title="CovaiJobs Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.972760515527!2d76.96429157589397!3d11.016844289135048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857df7e7e6ed3%3A0x6e297b3e36e1d3d3!2sCross%20Cut%20Rd%2C%20Gandhipuram%2C%20Coimbatore%2C%20Tamil%20Nadu%20641009!5e0!3m2!1sen!2sin!4v1715063083452!5m2!1sen!2sin"
                width="100%"
                height="100"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="text-center small text-muted mt-3">
          © 2025 CovaiJobs | <Link to="/terms" className="text-light me-2">Terms</Link>
          <Link to="/privacy" className="text-light">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
