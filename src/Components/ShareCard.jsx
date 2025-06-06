import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import copy from "copy-to-clipboard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useParams } from "react-router-dom";
import { LoaderIcon } from "lucide-react";

const ShareCard = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        setLoading(true);
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          setError("User not found");
          return;
        }

        const data = userDocSnap.data();
        if (!data.cards || data.cards.length === 0) {
          setError("No cards found");
          return;
        }

        setCards(data.cards);
        // Default to first card
        setSelectedIndex(0);
      } catch (err) {
        console.error(err);
        setError("Failed to load cards");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCards();
  }, [userId]);

  const shareUrl = `${window.location.origin}/view/${userId}/${selectedIndex}`;

  const handleCopy = () => {
    copy(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <LoaderIcon className="animate-spin text-white h-12 w-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Share Profile Card</h1>
      
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="card-select" className="block mb-2 font-medium">
            Select Card:
          </label>
          <select
            id="card-select"
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          >
            {cards.map((card, index) => (
              <option key={index} value={index}>
                {card.title || `Card ${index + 1}`}
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 bg-white rounded-lg mb-4 flex justify-center">
          <QRCode value={shareUrl} size={200} level="H" />
        </div>

        <div className="mb-4">
          <p className="text-sm mb-1">Shareable Link:</p>
          <div className="p-2 bg-gray-700 rounded break-words text-sm">
            {shareUrl}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded font-medium transition-colors"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
};

export default ShareCard;