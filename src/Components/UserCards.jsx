import React, { useEffect, useState, useContext } from "react";
import { ArrowUpRight, LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const UserCards = () => {
  const { user, loadingUser } = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = { id: userDocSnap.id, ...userDocSnap.data() };
        setUserData(data);
        
        // Store card ID in localStorage for easy access
        localStorage.setItem('currentCardId', data.id);
      }

      setLoading(false);
    };

    if (!loadingUser && user) {
      fetchData();
    }
  }, [user, loadingUser]);

  if (loadingUser || loading || !userData) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <LoaderIcon className="animate-spin text-white h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen px-8 py-6 relative overflow-x-hidden">
      <div className="blob top-[12rem] h-[700px] w-[700px] left-[15rem] xl:left-[30rem]"></div>
      <div className="flex flex-col justify-between h-[20vh] relative z-10">
        <h1 className="text-white text-4xl font-bold">
          {userData?.name ? `Hey ${userData.name},` : "Hey there,"}
        </h1>
        <p className="font-semibold text-center text-white text-lg opacity-75">
          Take your next steps:
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 relative z-10 main-container max-w-screen-lg w-full mx-auto">
        {/* First row */}
        <div className="h-44 md:h-60 flex gap-3 px-2">
          <div
            className="bg-black h-full w-1/2 md:w-[70%] rounded-2xl flex flex-col px-2 py-3 hover:px-10 relative group transition-all duration-300 hover:bg-white cursor-pointer"
            onClick={() => navigate(`/user-cards/view-card/${userData.id}`)}
          >
            <h1 className="text-white text-xl sm:text-3xl font-semibold transition-colors duration-300 group-hover:text-black">
              View your card
            </h1>
            <button className="absolute bottom-3 right-3 bg-red-50 group-hover:bg-black p-3 rounded-md w-12 h-12 flex justify-center items-center text-green-500">
              <ArrowUpRight />
            </button>
          </div>

          <div
            className="bg-black h-full w-1/2 rounded-2xl flex flex-col px-2 hover:px-10 py-3 relative group transition-all duration-300 hover:bg-white cursor-pointer"
            onClick={() => navigate("/user-cards/edit-card")}
          >
            <h1 className="text-white text-xl sm:text-3xl font-semibold transition-colors duration-300 group-hover:text-black">
              Change your card info
            </h1>
            <button className="absolute bottom-3 right-3 bg-red-50 group-hover:bg-black p-3 rounded-md w-12 h-12 flex justify-center items-center text-green-500">
              <ArrowUpRight />
            </button>
          </div>
        </div>

        {/* Second row */}
        <div className="md:flex-row flex flex-col gap-3 md:gap-0">
          <div className="h-44 md:h-60 px-2 md:w-[30%] relative group cursor-pointer">
            <div
              className="bg-black h-full rounded-2xl flex flex-col px-2 py-3 hover:px-10 transition-all duration-300 hover:bg-white"
              onClick={() => navigate(`/user-cards/share-card/${userData.id}`)}
            >
              <h1 className="text-white text-xl sm:text-3xl font-semibold transition-colors duration-300 group-hover:text-black">
                Share your card
              </h1>
              <button className="absolute bottom-3 right-3 bg-red-50 group-hover:bg-black p-3 rounded-md w-12 h-12 flex justify-center items-center text-green-500">
                <ArrowUpRight />
              </button>
            </div>
          </div>

          <div className="h-44 md:h-60 px-2 md:w-[70%] relative group cursor-pointer">
            <div
              className="bg-black h-full rounded-2xl flex flex-col px-2 py-3 hover:px-10 transition-all duration-300 hover:bg-white"
              onClick={() => navigate(`/user-cards/view-analytics/${userData.id}`)}
            >
              <h1 className="text-white text-xl sm:text-3xl font-semibold transition-colors duration-300 group-hover:text-black">
                View analytics
              </h1>
              <button className="absolute bottom-3 right-3 bg-red-50 group-hover:bg-black p-3 rounded-md w-12 h-12 flex justify-center items-center text-green-500">
                <ArrowUpRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCards;