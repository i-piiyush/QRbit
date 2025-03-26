import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppProvider";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";

const SignUp = () => {
  const { handleSignUp, setAuthModal } = useContext(AppContext);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleSignUp(formData);
    setLoading(false);
  };

  return (
    <div>
      <Toaster />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg w-full" required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg w-full" required />
        <input type="password" name="password" placeholder="Password (min 6 chars)" value={formData.password} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg w-full" required />
        <button type="submit" className="bg-green-500 h-10 text-white p-2 rounded-lg w-full hover:bg-green-600 flex justify-center items-center">
          {loading ? <Loader /> : "Sign Up"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-3">
        Already have an account?{" "}
        <span className="text-green-500 cursor-pointer hover:underline" onClick={() => setAuthModal("login")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignUp;
