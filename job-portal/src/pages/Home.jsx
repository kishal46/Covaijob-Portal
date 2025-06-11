import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import developerImage from '../Images/Home.png';
import slideImage from '../Images/Slide2.png';
import '../CSS/HeroSection.css';
import { useNavigate } from 'react-router-dom';

const HeroSlider = () => {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();
  const slides = [
    {
      id: 1,
      content: (
        <div className="row align-items-center hero-slide">
          <div className="col-lg-6 col-md-12 text-center text-lg-start">
            <h1 className="tamil-text">
              ஏனுங்க ! இன்னுமா வேலை தேடி <br />
              அலஞ்செட்டு இருக்கிங்கோ !
            </h1>
            <button
              className="btn custom-btn mt-3"
              onClick={() => navigate('/current-jobs')}
            >
              Explore Jobs <span className="arrow">→</span>
            </button>
          </div>
          <div className="col-lg-6 col-md-12 text-center">
            <motion.img
              src={slideImage}
              alt="Job Seekers"
              className="img-fluid Slideimage"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="row align-items-center hero-slide">
          <div className="col-lg-6 col-md-12 text-center text-lg-start">
            <h1>
              Hire Developers and<br />
              manage them<br />
              with <span className="highlight">ease</span>
            </h1>
            <a
              href="/hiredev"
              className="btn custom-btn mt-3"
            >
              Hire Developer <span className="arrow">→</span>
            </a>
          </div>
          <div className="col-lg-6 col-md-12 text-center">
            <motion.img
              src={developerImage}
              alt="Developer Illustration"
              className="img-fluid developer-image"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="container-fluid hero-slider py-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.6 }}
        >
          {slides[slide].content}
        </motion.div>
      </AnimatePresence>

      
    </div>
  );
};

export default HeroSlider;
