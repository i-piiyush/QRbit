import React, { useRef, useContext } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import BackToHome from "./BackToHome";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import { AppContext } from "../Context/AppProvider"; // 👈 import context
import { db } from "../firebaseConfig"; // Import Firestore reference

import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";

const ChooseDesign = () => {
  const navigate = useNavigate();
  const { user, setSelectedCardIndex } = useContext(AppContext); // 👈 access setter from context

  const [sliderRef, slider] = useKeenSlider({
    loop: false,
    breakpoints: {
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 16 },
      },
      "(min-width: 640px) and (max-width: 1023px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(max-width: 639px)": {
        slides: { perView: 1, spacing: 0 },
        centered: true,
      },
    },
    slides: { perView: 1, spacing: 16 },
  });

  const handleCardClick = async (index) => {
    setSelectedCardIndex(index); // Store index in context
    
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid); // Reference to the user's document
        await updateDoc(userDocRef, { selectedCardIndex: index }); // Update Firestore
        console.log("Design saved to Firestore!");
      } catch (error) {
        console.error("Error saving design to Firestore:", error);
      }
    }

    navigate("/add-info"); // Navigate to next step
  };

  return (
    <div className="h-screen w-full px-5 py-3">
      <div className="text-white">
        <BackToHome />
      </div>
      <div className="h-[15%] flex justify-center items-center mb-4">
        <h1 className="text-2xl sm:text-6xl font-bold bg-gradient-to-r from-[#339b2a] to-white bg-clip-text text-transparent md:tracking-tighter py-2">
          Choose Your Design
        </h1>
      </div>

      <div className="relative w-full flex justify-center items-center flex-col pb-5 cursor-pointer">
        <div className="flex justify-end gap-3 py-5 px-5 w-full">
          <button
            onClick={() => slider.current?.prev()}
            className="z-10 p-4 bg-black border border-green-600 hover:bg-green-600 transition-all text-white rounded-full lg:hidden"
          >
            <FiChevronLeft size={28} />
          </button>
          <button
            onClick={() => slider.current?.next()}
            className="z-10 p-4 bg-black hover:bg-green-600 border transition-all border-green-600 text-white rounded-full lg:hidden"
          >
            <FiChevronRight size={28} />
          </button>
        </div>

        <div ref={sliderRef} className="keen-slider w-[90%] max-w-[1200px]">
          <div className="keen-slider__slide flex justify-center px-4">
            <div
              className="w-[350px] max-w-full transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(51,155,42,0.6)] rounded-xl"
              onClick={() => handleCardClick(1)}
            >
              <Card1 />
            </div>
          </div>
          <div className="keen-slider__slide flex justify-center px-4">
            <div
              className="w-[350px] max-w-full transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(51,155,42,0.6)] rounded-xl"
              onClick={() => handleCardClick(2)}
            >
              <Card2 />
            </div>
          </div>
          <div className="keen-slider__slide flex justify-center px-4">
            <div
              className="w-[350px] max-w-full transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(51,155,42,0.6)] rounded-xl"
              onClick={() => handleCardClick(3)}
            >
              <Card3 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseDesign;
