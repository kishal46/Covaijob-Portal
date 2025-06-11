import React from 'react';
import { motion } from 'framer-motion';
import {
  FaProjectDiagram,
  FaCogs,
  FaArrowsAltH,
  FaChartLine,
  FaUserTie,
  FaPiggyBank,
} from 'react-icons/fa';
import './StaffAugmentation.css';

const features = [
  {
    title: 'Agile Methodology',
    description:
      'We house a team of skilled web and mobile app developers, certified scrum masters, and product owners with an agile mindset working closely with our customers to maximize their business value and ROI. We follow a continuous feedback and improvement approach for the enhancement of products, processes, and services.',
    icon: <FaProjectDiagram size={40} color="#007BFF" />,
    direction: 'left',
  },
  {
    title: 'DevOps',
    description:
      'We assure you to deliver frequent and reliable feature releases for app development. We use DevOps for better collaboration, software quality, and shorter time to market.',
    icon: <FaCogs size={40} color="#007BFF" />,
    direction: 'right',
  },
  {
    title: 'Flexibility',
    description:
      'Choose a model for staff augmentation for the amount of time you require. Our models are flexible enough to offer the best time frame as per your requirements.',
    icon: <FaArrowsAltH size={40} color="#007BFF" />,
    direction: 'left',
  },
  {
    title: 'Scalability',
    description:
      'Our flexible workforce augmentation models allow you to add many team members as per your needs. Fortunesoft supports staffing resources for gaps or multiple individuals.',
    icon: <FaChartLine size={40} color="#007BFF" />,
    direction: 'right',
  },
  {
    title: 'Expertise',
    description:
      'Our resource augmentation services offer certified experts in any area. We provide you with industry veterans that fit precisely with your project.',
    icon: <FaUserTie size={40} color="#007BFF" />,
    direction: 'left',
  },
  {
    title: 'Cost savings',
    description:
      'Hiring team members only when needed saves costs. This helps maximize ROI with minimal staff expenses such as salary, benefits, and so on.',
    icon: <FaPiggyBank size={40} color="#007BFF" />,
    direction: 'right',
  },
];

const itemVariant = {
  hiddenLeft: { opacity: 0, x: -50 },
  hiddenRight: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const StaffAugmentation = () => {
  return (
    <div className="container py-5">
      <motion.h2
        className="text-center mb-5 fw-bold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What Makes Us Your Reliable IT Staff Augmentation Partner?
      </motion.h2>

      <div className="row">
        {features.map((feature, index) => (
          <motion.div
            className="col-md-6 mb-4"
            key={index}
            initial={
              feature.direction === 'left'
                ? itemVariant.hiddenLeft
                : itemVariant.hiddenRight
            }
            whileInView={itemVariant.visible}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="d-flex align-items-start p-3 shadow-sm bg-white rounded h-100">
              <div className="me-3 mt-1">{feature.icon}</div>
              <div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StaffAugmentation;
