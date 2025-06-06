import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebaseConfig";
import RenderSelectedCard from "./RenderSelectedCard";
import { LoaderIcon } from "lucide-react";
import AuthPrompt from "./AuthPrompt"; // New component for login/signup prompt

const ViewCard = () => {
  const { userId, cardIndex } = useParams();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // Fetch card data and track views
  useEffect(() => {
    const fetchData = async () => {
      if (!userId || cardIndex === undefined) {
        setError("Invalid URL parameters");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Get user document
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          setError("User not found");
          setLoading(false);
          return;
        }

        const data = userDocSnap.data();

        // Validate card index
        const parsedIndex = parseInt(cardIndex);
        if (!data.cards || !data.cards[parsedIndex]) {
          setError("Selected card not found");
          setLoading(false);
          return;
        }

        // Track views for this specific card
        const viewDocRef = doc(db, "cardViews", `${userId}_${parsedIndex}`);
        try {
          await updateDoc(viewDocRef, {
            totalViews: increment(1),
            lastViewed: new Date(),
          });
        } catch (error) {
          // Document doesn't exist yet, create it
          await setDoc(viewDocRef, {
            userId,
            cardIndex: parsedIndex,
            totalViews: 1,
            lastViewed: new Date(),
          });
        }

        // Set card data to render
        setCardData({
          ...data.cards[parsedIndex],
          userId,
          cardIndex: parsedIndex
        });
      } catch (err) {
        setError("Failed to fetch card data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, cardIndex]);

  const handleAuthPromptClose = () => {
    setShowAuthPrompt(false);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black">
        <LoaderIcon className="animate-spin text-white h-12 w-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black text-red-500 text-xl px-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex justify-center items-center overflow-hidden relative bg-black">
      <div className="blob -top-[10rem] md:top-[10rem] h-[500px] w-[500px] -left-[10rem] md:left-[20rem]"></div>
      <div className="w-[350px] px-4">
        {cardData && <RenderSelectedCard cardData={cardData} />}
        
        {/* Show auth prompt if needed (e.g., for additional actions) */}
        {showAuthPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <AuthPrompt onClose={handleAuthPromptClose} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCard;