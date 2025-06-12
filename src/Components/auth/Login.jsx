import React, { useState, useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import Loader from "../common/Loader";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin, user } = useContext(AppContext);
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await handleLogin(formData);
      if (success) {
        navigate('/'); // Redirect to home after successful login
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Login</h2>
      <ToastContainer position="top-right" autoClose={3000} />

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
          disabled={loading}
        >
          {loading ? <Loader /> : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-3">
        Don't have an account?{" "}
        <button
          className="text-green-500 cursor-pointer hover:underline bg-transparent border-none"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;