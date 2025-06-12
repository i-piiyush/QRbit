import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./Context/AppProvider";
import LandingPage from "./Components/pages/LandingPage";
import AddInfo from "./Components/pages/AddInfo";
import UserCards from "./Components/cards/UserCards";
import ChooseDesign from "./Components/selection/ChooseDesign";
import SignUp from "./Components/auth/SignUp";
import Login from "./Components/auth/Login";
import ViewCard from "./Components/cards/ViewCard";
import ViewAnalytics from "./Components/analytics/ViewAnalytics";
import ShareCard from "./Components/cards/ShareCard";
import Loader from "./Components/common/Loader";
import { ToastContainer } from "react-toastify";

function ProtectedRoute({ children }) {
  const { user, loadingUser } = useContext(AppContext);
  
  if (loadingUser) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
}

function App() {
  return (
    <div className="overflow-x-hidden relative">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/ChooseDesign" element={
          <ProtectedRoute>
            <ChooseDesign />
          </ProtectedRoute>
        } />
        <Route path="/add-info" element={
          <ProtectedRoute>
            <AddInfo />
          </ProtectedRoute>
        } />
        <Route path="/user-cards" element={
          <ProtectedRoute>
            <UserCards />
          </ProtectedRoute>
        } />
        <Route path="/user-cards/view-card/:userId" element={
          <ProtectedRoute>
            <ViewCard />
          </ProtectedRoute>
        } />
        <Route path="/user-cards/share-card/:userId" element={
          <ProtectedRoute>
            <ShareCard />
          </ProtectedRoute>
        } />
        <Route path="/user-cards/edit-card" element={
          <ProtectedRoute>
            <AddInfo />
          </ProtectedRoute>
        } />
        <Route path="/user-cards/view-analytics/:userId" element={
          <ProtectedRoute>
            <ViewAnalytics />
          </ProtectedRoute>
        } />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover
        pauseOnFocusLoss={false}
        closeOnClick
      />
    </div>
  );
}

export default App;