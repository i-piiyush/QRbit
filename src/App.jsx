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
import { Ring } from "@uiball/loaders";
import { ToastContainer } from "react-toastify";
import NotFound from "./Components/not found/NotFound";

function ProtectedRoute({ children }) {
  const { user, loadingUser } = useContext(AppContext);

  if (loadingUser)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Ring
          size={50}
          speed={0.8}
          stroke="1"
          strokeLength="0.25"
          bgOpacity="0.1"
          color="white"
        />
      </div>
    );
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
        <Route
          path="/ChooseDesign"
          element={
            <ProtectedRoute>
              <ChooseDesign />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-info"
          element={
            <ProtectedRoute>
              <AddInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-cards"
          element={
            <ProtectedRoute>
              <UserCards />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-cards/view-card/:userId"
          element={
            <ProtectedRoute>
              <ViewCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-cards/share-card/:userId"
          element={
            <ProtectedRoute>
              <ShareCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-cards/edit-card"
          element={
            <ProtectedRoute>
              <AddInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-cards/view-analytics/:userId"
          element={
            <ProtectedRoute>
              <ViewAnalytics />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
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
