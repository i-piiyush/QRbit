import React, { useState, useEffect, useContext } from "react";
import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from "../firebaseConfig"; 
import { AppContext } from "../context/AppProvider";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { setIsSignedUp , handleLogin} = useContext(AppContext)
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
      });

      alert("Account created successfully!");
      onSignUpClick(); // Close the sign-up modal
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center backdrop-blur-lg">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
        {/* Close button */}
        <div
          className="flex justify-end items-center px-3 text-gray-500 text-xl cursor-pointer hover:text-black"
          onClick={() => setIsSignedUp(false)}
        >
          ✖
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg w-full font-light tracking-tight"
            required
          />
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <span className="text-green-500 cursor-pointer hover:underline" onClick={(()=>handleLogin())}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
