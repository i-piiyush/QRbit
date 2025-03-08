import React from "react";
import { FaLocationDot } from "react-icons/fa6"; // Importing location icon
import Btn from "./Btn";


const Card3 = () => {
  return (
    <div className="bg-gray-200 text-white h-[40rem] w-full relative overflow-hidden flex flex-col items-center rounded-lg">
      {/* Profile Image */}
      <div className="w-full h-full relative z-0 ">
        <img
          src="https://i.pinimg.com/736x/23/dc/eb/23dcebd983e01b614c1c850e14c6b3e0.jpg"
          alt="Profile"
          className="w-full h-full "
        />
      </div>
    

      {/* Overlay with Gradient */}

      <div className="bg-white/10 backdrop-blur-lg z-20 w-[28rem] h-[28rem] rounded-full absolute -bottom-[35%]  flex flex-col items-center  text-white p-6 gap-3">
  <h2 className="text-2xl font-bold">Sophia Carter</h2>
  <div className="flex items-center gap-2 text-sm text-gray-200">
    <i className="fas fa-map-marker-alt"></i>
    <span>New York, USA</span>
  </div>

  {/* Stats */}
  <div className="flex justify-between mt-2 text-center w-full px-20">
    <div>
      <p className=" font-semibold">123</p>
      <p className="text-xs text-gray-300">Following</p>
    </div>
    <div>
      <p className=" font-semibold">19M</p>
      <p className="text-xs text-gray-300">Followers</p>
    </div>
    <div>
      <p className=" font-semibold">19.8M</p>
      <p className="text-xs text-gray-300">Likes</p>
    </div>
  </div>

  {/* Button */}
  <Btn />
</div>

      
    </div>
  )
}

export default Card3