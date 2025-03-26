import React, { useState, useEffect, useContext } from "react";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../context/AppProvider";

const Login = () => {
  const { handleSignUp, setIsLoggedIn } = useContext(AppContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Login Successful!");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg z-[999]">
      <Toaster />
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
        <div className="flex justify-end items-center px-3 text-gray-500 text-xl cursor-pointer hover:text-black" onClick={() => setIsLoggedIn(false)}>
          ✖
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        
        <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg w-full font-light tracking-tight"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg w-full font-light tracking-tight"
            required
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded-lg w-full hover:bg-green-600 font-light tracking-tight">
            Login
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-3">
          Don't have an account? 
          <span className="text-green-500 cursor-pointer hover:underline" onClick={handleSignUp}> Sign Up </span>
        </p>
      </div>
    </div>
  );
};

export default Login;