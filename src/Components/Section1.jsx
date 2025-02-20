import React from "react";
import Blob from "./Blob";
import { MdOutlineArrowOutward } from "react-icons/md";

const Section1 = () => {
  return (
    <div className="w-full h-[80vh]  md:h-[70vh] px-5 py-10  relative">
       <div className="blob -top-[10rem] h-[300px] w-[300px] xl:h[700px] xl:w-[700px] 2xl:h-[600px] 2xl:w-[700px] -left-[10rem] "></div> 

     

      <div className="text-white w-full h-full  flex justify-center md:items-start md:text-left items-center flex-col gap-3 md:gap-5 2xl:gap-10">
      
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl md:text-left md:w-[70%] xl:w-[90%] leading-none text-center z-10">
        QRbit is a <br  className="md:hidden"/>purpose-built <br className="md:hidden xl:block"/> tool for effortless networking.
        </h1>

        <p className="text-sm xl:text-xl tracking-tighter opacity-70 text-center md:text-left md:w-[60%] xl:w-[40%] leading-none 2xl:text-4xl">
          Meet the modern way to share your professional details. Generate sleek
          digital cards with QR codes and link.
        </p>
        <button className="bg-[#ffffff21] rounded-full px-5 py-3 flex gap-3 justify-center items-center  text-sm backdrop-blur-xl 2xl:text-4xl 2xl:py-8 2xl:px-14 " >Create your card 
        <MdOutlineArrowOutward  />
        </button>

      </div>
    </div>
  );
};

export default Section1;
