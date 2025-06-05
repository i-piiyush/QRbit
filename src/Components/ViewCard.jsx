import React, { useEffect } from "react";
import RenderSelectedCard from "./RenderSelectedCard";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useParams } from "react-router-dom";

const ViewCard = () => {
  const { loadingCardIndex, user, loadingUser } = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cardId } = useParams();

  // Track the view when component mounts
  useEffect(() => {
    const trackView = async () => {
      if (!cardId) return;
      
      try {
        const viewDocRef = doc(db, 'cardViews', cardId);
        await updateDoc(viewDocRef, {
          totalViews: increment(1),
          lastViewed: new Date()
        }, { merge: true });
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    };

    trackView();
  }, [cardId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserData({ id: userDocSnap.id, ...userDocSnap.data() });
      }
      setLoading(false);
    };

    if (!loadingUser && user) {
      fetchData();
    }
  }, [user, loadingUser]);

  if (loadingCardIndex) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoaderIcon className="animate-spin text-white h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex justify-center items-center overflow-hidden relative">
      <div className="blob -top-[10rem] md:top-[10rem] h-[500px] w-[500px] -left-[10rem] md:left-[20rem]"></div>
      <div className="w-[350px] px-4">
        <RenderSelectedCard user={userData} isLoading={loading} />
      </div>
    </div>
  );
};

export default ViewCard;