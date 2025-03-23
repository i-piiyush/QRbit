import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Show toast notification only when `error` updates
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Login Successful!");
      navigate("/"); // Redirect to home after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="fixed top-0 z-[999] left-0 w-full h-full flex items-center justify-center backdrop-blur-lg">
      <Toaster />
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
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

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-lg w-full hover:bg-green-600 font-light tracking-tight"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-3">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
