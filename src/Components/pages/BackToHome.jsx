import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const BackToHome = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center  text-white hover:text-green-600 bg-green-600 p-3 rounded-full backdrop-blur-xl hover:bg-white transition-all"
    >
      <MdArrowBack className="text-xl" />
     
    </button>
  );
};

export default BackToHome;
