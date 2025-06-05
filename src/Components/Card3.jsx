import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Btn from "./Btn";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

const Card3 = ({ forceDummy = false, user, isLoading }) => {
    if (isLoading) {
    return (
      <div className="h-[40rem] w-full flex items-center justify-center bg-black rounded-lg">
        <Loader className="animate-spin h-12 w-12 text-white" />
      </div>
    );
  }
  // 1. First: State hooks
  const [isOpen, setIsOpen] = useState(false);
  
  // 2. Then: Router hooks
  const location = useLocation();
  
  // 3. Then: Animation hooks (keep these together)
  const y = useMotionValue(0);
  const overlayOpacity = useTransform(y, [0, -200], [1, 0.9]);
  const bgOpacity = useTransform(y, [0, -200], [1, 0.2]);
  const scale = useTransform(y, [0, -200], [1, 0.95]);

  // 4. Then: Constants and data
  const dummyData = {
    name: "Sofia Carter",
    location: "New York, USA",
    followers: "19M",
    following: "123",
    likes: "19.8M",
    image: "https://i.pinimg.com/736x/23/dc/eb/23dcebd983e01b614c1c850e14c6b3e0.jpg",
    about: "Hi, I'm Sofia Carter, a 22-year-old model from New York City...",
    contact: "#",
  };

  // Early return for loading state (must be after all hooks)


  const useDummyData = forceDummy || location.pathname === "/";
  const displayData = useDummyData ? dummyData : {
    name: user?.name || dummyData.name,
    location: user?.location || dummyData.location,
    followers: user?.followers || dummyData.followers,
    following: user?.following || dummyData.following,
    likes: user?.likes || dummyData.likes,
    about: user?.about || dummyData.about,
    contact: user?.contact || dummyData.contact,
    image: user?.image || dummyData.image,
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.y < -100 || info.velocity.y < -500) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="text-white h-[40rem] w-full relative overflow-hidden bg-black flex flex-col items-center rounded-lg">
      {/* Background Image with Darkening Effect */}
      <div className="w-full h-full relative z-0">
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: useTransform(y, [0, -200], [0, 0.7]) }}
        />
        <motion.img
          src={displayData.image || dummyData.image}
          alt="Profile"
          className="w-full h-full object-cover"
          style={{ opacity: bgOpacity }}
          onError={(e) => {
            e.target.src = dummyData.image; // Fallback to dummy image if error
          }}
        />
      </div>

      {/* Draggable Overlay */}
      <motion.div
        className="bg-white/10 backdrop-blur-lg z-20 w-[28rem] h-[28rem] absolute -bottom-[35%] flex flex-col items-center text-white p-6 gap-3 cursor-grab active:cursor-grabbing rounded-t-[9999px] rounded-b-none"
        drag="y"
        dragConstraints={{ top: -190, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ y: isOpen ? -200 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ y, scale }}
        whileDrag={{ cursor: "grabbing" }}
      >
        <h2 className="text-2xl font-bold mt-5">{displayData.name}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-200">
          <FaLocationDot />
          <span>{displayData.location}</span>
        </div>

        {/* Stats */}
        <div className="flex justify-between w-full px-20 py-5">
          <div className="text-center">
            <p className="font-semibold">{displayData.following}</p>
            <p className="text-xs text-gray-300">Following</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{displayData.followers}</p>
            <p className="text-xs text-gray-300">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{displayData.likes}</p>
            <p className="text-xs text-gray-300">Likes</p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 items-center mt-5">
          <p className="w-[90%] text-sm tracking-tight">
            {displayData.about}
          </p>
          <Btn contact={displayData.contact} />
        </div>
      </motion.div>
    </div>
  );
};

export default Card3;