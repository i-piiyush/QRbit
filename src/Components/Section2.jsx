import React from "react";
import Swiper from "./CustomSwiper";


const Section2 = () => {



  return (
    <div className="text-white w-full h-[140vh]  relative">
      <div className="blob top-[30rem] h-[200px] w-[200px] xl:h[500px] xl:w-[500px]  right-[50%] "></div>
      <div className="w-full h-[40%]  flex flex-col md:flex-row md:justify-between md:text-left justify-center items-center text-center px-[3%] gap-5">
        <h1 className="text-4xl md:text-4xl 2xl:text-5xl  font-bold md:w-[50%]">
          Made for Effortless
          <br />
          Networking
        </h1>
        <p className=" font-light  2xl:text-2xl opacity-70 w-[90%] md:w-[40%] md:text-lg">
          Qrbit empowers professionals with seamless digital identity sharing.
          Create, customize, and share your business card in just a scan.
        </p>
      </div>
     <Swiper />
     
    </div>
  );
};

export default Section2;
