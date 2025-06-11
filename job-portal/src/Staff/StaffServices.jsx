import React from 'react';
import './StaffServices.css'; 
import { motion } from 'framer-motion';

const services = [
  {
    title: "Onsite Service",
    description:
      "We provide skilled professionals to work directly at the client’s office to facilitate seamless coordination with the already existing internal team and ensure the success of the project.",
    icon: "🧑‍💼",
  },
  {
    title: "Remote Services",
    description:
      "For companies with flexible work cultures, we offer remote access to qualified experts to enable flexibility in teams and allow organizations to hire employees from all over India to help in your project management tasks.",
    icon: "💻",
  },
  {
    title: "IT Consulting Services",
    description:
      "We specialize in providing IT resource & staff augmentation services in Bangalore with expert advice and consultation on IT-related matters.",
    icon: "🧠",
  },
  {
    title: "Temporary Staffing Services",
    description:
      "By supplying temporary professionals for specific roles or projects, we offer flexibility in workforce management without the long-term commitments of permanent staffing.",
    icon: "📋",
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const StaffServices = () => {
  return (
    <div className="services-section">
      <h2>
        Services of Staff <span className="highlight">Augmentation</span>
      </h2>
      <div className="card-container">
        {services.map((service, index) => (
          <motion.div
            className="service-card"
            key={index}
            custom={index}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="icon">{service.icon}</div>
            <h4>{service.title}</h4>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StaffServices;
