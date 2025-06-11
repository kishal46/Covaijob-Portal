import React from 'react';
import { motion } from 'framer-motion';
import './TechStack.css';

const techStack = {
  frontend: [
    { name: 'React', icon: require('../Images/Icon/React.png') },
    { name: 'Angular', icon: require('../Images/Icon/Angular.png') },
    { name: 'Vue.js', icon: require('../Images/Icon/vue.png') },
    { name: 'Flutter', icon: require('../Images/Icon/flutter.png') },
    { name: 'Ember.JS', icon: require('../Images/Icon/express.png') },
    { name: 'Bootstrap', icon: require('../Images/Icon/bootstrap.png') },
  ],
  backend: [
    { name: 'Node.js', icon: require('../Images/Icon/node.png') },
    { name: 'Express.js', icon: require('../Images/Icon/express.png') },
    { name: 'GoLang', icon: require('../Images/Icon/Go.png') },
    { name: 'Java', icon: require('../Images/Icon/java.png') },
    { name: 'Python', icon: require('../Images/Icon/python.png') },
    { name: 'PHP', icon: require('../Images/Icon/php.png') },
  ],
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariantsLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0 },
};

const itemVariantsRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0 },
};

const itemVariantsMobile = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const TechStack = () => {
  const isMobile = window.innerWidth <= 768;

  return (
    <motion.div
      className="techstack-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="techstack-heading"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hire Our Tech Experts
      </motion.h2>

      <motion.p
        className="techstack-subheading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Our seasoned developers have expertise with the following tech stacks:
      </motion.p>

      <div className="row">
        {/* Frontend */}
        <div className="col-md-6 mb-4">
          <h4 className="fw-bold mb-3">Front-End Technologies</h4>
          <motion.div className="row g-3" variants={containerVariants}>
            {techStack.frontend.map((tech, idx) => (
              <motion.div
                key={idx}
                className="col-12 col-sm-6"
                variants={isMobile ? itemVariantsMobile : itemVariantsLeft}
              >
                <motion.div
                  className="techstack-card"
                  {...(!tech.name.toLowerCase().includes('express') && {
                    whileHover: { scale: 1.05 },
                  })}
                >
                  <img src={tech.icon} alt={tech.name} className="techstack-icon" />
                  <span className="techstack-text">{tech.name}</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Backend */}
        <div className="col-md-6 mb-4">
          <h4 className="fw-bold mb-3">Back-End Technologies</h4>
          <motion.div className="row g-3" variants={containerVariants}>
            {techStack.backend.map((tech, idx) => (
              <motion.div
                key={idx}
                className="col-12 col-sm-6"
                variants={isMobile ? itemVariantsMobile : itemVariantsRight}
              >
                <motion.div
                  className="techstack-card"
                  {...(!tech.name.toLowerCase().includes('express') && {
                    whileHover: { scale: 1.05 },
                  })}
                >
                  <img src={tech.icon} alt={tech.name} className="techstack-icon" />
                  <span className="techstack-text">{tech.name}</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TechStack;
