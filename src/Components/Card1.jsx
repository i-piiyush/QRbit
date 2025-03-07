import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import Btn from "./Btn";
const Card1 = () => {


  return (
    <div className="bg-gray-300  text-black h-[40rem] w-full relative overflow-hidden">
      <div className="bg-blue-200 w-full h-full overflow-hidden">
        <img src="https://i.pinimg.com/736x/a0/c0/fa/a0c0fa82075c37c1771a7f86394143df.jpg" alt="demo" className=" w-[10%]"/>
      </div>
      <div
         className="bg-gradient-to-t from-black via-green-600 via-75% to-green-600 w-full h-[60%] absolute bottom-0 flex flex-col items-start px-5 gap-7"
        id="cardSec"
       
      >
        <div className="flex justify-center py-3  w-full">
           <IoIosArrowUp size="2rem" color="white" />
        </div>
       
        
        <h1 className="text-white font-semibold text-3xl ">Arjun Mehta</h1>
        <div className="w-full  text-white flex justify-between items-center text-xl ">
          <h1 className="text-left leading-tight">Freelance web <br /> developer</h1>
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
