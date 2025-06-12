import React, { useState, useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import Loader from "../common/Loader";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { handleSignUp, user } = useContext(AppContext);
  const [formData, setFormData] = useState({ 
    fullName: "", 
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
      const success = await handleSignUp(formData);
      if (success) {
        navigate('/'); // Redirect to home after successful signup
      }
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Sign Up</h2>
      <ToastContainer position="top-right" autoClose={3000} />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg w-full"
          required
        />
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
          placeholder="Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg w-full"
          required
          minLength={6}
        />
        <button
          type="submit"
          className="bg-green-500 h-10 text-white p-2 rounded-lg w-full hover:bg-green-600 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Loader /> : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-3">
        Already have an account?{" "}
        <button
          className="text-green-500 cursor-pointer hover:underline bg-transparent border-none"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignUp;