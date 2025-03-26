import SignUp from "./SignUp";
import Login from "./Login";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

const AuthModal = () => {
  const { authModal, setAuthModal } = useContext(AppContext);

  if (!authModal) return null; // If modal is null, don't render anything

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-[999] backdrop-blur-xl flex justify-center items-center">
      <div className="bg-white p-5 rounded-md shadow-md w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-2 text-center">
          {authModal === "signup" ? "Sign Up" : "Login"}
        </h2>
        {authModal === "signup" ? <SignUp /> : <Login />}
        <button
          onClick={() => setAuthModal(null)}
          className="absolute top-3 right-3 text-gray-50 hover:text-black"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
