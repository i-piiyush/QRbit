import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppProvider";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";

const Login = () => {
  const { handleLogin, setAuthModal } = useContext(AppContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleLogin(formData);
    setLoading(false);
  };

  return (
    <div>
      <Toaster />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg w-full" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg w-full" required />
        <button type="submit" className="bg-green-500 h-10 text-white p-2 rounded-lg w-full hover:bg-green-600 flex justify-center items-center">
          {loading ? <Loader /> : "Login"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-3">
        Don't have an account?{" "}
        <span className="text-green-500 cursor-pointer hover:underline" onClick={() => setAuthModal("signup")}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
