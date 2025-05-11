import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
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
  const { selectedCardIndex } = useContext(AppContext);
console.log(selectedCardIndex)
  // If index is not set or no component found, return null (or a spinner/text)
  if (!selectedCardIndex || !cardComponentMap[selectedCardIndex]) {
    return null;
  }

  const SelectedCard = cardComponentMap[selectedCardIndex];
  return <SelectedCard />;
};

export default RenderSelectedCard;
