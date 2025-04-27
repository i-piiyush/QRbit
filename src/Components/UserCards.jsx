import React, { useEffect, useState } from "react";
import { ArrowUpRight, LoaderIcon } from "lucide-react";
import { collection, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 👈 import auth
import { db } from "../firebaseConfig";


const UserCards = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.log("No user logged in");
        return;
      }

      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUser({ id: userDocSnap.id, ...userDocSnap.data() });
        console.log({ id: userDocSnap.id, ...userDocSnap.data() });
      } else {
        console.log("No such user document!");
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" w-full h-screen px-8 py-6  relative ">
      <div className="blob top-[12rem] h-[300px] w-[300px] -left-[5rem]"></div>
      <div className=" flex flex-col justify-between h-[20vh] relative z-10">
        <h1 className="text-white text-4xl font-bold">{`Hey ${user.name},`}</h1>


        <p className="font-semibold text-center text-white text-lg opacity-75">Take your next steps:</p>


      </div>
      <div className="mt-10 flex flex-col gap-3 relative z-10">
        <div className="h-44 flex gap-3 px-2">
          <div className="bg-black h-full w-1/2 rounded"></div>
          <div className="bg-black h-full w-1/2 rounded"></div>
        </div>
        <div className="h-28 px-2">

          <div className="bg-black h-full rounded"></div>
          
        </div>
        <div className="h-32 px-2">

          <div className="bg-black h-full rounded"></div>
          
        </div>
      </div>
    </div>
  );
};

export default UserCards;
