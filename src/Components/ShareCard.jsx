import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment, collection, addDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import QRCode from 'react-qr-code';
import { AppContext } from '../Context/AppProvider';
import { LoaderIcon, CopyIcon, Share2Icon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShareCard = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);
  const [activeTab, setActiveTab] = useState('qr');

  const viewCardUrl = userId ? `${window.location.origin}/user-cards/view-card/${userId}` : null;

  useEffect(() => {
    if (!userId) {
      showToast('Invalid user ID', 'error');
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user card data
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          showToast('User card not found', 'error');
          navigate('/');
          return;
        }

        setCardData(userDocSnap.data());

        // Fetch and update view count
        const viewsDocRef = doc(db, 'cardViews', userId);
        const viewsDocSnap = await getDoc(viewsDocRef);
        const currentViews = viewsDocSnap.exists() ? (viewsDocSnap.data().totalViews || 0) : 0;
        setViewCount(currentViews);

        // Don't count views from card owner
        if (user && user.uid === userId) return;

        const sessionKey = `viewed-${userId}`;
        const alreadyViewed = sessionStorage.getItem(sessionKey);

        if (!alreadyViewed) {
          // Use batch write for atomic updates
          const batch = writeBatch(db);
          
          // Update total views count
          batch.update(viewsDocRef, {
            totalViews: increment(1),
            lastViewed: serverTimestamp()
          }, { merge: true });
          
          // Add to view history
          const viewHistoryRef = collection(db, `cardViews/${userId}/viewHistory`);
          batch.set(doc(viewHistoryRef), {
            timestamp: serverTimestamp(),
            cumulativeViews: currentViews + 1,
            dailyIncrement: 1,
            viewerId: user?.uid || 'anonymous'
          });
          
          await batch.commit();
          
          // Update local state and mark as viewed
          setViewCount(currentViews + 1);
          sessionStorage.setItem(sessionKey, 'true');
          
          // Optional: Log successful view count
          console.log('View counted successfully');
        }
      } catch (error) {
        console.error('Error updating view count:', error);
        showToast('Failed to update view count', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, user, navigate]);

  const showToast = (message, type = 'success') => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      style: {
        backgroundColor: type === 'error' ? '#ef4444' : '#10b981',
        color: '#fff'
      }
    });
  };

  const handleShare = async () => {
    if (!viewCardUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${cardData?.name}'s Digital Card`,
          text: `Check out ${cardData?.name}'s digital business card`,
          url: viewCardUrl,
        });
      } else {
        await navigator.clipboard.writeText(viewCardUrl);
        showToast('Link copied to clipboard!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        await navigator.clipboard.writeText(viewCardUrl);
        showToast('Link copied to clipboard!');
      }
    }
  };

  const handleCopy = async () => {
    if (!viewCardUrl) return;
    try {
      await navigator.clipboard.writeText(viewCardUrl);
      showToast('Link copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy link', 'error');
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <LoaderIcon className="animate-spin h-12 w-12 text-green-400" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <div className="max-w-md w-full mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {cardData?.name || 'User'}'s Card
              </h1>
              <p className="text-gray-400">
                Views: <span className="text-green-400 font-medium">{viewCount}</span>
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('qr')}
                className={`px-3 py-1 rounded-md ${activeTab === 'qr' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                QR Code
              </button>
            </div>
          </div>

          <div className="flex justify-center mb-6 p-4 bg-black rounded-lg border border-gray-700">
            {activeTab === 'qr' && viewCardUrl && (
              <QRCode 
                value={viewCardUrl}
                size={200}
                bgColor="transparent"
                fgColor="#ffffff"
                level="H"
              />
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
            >
              <CopyIcon size={18} />
              Copy Card Link
            </button>
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <Share2Icon size={18} />
              Share Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;