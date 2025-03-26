import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import AuthModal from "../Components/AuthModal";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignUp = async (formData) => {
    try {
      if (formData.password.length < 6) {
        toast.error("Password should be at least 6 characters.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
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

  const handleLogin = async (formData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      toast.success("Login Successful!");
      setAuthModal(null);
    } catch (err) {
      toast.error("Invalid email or password.");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      console.log("Logout button clicked!"); // Debugging log
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed.");
    }
  };

  return (
    <AppContext.Provider value={{ user, authModal, setAuthModal, handleSignUp, handleLogin, handleLogout }}>
      {children}
      {authModal && <AuthModal />}
    </AppContext.Provider>
  );
};

export default AppProvider;
