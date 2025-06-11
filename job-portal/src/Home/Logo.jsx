import React from "react";
import "./LogoSlider.css";
import RecruitmentProcess from "./Recruit";
import Footer from "./Footer";

const logos = [
  require("../Images/Logo/Ayutree.png"),
  require("../Images/Logo/flipkart-logo.png"),
  require("../Images/Logo/Meesho_logo.png"),
  require("../Images/Logo/pickyourtrail.png"),
  require("../Images/Logo/root.png"),
  require("../Images/Logo/7media.png"),
  require("../Images/Logo/krishna.png"),
];

const LogoSlider = () => {
  return (
    <>
    <div className="logo-slider-wrapper">
      <h2 className="logo-slider-title">Our Happy Clients</h2>
      <div className="logo-slider">
        {[...logos, ...logos].map((logo, index) => (
          <div className="logo-slide" key={index}>
            <img src={logo} alt={`logo-${index}`} />
          </div>
        ))}
      </div>
    </div>

    <RecruitmentProcess/>
    <Footer/>
    </>
  );
};

export default LogoSlider;
