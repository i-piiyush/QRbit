import React from "react";
import { useNavigate } from "react-router-dom";

const AuthPrompt = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Sign in for more features</h2>
      <p className="mb-4">
        You're viewing this card as a guest. Sign in to access all features.
      </p>
      <div className="flex justify-between">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Continue as Guest
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default AuthPrompt;