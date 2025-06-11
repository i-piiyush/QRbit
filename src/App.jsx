import { Route, Routes } from "react-router-dom";
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

function App() {
  const { isSignedUp, isLoggedIn } = useContext(AppContext);

  return (
    <div className="overflow-x-hidden relative">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ChooseDesign" element={<ChooseDesign />} />
        <Route path="/add-info" element={<AddInfo />} />
        <Route path="/user-cards" element={<UserCards />} />
        <Route path="/user-cards/view-card/:userId" element={<ViewCard />} />
        <Route path="/user-cards/share-card/:userId" element={<ShareCard />} />
        <Route path="/user-cards/edit-card" element={<AddInfo />} />
        <Route path="/user-cards/view-analytics/:userId" element={<ViewAnalytics />} />
      </Routes>

      {isSignedUp && <SignUp />}
      {isLoggedIn && <Login />}
    </div>
  );
}

export default App;
