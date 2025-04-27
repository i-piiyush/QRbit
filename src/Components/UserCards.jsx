import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";

const UserCards = () => {
  const {selectedCardIndex} = useContext(AppContext)
  console.log(selectedCardIndex);
  
  return (
    
    <>
      <div className="bg-red-400 w-full h-[20vh] flex justify-center items-center">
        <h1 className="text-5xl font-bold ">Your Card</h1>
      </div>
      <div className="bg-blue-300 w-full px-5 py-3">
        <div className="w-[350px] ">

        {
    selectedCardIndex === 1 ? (
      <Card1 />
    ) : selectedCardIndex === 2 ? (
      <Card2 />
    ) : (
      <Card3 />
    )
  }
        </div>
    
      </div>
    </>
  );
};

export default UserCards;
