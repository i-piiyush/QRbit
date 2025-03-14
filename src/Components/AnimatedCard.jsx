import React from "react";
import { FaBehance, FaDribbble, FaInstagram, FaTwitter } from "react-icons/fa";
import AnimatedGlassmorphism from "./AnimatedGlassmorphism";

const AnimatedCard = () => {
  const logo = [
    <FaBehance color="black" />,
    <FaDribbble color="black" />,
    <FaInstagram color="black" />,
    <FaTwitter color="black" />,
  ];

  return (

    <>
    <div className="relative ">

    <AnimatedGlassmorphism />
    
    <div
        className="w-[20rem] h-[11rem] rounded-lg relative z-40 flex bg-black overflow-hidden shadow-2xl xl:w-[25rem] xl:h-[13rem] 2xl:w-[28rem] 2xl:h-[14rem] animatedCard"
        style={{
            transform: "rotate3d(140, 72, -134, 46deg)",
          perspective: "1000px", // Adds depth perception
          filter: "drop-shadow(20px 20px 100px rgba(0,128, 0, 0.7))", // Custom drop shadow
          
        }}
      >
        
        <div className="w-[60%] flex flex-col justify-between p-3">
          <div>
            <h1 className="text-lg 2xl:text-2xl font-semibold tracking-tight text-white">
              Mr. Piyush Chhabra
            </h1>
            <p className="text-xs 2xl:text-base w-[90%] opacity-65 font-light tracking-tight text-gray-300">
              Web designer and Web developer
            </p>
          </div>
          <div className="flex gap-2">
            {logo.map((icon, index) => (
              <span
                key={index}
                className="bg-white flex justify-center items-center h-8 w-8 rounded-full"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
        <div className="w-[40%] p-1">
          <img
            src="https://i.pinimg.com/736x/19/64/48/196448e3dfe9bafbf05893f3684ba3e9.jpg"
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>

    </div>
   
    
    </>
   
      
   
  );
};

export default AnimatedCard;
