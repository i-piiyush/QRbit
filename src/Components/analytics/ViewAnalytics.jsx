import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, subDays, subMonths } from 'date-fns';
import { Ring } from '@uiball/loaders';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ViewAnalytics = () => {
  const [viewData, setViewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [chartType, setChartType] = useState('cumulative');
  const [totalViews, setTotalViews] = useState(0);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const viewsDocRef = doc(db, 'cardViews', userId);
        const viewsDocSnap = await getDoc(viewsDocRef);
        setTotalViews(viewsDocSnap.exists() ? viewsDocSnap.data().totalViews || 0 : 0);

        let startDate;
        switch (timeRange) {
          case 'day':
            startDate = subDays(new Date(), 1);
            break;
          case 'week':
            startDate = subDays(new Date(), 7);
            break;
          case 'month':
            startDate = subMonths(new Date(), 1);
            break;
          default:
            startDate = subDays(new Date(), 7);
        }

        const viewHistoryRef = collection(db, `cardViews/${userId}/viewHistory`);
        const q = query(
          viewHistoryRef,
          where('timestamp', '>=', startDate),
          orderBy('timestamp', 'asc')
        );

        const querySnapshot = await getDocs(q);
        const views = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().timestamp.toDate(),
        }));

        const processedData = processViewData(views, timeRange, chartType);
        setViewData(processedData);
      } catch (error) {
        console.error('Error fetching view data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange, chartType, userId]);

  const processViewData = (views, range, type) => {
    const formatString = range === 'day' ? 'HH:00' : 'MMM dd';
    const groupedData = {};
    views.forEach(view => {
      const key = format(view.date, formatString);
      if (!groupedData[key]) groupedData[key] = 0;
      groupedData[key]++;
    });

    const result = [];
    let cumulative = 0;

    Object.keys(groupedData).sort().forEach(key => {
      const count = groupedData[key];
      if (type === 'cumulative') {
        cumulative += count;
        result.push({ time: key, views: cumulative });
      } else {
        result.push({ time: key, views: count });
      }
    });

    return result;
  };

  if (loading) {
    return (
      <motion.div
        className="w-full h-screen bg-black flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Ring
                    size={50}
                    speed={0.8}
                    stroke="1"
                    strokeLength="0.25"
                    bgOpacity="0.1"
                    color="white"
                  />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-black min-h-screen text-white p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', damping: 10 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">
            View Analytics
          </h1>
          <motion.p 
            className="text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Track your card's performance
          </motion.p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          className="bg-gray-900 rounded-2xl p-5 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <motion.p 
                className="text-3xl font-bold text-white"
                key={totalViews}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {totalViews}
              </motion.p>
            </div>
            <div className="bg-green-400/10 p-3 rounded-xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex gap-2 bg-gray-900 p-1 rounded-xl">
            {['day', 'week', 'month'].map((range) => (
              <motion.button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm rounded-xl ${
                  timeRange === range
                    ? 'bg-green-400 text-black font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </motion.button>
            ))}
          </div>
          
          <div className="flex gap-2 bg-gray-900 p-1 rounded-xl">
            {['cumulative', 'daily'].map((type) => (
              <motion.button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-4 py-2 text-sm rounded-xl ${
                  chartType === type
                    ? 'bg-green-400 text-black font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          className="bg-gray-900 rounded-2xl p-4 shadow-lg"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0, ease:"easeInOut" }}
        >
          <div className="h-[300px] sm:h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${timeRange}-${chartType}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={viewData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#9CA3AF" 
                      tickMargin={10}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#9CA3AF" 
                      tickMargin={10}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: '#111827',
                        borderColor: '#374151',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      labelStyle={{ 
                        color: '#E5E7EB',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}
                      itemStyle={{ 
                        color: '#22C55E',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      cursor={{ fill: '#22C55E', opacity: 0.1 }}
                    />
                    <Bar 
                      dataKey="views" 
                      fill="#22C55E" 
                      radius={[6, 6, 0, 0]}
                      animationDuration={2000}
                      animationEasing="ease-out"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Additional Stats (Placeholder) */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
         
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ViewAnalytics;