import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGlassmorphism = () => {
  return (
    <motion.div
      className="h-full w-full  absolute z-50 rounded-lg glass"
      initial={{ bottom: '5rem', opacity: 1 }}
      whileInView={{ bottom: '0rem', opacity: 0 }}
      viewport={{ amount: 0.9 }}
      transition={{ duration: 0.8 }}
      style={{
        transform: 'rotate3d(140, 72, -134, 46deg)',
        perspective: '1000px',
      }}
    />
  );
};

export default AnimatedGlassmorphism;
