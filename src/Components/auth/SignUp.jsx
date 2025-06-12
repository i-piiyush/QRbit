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
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join us to get started</p>
        </div>

        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          toastClassName="bg-gray-800 text-white"
          progressClassName="bg-green-400"
        />

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-gray-700 transition-all"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-gray-700 transition-all"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 chars)"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-gray-700 transition-all"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-400 hover:bg-green-500 text-black font-semibold rounded-xl transition-all active:scale-95 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <Loader /> : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              className="text-green-400 font-semibold hover:text-green-300 transition-all bg-transparent border-none cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;