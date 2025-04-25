import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppProvider";
import Loader from "./Loader";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    try {
      await handleLogin(formData);
      toast.success("Login successful!");
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastClassName="custom-toast"
        className="custom-toast-container"
      />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-500 h-10 text-white p-2 rounded-lg w-full hover:bg-green-600 flex justify-center items-center"
        >
          {loading ? <Loader /> : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-3">
        Don't have an account?{" "}
        <span
          className="text-green-500 cursor-pointer hover:underline"
          onClick={() => setAuthModal("signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
