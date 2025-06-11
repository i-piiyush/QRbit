import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import Btn from "../common/Btn";
import { motion, useMotionValue } from "framer-motion";
import { useLocation } from "react-router-dom";

const Card1 = ({ forceDummy = false, user,isLoading }) => {

  if (isLoading) {
    return;
  } 

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const y = useMotionValue(0);

  const dummyData = {
    name: "Arjun Mehta",
    profession: "Freelance web developer",
    image: "https://i.pinimg.com/736x/31/78/15/317815f0bef8e2e1e2e85471263b2531.jpg",
    followers: "192k",
    following: "272",
    likes: "1.6M",
    location: "Banglore, India",
    contact: "#"
  };

  const useDummyData = forceDummy || location.pathname === "/";
  const displayData = useDummyData
    ? dummyData
    : {
        name: user?.name || dummyData.name,
        profession: user?.profession || dummyData.profession,
        image: user?.image || dummyData.image,
        followers: user?.followers || dummyData.followers,
        following: user?.following || dummyData.following,
        likes: user?.likes || dummyData.likes,
        location: user?.location || dummyData.location,
        contact: user?.contact || dummyData.contact,
      };

  const handleDragEnd = (_, info) => {
    if (info.offset.y < -100 || info.velocity.y < -500) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="text-black h-[40rem] w-full relative overflow-hidden rounded-lg">
      <div className="w-full h-[50%] overflow-hidden flex justify-center">
        <img
          src={displayData.image}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Draggable Bottom Section */}
      <motion.div
        className="bg-gradient-to-t from-black via-green-600 via-75% to-green-600 w-full h-[60%] absolute bottom-0 flex flex-col items-start px-5 gap-7 bigshadow rounded-[40px]"
        drag="y"
        dragConstraints={{ top: -220, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={{ y: isOpen ? -220 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ y }}
        whileDrag={{ cursor: "grabbing" }}
      >
        <div className="flex justify-center py-3 w-full cursor-grab">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring" }}
          >
            <IoIosArrowUp size="2rem" color="white" />
          </motion.div>
        </div>

        <h1 className="text-white font-semibold text-3xl">{displayData.name}</h1>

        <div className="w-full text-white flex justify-between items-center text-xl">
          <h1 className="text-[18px] text-left leading-tight">{displayData.profession}</h1>
          <div className="flex items-center gap-2">
            <FaLocationDot />
            <h1 className="text-[18px]">{displayData.location}</h1>
          </div>
        </div>

        <div className="text-white rounded-lg flex justify-around w-full">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{displayData.following}</h2>
            <p className="text-sm">Following</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{displayData.followers}</h2>
            <p className="text-sm">Followers</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{displayData.likes}</h2>
            <p className="text-sm">Likes</p>
          </div>
        </div>

        <Btn contact={displayData.contact} />
      </motion.div>
    </div>
  );
};

export default Card1;
