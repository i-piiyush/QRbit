import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import AuthModal from "../Components/AuthModal";

// Create the context
export const AppContext = createContext();

// AppProvider component
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [authModal, setAuthModal] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch user data on login to get the selectedCardIndex
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setSelectedCardIndex(
            data.selectedCardIndex !== undefined ? data.selectedCardIndex : null
          );
        } else {
          // Create user document if it doesn't exist
          await setDoc(userDocRef, { selectedCardIndex: null }, { merge: true });
          setSelectedCardIndex(null);
        }
      } else {
        setSelectedCardIndex(null);
      }
    };

    fetchUserData();
  }, [user]);

  // Save selectedCardIndex to Firestore
  useEffect(() => {
    const saveSelectedCardIndex = async () => {
      if (user && selectedCardIndex !== null) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, { selectedCardIndex }, { merge: true });
        } catch (err) {
          console.error("Error saving selectedCardIndex:", err);
        }
      }
    };

    saveSelectedCardIndex();
  }, [selectedCardIndex, user]);

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
        selectedCardIndex: null,
      });

      toast.success("Sign Up Successful!");
      setAuthModal(null);
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setSelectedCardIndex(null);
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error("Logout failed.");
      console.error("Logout Error:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loadingUser,
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
