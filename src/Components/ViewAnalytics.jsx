import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { Bar } from 'react-chartjs-2';
import { db } from "../firebaseConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ViewAnalytics = ({ cardId }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const docRef = doc(db, 'cardViews', cardId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAnalyticsData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [cardId]);

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  if (!analyticsData) {
    return <div>No analytics data available for this card.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Card Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-gray-600">Total Views</h3>
          <p className="text-3xl font-bold">{analyticsData.totalViews || 0}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-gray-600">Last Viewed</h3>
          <p className="text-lg">
            {analyticsData.lastViewed?.toDate?.().toLocaleString() || 'Never'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewAnalytics;