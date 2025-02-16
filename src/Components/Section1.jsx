import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

const Section1 = () => {
  return (
    <div className="w-full px-5 py-10  relative">
      <div className="blob -top-[80%] -left-[60%]"></div>

      <div className="text-white w-full h-full  flex justify-center items-center flex-col gap-3">
      
        <h1 className="font-bold text-3xl leading-none text-center">
          QRbit is a <br />purpose-built <br /> tool for effortless networking.
        </h1>

        <p className="text-sm tracking-tighter opacity-70 text-center leading-none">
          Meet the modern way to share your professional details. Generate sleek
          digital cards with QR codes and link.
        </p>
        <button className="bg-[#ffffff21] rounded-full px-5 py-3 flex gap-3 justify-center items-center  text-sm backdrop-blur-xl" >Create your card 
        <MdOutlineArrowOutward  />
        </button>

      </div>
    </div>
  );
};

export default Section1;
