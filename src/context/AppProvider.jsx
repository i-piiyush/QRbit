import { createContext, useState } from "react";

// Create context
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSignedUp, setIsSignedUp] = useState(false); // Track signup state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleLogin = (navigate) => {
    setIsLoggedIn(true);
    setIsSignedUp(false); // Auto-disable signup when logged in
    navigate("/"); // Redirect after login
  };

  const handleSignUp = (navigate) => {
    setIsSignedUp(true);
    setIsLoggedIn(false); // Auto-disable login when signing up
    navigate("/signup"); // Redirect after signup
  };

  return (
    <AppContext.Provider
      value={{ isSignedUp, isLoggedIn, handleLogin, handleSignUp , setIsLoggedIn, setIsSignedUp}}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
