import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";

const CustomSwiper = () => {
  const [sliderRef] = useKeenSlider({
    loop: false,
    slides: {
      perView: 3,
      spacing: 16, // Adjust spacing between cards
    },
    breakpoints: {
      "(max-width: 1020px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(max-width: 720px)": {
        slides: { perView: 1, spacing: 0 }, // No gap, center cards
        centered: true,
      },
    },
  });

  return (
    <div className="flex justify-center w-full">
      <div ref={sliderRef} className="keen-slider w-[90%] max-w-[1200px]">
        <div className="keen-slider__slide flex justify-center px-4">
          <div className="w-[400px] max-w-full">
            <Card1 />
          </div>
        </div>
        <div className="keen-slider__slide flex justify-center px-4">
          <div className="">
            <Card2 />
          </div>
        </div>
        <div className="keen-slider__slide flex justify-center px-4">
          <div className="">
            <Card3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSwiper;
