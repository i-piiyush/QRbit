import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  fetchSignInMethodsForEmail, 
  signOut 
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { AppContext } from "../context/AppProvider";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from 'rsuite';

const SignUp = () => {
  // State for form data
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { setIsSignedUp, handleLogin } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  // Handles input changes and updates form state
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if password is more than 6 characters
    if (formData.password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // Ensure user is signed out before signing up
      await signOut(auth);
      

      // Check if email is already in use
      const methods = await fetchSignInMethodsForEmail(auth, formData.email);
      if (methods.length > 0) {
        toast.error("Email already in use. Try logging in.");
        setLoading(false);
        return;
      }

      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Store user details in Firestore database
      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName: formData.fullName,
        email: formData.email,
      });

      toast.success("Sign Up Successful!");
      setIsSignedUp(false);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center backdrop-blur-lg">
      <Toaster />
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
        {/* Close button for the signup modal */}
        <div className="flex justify-end items-center px-3 text-gray-500 text-xl cursor-pointer hover:text-black" onClick={() => setIsSignedUp(false)}>✖</div>
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg w-full font-light tracking-tight" required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg w-full font-light tracking-tight" required />
          <input type="password" name="password" placeholder="Password (min 6 characters)" value={formData.password} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg w-full font-light tracking-tight" required />
          <button type="submit" className="bg-green-500 text-white p-2 rounded-lg w-full hover:bg-green-600 font-light tracking-tight flex justify-center items-center">
            {loading ? <Loader />: "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account? <span className="text-green-500 cursor-pointer hover:underline" onClick={handleLogin}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
