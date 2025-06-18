import React, { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import Card1 from "../cards/Card1";
import Card2 from "../cards/Card2";
import Card3 from "../cards/Card3";
import { LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";


const cardComponentMap = {
  1: Card1,
  2: Card2,
  3: Card3,
};

const RenderSelectedCard = ({ user, isLoading }) => {
  const { selectedCardIndex } = useContext(AppContext);
const navigate = useNavigate()
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
         <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-white">No Template Selected</h2>
          <p className="text-gray-300">
            You haven't selected a card template yet. Please choose a design to get started.
          </p>
        </div>
        <button
          onClick={() => navigate('/ChooseDesign')}
          className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-igreen-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Choose Design
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
    );
  }

  const SelectedCard = cardComponentMap[displayCardIndex];
  if (!SelectedCard) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <p>Invalid card template selected</p>
      </div>
    );
  }

  return <SelectedCard user={displayUser} isLoading={false} />;
};

export default RenderSelectedCard;