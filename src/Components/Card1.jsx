import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import Btn from "./Btn";
const Card1 = () => {


  return (
    <div className="bg-gray-300  text-black h-[35rem] w-full relative">
      <div className="bg-blue-200 w-full h-full">
        <img src="" alt="demo" />
      </div>
      <div
        className="bg-green-600 w-full h-[70%] absolute bottom-0 flex flex-col items-start px-5 gap-7"
        id="cardSec"
      >
        <div className="flex justify-center py-3  w-full">
           <IoIosArrowUp size="2rem" color="white" />
        </div>
       
        
        <h1 className="text-white font-semibold text-3xl ">Arjun Mehta</h1>
        <div className="w-full  text-white flex justify-between items-center text-xl font-semibold">
          <h1 className="text-left leading-tight">Freelance web <br /> developer</h1>
          <div className=" flex items-center gap-2">
          <FaLocationDot />
          <h1>Banglore, India</h1>
          </div>
        </div>
        <div className=" text-white rounded-lg flex justify-around w-full
      ">
      <div className="text-center">
        <h2 className="text-2xl font-bold">272</h2>
        <p className="text-sm">Following</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold">192k</h2>
        <p className="text-sm">Followers</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold">1.6M</h2>
        <p className="text-sm">Likes</p>
      </div>
    </div>
        
        <Btn />
      </div>
    
    </div>
  );
};

export default Card1;
