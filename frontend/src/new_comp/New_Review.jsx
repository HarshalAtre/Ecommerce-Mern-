import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NewReview = ({ items }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div style={{margin:"10px"}}>
      {items.map(item => (
        <motion.div key={item.id} layoutId={item.id} onClick={() => setSelectedId(item.id)}>
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}>
            {items.filter(item => item.id === selectedId).map(item => (
              <div key={item.id}>
                <motion.h5>{item.subtitle}</motion.h5>
                <motion.h2>{item.title}</motion.h2>
                <motion.button onClick={() => setSelectedId(null)}>Close</motion.button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewReview;
