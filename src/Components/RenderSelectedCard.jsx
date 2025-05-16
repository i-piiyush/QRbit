import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppProvider";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Card1 from "./Card1";

// Map card index to components
const cardComponentMap = {
  1: Card1,
  2: Card2,
  3: Card3
};

const RenderSelectedCard = () => {
  const { selectedCardIndex, loadingUser } = useContext(AppContext);

  useEffect(() => {
    console.log("Selected Card Index:", selectedCardIndex);
  }, [selectedCardIndex]);

  // Wait until user and card index are loaded
  if (loadingUser || selectedCardIndex === null) {
    return <div>Loading...</div>; // You can replace with a spinner if needed
  }

  const SelectedCard = cardComponentMap[selectedCardIndex];

  // Handle invalid index
  if (!SelectedCard) {
    return <div>Invalid card selected</div>;
  }

  return <SelectedCard />;
};

export default RenderSelectedCard;
