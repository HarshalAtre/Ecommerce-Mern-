import React from 'react';
import { motion } from 'framer-motion';
import './Dragger.css'; // Import the CSS file for styling

const Dragger = () => {
  return (
    <div className="dragger-container">
      <motion.div className="constraint-box">
        <motion.div
          className="draggable itemd1" 
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
      
        </motion.div>
      </motion.div>
      <motion.div className="constraint-box">
        <motion.div
          className="draggable itemd2"
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          
        </motion.div>
      </motion.div>
      <motion.div className="constraint-box">
        <motion.div
          className="draggable itemd3"
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          
        </motion.div>
      </motion.div>
      <motion.div className="constraint-box">
        <motion.div
          className="draggable itemd4"
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
         
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dragger;
