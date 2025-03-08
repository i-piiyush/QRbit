import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Btn from "./Btn";

const Card2 = () => {
  return(
    <div className="bg-gray-900 text-white h-[40rem] w-full relative overflow-hidden flex flex-col items-center   rounded-lg shadow-lg">
    {/* Profile Image */}
    <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 mt-7 border-gray-700">
      <img
        src="https://i.pinimg.com/736x/c5/db/b4/c5dbb4c6851c1f67fc85dbddc3a98e61.jpg"
        alt="Profile"
        className=" h-full w-full object-cover "
      />
    </div>

    {/* Name and Title */}
    <h2 className="md:text-xl font-bold mt-4 ">Aisha Verma</h2>
    <p className="text-gray-400 text-sm">Brand Strategist & Designer</p>

    {/* Stats */}
    <div className="flex justify-center space-x-6 my-4 ">
      <div className="text-center">
        <p className="text-lg font-bold">272</p>
        <p className="text-gray-400 text-sm">Following</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold">192k</p>
        <p className="text-gray-400 text-sm">Followers</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold">1.6M</p>
        <p className="text-gray-400 text-sm">Likes</p>
      </div>
    </div>

    {/* Location and Description */}
    <div className="bg-gradient-to-t from-black via-green-600 via-75% to-green-600 text-white p-10 gap-5 rounded-t-3xl mt-6 w-full flex flex-col items-start flex-grow">
      <p className="  flex items-center gap-1">
        <FaLocationDot className="text-lg" /> Mumbai, India
      </p>
      <p className="text-xs xl:text-sm font-light opacity-85  text-left tracking-tight">
        Hi, I'm Aisha Verma, a brand strategist and designer helping
        solopreneurs and small businesses craft powerful, memorable brands. I
        create bold brand identities, engaging social media strategies, and
        high-impact marketing materials.
      </p>
     <Btn  />
    </div>

    {/* Call to Action Button */}
   
  </div>
  )
};

export default Card2;
