import React, { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import { LoaderIcon } from "lucide-react";

const cardComponentMap = {
  1: Card1,
  2: Card2,
  3: Card3,
};

const RenderSelectedCard = ({ user, isLoading }) => {
  const { selectedCardIndex } = useContext(AppContext);

  // Use prop user data first, fallback to context if available
  const displayUser = user || useContext(AppContext).user;
  const displayCardIndex = user?.selectedCardIndex ?? selectedCardIndex;

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoaderIcon className="animate-spin h-12 w-12" />
      </div>
    );
  }

  if (!displayUser) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>No user data available</p>
      </div>
    );
  }

  if (displayCardIndex === null || displayCardIndex === undefined) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>No card template selected</p>
      </div>
    );
  }

  const SelectedCard = cardComponentMap[displayCardIndex];
  if (!SelectedCard) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Invalid card template selected</p>
      </div>
    );
  }

  return <SelectedCard user={displayUser} isLoading={false} />;
};

export default RenderSelectedCard;