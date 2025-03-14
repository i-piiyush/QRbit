import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [position, setPosition] = useState(0);

  const handleSwipe = (_, info) => {
    if (info.offset.x > 100) { // Adjust threshold for swipe
      setTimeout(() => {
        window.location.href = 'mailto:support@qrbits.com';
        setPosition(0); // Reset position after opening email
      }, 500);
    }
  };

  return (
    <footer className="bg-green-400 overflow-hidden rounded-t-[80px]">
      <div className="bg-green-400 text-black p-8  md:flex md:justify-between md:items-center md:px-16 md:py-12 overflow-hidden">

          <div className="md:flex md:flex-col md:items-start ">
        <div className="bg-black text-white px-6 py-3 rounded-full flex items-center relative w-64 overflow-hidden my-10">
          <motion.span
            drag="x"
            dragConstraints={{ left: 0, right: 150 }}
            onDragEnd={handleSwipe}
            animate={{ x: position }}
            transition={{ type: "spring", stiffness: 200 }}
            className="cursor-pointer bg-white text-black rounded-full h-12 w-12 flex justify-center items-center"
          >
            ➜
          </motion.span>
          <span className="ml-4">swipe to talk</span>
        </div>
      </div>

      <div className="flex md:flex-row md:space-x-16 justify-between">
        <div>
          <h3 className="font-bold">Support</h3>
          <ul className="text-sm space-y-1">
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Privacy & Policy</li>
            <li>Terms & condition</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Company</h3>
          <ul className="text-sm space-y-1">
            <li>About us</li>
            <li>Blog</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      </div>
    

      <div className="text-7xl md:text-9xl font-bold mt-8 md:mt-0 md:self-end md:text-6xl  py-12 md:py-0   flex justify-center items-center relative">
        <div className='bg-black w-full absolute h-5 z-10'></div>
        <span className="text-white z-20">QRbits.</span>
      </div>
    </footer>
  );
};

export default Footer;
