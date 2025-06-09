import React, { useContext,useState,useEffect } from "react";
import { AppContext } from "../Context/AppProvider";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { LoaderIcon } from "lucide-react";

const cardComponentMap = {
  1: Card1,
  2: Card2,
  3: Card3,
};

const RenderSelectedCard = () => {
  const { selectedCardIndex, user, loadingUser } = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loadingUser || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderIcon className="animate-spin h-12 w-12 text-white" />
      </div>
    );
  }

  if (selectedCardIndex === null) {
    return <div>No card template selected</div>;
  }

  const SelectedCard = cardComponentMap[selectedCardIndex];
  if (!SelectedCard) return <div>Invalid card selected</div>;

  return <SelectedCard user={userData || user} isLoading={loading} />;
};

export default RenderSelectedCard;