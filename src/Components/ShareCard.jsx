import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { doc, getDoc, setDoc } from "firebase/firestore";
import copy from "copy-to-clipboard";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const ShareCard = ({ cardId }) => {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Step 1: Wait for Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Step 2: Initialize when user and browser environment are ready
  useEffect(() => {
    const initializeShareCard = async () => {
      try {
        const baseUrl =
          typeof window !== "undefined" && window.location?.origin
            ? window.location.origin
            : "https://your-app.vercel.app"; // fallback

        const url = `${baseUrl}/user-cards/view-card/${cardId}`;
        setShareUrl(url);

        const viewDocRef = doc(db, "cardViews", cardId);
        const docSnap = await getDoc(viewDocRef);

        if (docSnap.exists()) {
          setTotalViews(docSnap.data().totalViews || 0);
        } else {
          await setDoc(viewDocRef, {
            cardId,
            ownerId: user?.uid || null,
            totalViews: 0,
            createdAt: new Date(),
            lastViewed: null,
          });
        }
      } catch (err) {
        console.error("Initialization error:", err);
        setError("Failed to initialize sharing");
      } finally {
        setLoading(false);
      }
    };

    if (user && cardId) {
      initializeShareCard();
    }
  }, [cardId, user]);

  const handleCopy = () => {
    copy(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-red-200">
        <p className="text-red-700 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black px-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Share your card</h1>
      <QRCode value={shareUrl} />
      <p className="mt-4 break-words text-center max-w-[90%]">{shareUrl}</p>
      <button
        onClick={handleCopy}
        className="mt-4 px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition-all"
      >
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
      <p className="mt-2 text-sm text-gray-400">Total Views: {totalViews}</p>
    </div>
  );
};

export default ShareCard;
