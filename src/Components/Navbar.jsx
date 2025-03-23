import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppProvider";

const Navbar = () => { 
  const { handleSignUp} = useContext(AppContext)
  const [isVisible, setIsVisible] = useState(false);
  let scrollTimeout;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(scrollTimeout);
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
      className="fixed bottom-[5%] left-0 w-full flex justify-center items-center z-50 text-white text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="flex gap-1 bg-green-950/85 rounded-md w-80 h-20 backdrop-blur-md shadow-lg p-[5px]">
        <div className="bg-white h-full w-[25%] rounded-lg flex justify-center items-center text-3xl text-black font-semibold">
          <h1 className="text-green-400">Qb</h1>.
        </div>
        <div className="border border-green-400/15 hover:border-green-400 transition-all duration-300 h-full w-[25%] rounded-lg flex justify-center items-center text-md text-white font-medium cursor-pointer">
          <a href="#home">Home</a>
        </div>
        <div className="border border-green-400/15 hover:border-green-400 transition-all duration-300 h-full w-[25%] rounded-lg flex justify-center items-center text-md text-white font-medium cursor-pointer">
          <a href="#features">Features</a>
        </div>
        {/* Sign-up Button */}
        <div
          className="bg-green-400 h-full w-[25%] rounded-lg flex justify-center items-center text-md text-white font-medium cursor-pointer"
          onClick={() => handleSignUp()}
          
        >
          <a>Sign-up</a>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
