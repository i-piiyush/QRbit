import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import AnimatedCard from "./AnimatedCard";

const Section2 = () => {
  return (
    <div className=" text-white w-full relative h-[100vh] flex flex-col md:flex-row items-center justify-center gap-5 px-5 2xl:px-10 " id="features">
      <div className="blob top-[30rem] h-[200px] w-[200px] xl:h[500px] xl:w-[500px]  right-[50%] 2xl:right-0  "></div>
      <div className=" w-full h-[40%] md:w-[60%] md:h-full flex flex-col gap-5 items-center md:items-start justify-center ">
        <div className="flex gap-3 w-full justify-center items-center md:justify-start  ">
          <h1 className="text-lg lg:text-xl 2xl:text-3xl bg-gradient-to-r from-green-500 to-white text-transparent bg-clip-text font-bold">
            Networking made effortless
          </h1>
          <FaArrowRightLong size={"1.125rem"} className="text-white" />
        </div>

        <h1 className="w-[80%] lg:text-2xl xl:w-[70%] 2xl:text-3xl 2xl:w-[50%] font-semibold text-xl text-center md:text-left leading-tight">
          Digital business cards you’ll love sharing Optimized for seamless
          connections
        </h1>

        <p className="w-[80%] md:w-[90%] lg:text-lg xl:w-[80%] leading-tight opacity-65 font-light text-center md:text-left 2xl:w-[50%]">
          Create a professional digital card in seconds, share it instantly via
          QR code or link, and leave a lasting impression—anytime, anywhere.
        </p>
      </div>
      <div className=" w-full h-[60%] md:h-full md:w-[40%] flex justify-center items-center animatedCard">

        <AnimatedCard/>
      </div>
    </div>
  );
};

export default Section2;
