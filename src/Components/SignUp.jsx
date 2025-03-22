import React, { useEffect } from "react";

const SignUp = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center backdrop-blur-lg">
     <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
  {/* Close button */}
  <div className="flex justify-end items-center  px-3 text-gray-500 text-xl cursor-pointer hover:text-black">
    ✖
  </div>

  <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

  <form className="flex flex-col gap-4">
    <input
      type="text"
      placeholder="Full Name"
      className="border border-gray-300 p-2 rounded-lg w-full font-light tracking-tight"
    />
    <input
      type="email"
      placeholder="Email Address"
      className="border border-gray-300 p-2 rounded-lg w-full font-light tracking-tight"
    />
    <input
      type="password"
      placeholder="Password"
      className="border border-gray-300 p-2 rounded-lg w-full font-light tracking-tight"
    />

    <button className="bg-green-500 text-white p-2 rounded-lg w-full hover:bg-green-600 font-light tracking-tight">
      Sign Up
    </button>
  </form>

  <p className="text-center text-sm text-gray-600 mt-3">
    Already have an account?{" "}
    <span className="text-green-500 cursor-pointer hover:underline">Login</span>
  </p>
</div>

    </div>
  );
};

export default SignUp;