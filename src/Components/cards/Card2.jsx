import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Btn from "../common/Btn";
import { useLocation } from "react-router-dom";
import { LoaderIcon } from "lucide-react";

const Card2 = ({ forceDummy = false, user, isLoading }) => {
  const location = useLocation();

  // Dummy data
const dummyData = {
  name: "Aisha Verma",
  profession: "Brand Strategist & Designer",
  image: "https://i.pinimg.com/736x/c5/db/b4/c5dbb4c6851c1f67fc85dbddc3a98e61.jpg",
  followers: "192k",
  following: "272",
  likes: "1.6M",
  location: "Mumbai, India",
  about: "Hi, I’m Aisha Verma, a passionate brand strategist and designer based in Mumbai. I love creating compelling brand stories and designs that connect with people. Design is not just my profession, it’s my way of expressing creativity and making an impact.",
  contact: "#"
};


  // Determine which data to use
  const useDummyData = forceDummy || location.pathname === "/";
  const displayData = useDummyData ? dummyData : {
    name: user?.name || dummyData.name,
    profession: user?.profession || dummyData.profession,
    image: user?.image || dummyData.image,
    followers: user?.followers || dummyData.followers,
    following: user?.following || dummyData.following,
    likes: user?.likes || dummyData.likes,
    location: user?.location || dummyData.location,
    about: user?.about || dummyData.about, // Changed from bio to about
    contact: user?.contact || dummyData.contact
  };

  if(isLoading){
    return;
     
  }

  return (
    <div className="bg-black text-white h-[40rem] w-full relative overflow-hidden flex flex-col items-center rounded-lg shadow-lg">
      {/* Profile Image */}
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 mt-7 border-gray-700">
        <img
          src={displayData.image}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Name and Title */}
      <h2 className="md:text-xl font-bold mt-4">{displayData.name}</h2>
      <p className="text-gray-400 text-sm">{displayData.profession}</p>

      {/* Stats */}
      <div className="flex justify-center space-x-6 my-4">
        <div className="text-center">
          <p className="text-lg font-bold">{displayData.following}</p>
          <p className="text-gray-400 text-sm">Following</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{displayData.followers}</p>
          <p className="text-gray-400 text-sm">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{displayData.likes}</p>
          <p className="text-gray-400 text-sm">Likes</p>
        </div>
      </div>

      {/* Location and Description */}
      <div className="bg-gradient-to-t from-black via-green-600 via-75% to-green-600 text-white p-10 gap-5 rounded-t-3xl mt-6 w-full flex flex-col items-start flex-grow">
        <p className="flex items-center gap-1">
          <FaLocationDot className="text-lg" /> {displayData.location}
        </p>
        <p className="text-xs xl:text-sm font-light opacity-85 text-left tracking-tight">
          {displayData.about || "No about information available"}
        </p>
        <Btn contact={displayData.contact}/>
      </div>
    </div>
  );
};

export default Card2;