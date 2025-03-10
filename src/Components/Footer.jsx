import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const handleSwipe = (_, info) => {
    if (info.offset.x > 100) { // Adjust threshold for swipe
      setTimeout(() => {
        window.location.href = 'mailto:support@qrbits.com';
      }, 500);
    }
  };

  return (
    <footer className="bg-[#00FF00] text-black p-8 rounded-t-3xl">
      <div className="flex justify-between items-center mb-8">
        <div className="bg-black text-white px-6 py-3 rounded-full flex items-center relative w-64 overflow-hidden">
          <motion.span
            drag="x"
            dragConstraints={{ left: 0, right: 150 }}
            onDragEnd={handleSwipe}
            animate={{ x: 0 }}
            className="cursor-pointer bg-white text-black rounded-full px-4 py-2"
          >
            ➜
          </motion.span>
          <span className="ml-4">swipe to talk</span>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">Company</h3>
          <ul>
            <li>About us</li>
            <li>Blog</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Support</h3>
          <ul>
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Privacy & Policy</li>
            <li>Terms & condition</li>
          </ul>
        </div>
      </div>

      <div className="text-4xl font-bold mt-8">
        QR<span className="text-white">bits</span>.
      </div>
    </footer>
  );
};

export default Footer;
