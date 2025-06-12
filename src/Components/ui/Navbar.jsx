import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../../Context/AppProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, handleLogout } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
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
      className="fixed bottom-[5%] left-0 w-full flex justify-center items-center z-[9999] text-white text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="flex gap-1 bg-green-950/85 rounded-md w-96 h-20 backdrop-blur-md shadow-lg p-[5px]">
        <div className="bg-white h-full w-[25%] rounded-lg flex justify-center items-center text-3xl text-black font-semibold">
          <h1 className="text-green-400">Qb</h1>.
        </div>
        <div className="border border-green-400/15 hover:border-green-400 transition-all duration-300 h-full w-[25%] rounded-lg flex justify-center items-center text-md text-white font-medium cursor-pointer" onClick={() => navigate('/user-cards')} >
        <a>Your<br />card</a>
        </div>
        <div className="border border-green-400/15 hover:border-green-400 transition-all duration-300 h-full w-[25%] rounded-lg flex justify-center items-center text-md text-white font-medium cursor-pointer">
          <a href="#features">Features</a>
        </div>

        {user ? (
          <div
            className="bg-red-500 h-full w-[25%] rounded-lg flex justify-center items-center text-md text-white font-medium cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        ) : (
          <div
            className="bg-green-400 h-full w-[25%] rounded-lg flex justify-center items-center text-md text-white font-medium cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign-up
          </div>
        )}
      </nav>
    </motion.div>
  );
};

export default Navbar;