import React from "react";
import Card1 from "./Card1";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Card3 from "./Card3";
import Card2 from "./Card2";

const Section2 = () => {
  return (
    <div className="text-white w-full h-[140vh]  relative">
      <div className="blob top-[30rem] h-[200px] w-[200px] xl:h[500px] xl:w-[500px]  right-[50%] "></div>
      <div className="w-full h-[40%]  flex flex-col md:flex-row md:justify-between md:text-left justify-center items-center text-center px-[3%] gap-5">
        <h1 className="text-4xl md:text-4xl 2xl:text-5xl  font-bold md:w-[50%]">
          Made for Effortless
          <br />
          Networking
        </h1>
        <p className=" font-light  2xl:text-2xl opacity-70 w-[90%] md:w-[40%] md:text-lg">
          Qrbit empowers professionals with seamless digital identity sharing.
          Create, customize, and share your business card in just a scan.
        </p>
      </div>
      <div className="w-full bg-red-500 h-[60%] flex justify-center">
      <Swiper
      breakpoints={{
        320: { slidesPerView: 1, navigation: true }, // Mobile
        768: { slidesPerView: 2, navigation: true }, // Tablet
        1024: { slidesPerView: 3, navigation: false }, // Small Laptop and above
      }}
      modules={[Navigation]}
      className="mySwiper "
      loop={true}
    >
       <SwiperSlide>
        <div> <Card1 /> </div>
      </SwiperSlide>
      <SwiperSlide>
        <div> <Card2 /> </div>
      </SwiperSlide>
      <SwiperSlide>
        <div> <Card3 /> </div>
      </SwiperSlide>
    </Swiper>
      </div>
    </div>
  );
};

export default Section2;
