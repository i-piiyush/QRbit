import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import Btn from "./Btn";
const Card1 = () => {


  return (
    <div className="  text-black h-[40rem] w-full relative overflow-hidden rounded-lg">
      <div className=" w-full h-full overflow-hidden flex justify-center ">
  <img 
    src="https://i.pinimg.com/736x/31/78/15/317815f0bef8e2e1e2e85471263b2531.jpg" 
    alt="demo" 
    className="w-full h-[50%] object-cover"
  />
</div>
      <div
         className="bg-gradient-to-t from-black via-green-600 via-75% to-green-600 w-full h-[60%] absolute bottom-0 flex flex-col items-start px-5 gap-7 bigshadow "
        id="cardSec"
       
      >
        <div className="flex justify-center py-3  w-full">
           <IoIosArrowUp size="2rem" color="white" />
        </div>
       
        
        <h1 className="text-white font-semibold text-3xl ">Arjun Mehta</h1>
        <div className="w-full  text-white flex justify-between items-center text-xl ">
          <h1 className="text-left leading-tight ">Freelance web <br className="hidden lg:block"/> developer</h1>
          <div className=" flex items-center gap-2">
          <FaLocationDot />
          <h1>Banglore, India</h1>
          </div>
        </div>
        <div className=" text-white rounded-lg flex justify-around w-full
      ">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">272</h2>
        <p className="text-sm">Following</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">192k</h2>
        <p className="text-sm">Followers</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">1.6M</h2>
        <p className="text-sm">Likes</p>
      </div>
    </div>
        
        <Btn />
      </div>
    
    </div>
  );
};

export default Card1;
