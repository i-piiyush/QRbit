import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const BackToHome = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center gap-2 text-white bg-[#ffffff21] px-4 py-2 rounded-full backdrop-blur-xl hover:bg-white/30 transition-all"
    >
      <MdArrowBack className="text-lg" />
      Back to Home
    </button>
  );
};

export default BackToHome;
