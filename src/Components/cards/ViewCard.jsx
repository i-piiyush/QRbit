import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, writeBatch, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import RenderSelectedCard from '../selection/RenderSelectedCard';
import { LoaderIcon } from 'lucide-react';
import { AppContext } from '../../Context/AppProvider';

const ViewCard = () => {
  const { userId } = useParams();
  const { user } = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;

        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData({ id: userId, ...userDocSnap.data() });

          if (!user || user.uid !== userId) {
            const sessionKey = `viewed-${userId}`;
            if (!sessionStorage.getItem(sessionKey)) {
              const viewRef = doc(db, 'cardViews', userId);
              const viewHistoryRef = collection(db, `cardViews/${userId}/viewHistory`);
              
              const batch = writeBatch(db);
              
              // Get current total or default to 0
              const viewDoc = await getDoc(viewRef);
              const currentTotal = viewDoc.exists() ? (viewDoc.data().totalViews || 0) : 0;
              const newTotal = currentTotal + 1;
              
              // Update main view document
              batch.set(viewRef, {
                totalViews: newTotal,
                lastViewed: serverTimestamp()
              }, { merge: true });
              
              // Add to view history
              batch.set(doc(viewHistoryRef), {
                timestamp: serverTimestamp(),
                cumulativeViews: newTotal,
                dailyIncrement: 1
              });
              
              await batch.commit();
              sessionStorage.setItem(sessionKey, 'true');
            }
          }
        }
      } catch (error) {
        console.error('Error updating view count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, user]);

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center">
      <LoaderIcon className="animate-spin h-12 w-12 text-white" />
    </div>;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-950">
      <div className="w-[350px]">
        <RenderSelectedCard user={userData} isLoading={loading} />
      </div>
    </div>
  );
};

export default ViewCard;