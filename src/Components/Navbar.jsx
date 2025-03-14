import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  let scrollTimeout;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);

      // Clear the previous timeout if user scrolls again
      clearTimeout(scrollTimeout);

      // Set a timeout to hide navbar after 5 seconds of inactivity
      scrollTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

return (
    <motion.div
      className=" fixed bottom-[5%] left-0 w-full flex justify-center items-center  z-50 text-white text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="flex gap-1 bg-green-950/85 rounded-md w-80 h-20 backdrop-blur-md shadow-[7px_7px_59px_11px_rgba(0,0,0,0.5)] p-[5px]">
      <div className="bg-white h-full w-[25%] rounded-lg flex justify-center items-center text-3xl text-black  font-semibold">
        <h1 className="text-green-400">Qb</h1>.
      </div>
      <div className="border border-green-400/15 hover:border-green-400 transition-all duration-300 h-full w-[25%] rounded-lg flex justify-center items-center text-md text-white font-medium cursor-pointer">
  <div>Home</div>
</div>
<div className="border border-green-400/15 hover:border-green-400 transition-all duration-300 h-full w-[25%] rounded-lg flex justify-center items-center text-md text-white font-medium cursor-pointer">
  <div>Features</div>
</div>

      <div className="bg-green-400 h-full w-[25%] rounded-lg flex justify-center items-center text-md text-white  font-medium"> <a href="#">Sign-up</a> </div>

      

      </nav>
    </motion.div>
  );
};

export default Navbar;
