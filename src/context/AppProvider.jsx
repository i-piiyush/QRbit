import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import AuthModal from "../Components/AuthModal";

// Create the context
export const AppContext = createContext();

// AppProvider component
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // New state

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle SignUp
  const handleSignUp = async (formData) => {
    try {
      if (formData.password.length < 6) {
        toast.error("Password should be at least 6 characters.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName: formData.fullName,
        email: formData.email,
      });

      toast.success("Sign Up Successful!");
      setAuthModal(null);
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

  // Handle Login
  const handleLogin = async (formData) => {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Login Successful!");
      setAuthModal(null);
    } catch (err) {
      toast.error("Invalid email or password.");
      console.error(err);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      console.log("Logout button clicked!");
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        authModal,
        setAuthModal,
        handleSignUp,
        handleLogin,
        handleLogout,
        selectedCardIndex,
        setSelectedCardIndex,
      }}
    >
      {children}
      {authModal && <AuthModal />}
    </AppContext.Provider>
  );
};

export default AppProvider;
