import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import AuthModal from "../Components/AuthModal";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [authModal, setAuthModal] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [loadingCardIndex, setLoadingCardIndex] = useState(true);

  // Monitor auth state and fetch user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setSelectedCardIndex(data.selectedCardIndex || null);
          } else {
            await setDoc(userDocRef, { selectedCardIndex: null }, { merge: true });
            setSelectedCardIndex(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setSelectedCardIndex(null);
        }
      } else {
        setSelectedCardIndex(null);
      }
      
      setLoadingUser(false);
      setLoadingCardIndex(false);
    });

    return () => unsubscribe();
  }, []);

  // Save selectedCardIndex to Firestore whenever it changes
  useEffect(() => {
    const saveSelectedCardIndex = async () => {
      if (user && selectedCardIndex !== null) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, { selectedCardIndex });
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
        loadingCardIndex
      }}
    >
      {children}
      {authModal && <AuthModal />}
    </AppContext.Provider>
  );
};

export default AppProvider;