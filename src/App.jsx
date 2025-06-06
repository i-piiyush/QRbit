import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./Context/AppProvider";
import LandingPage from "./Components/LandingPage";
import AddInfo from "./Components/AddInfo";
import UserCards from "./Components/UserCards";
import ChooseDesign from "./Components/ChooseDesign";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

import ViewCard from "./Components/ViewCard";
import ViewAnalytics from "./Components/ViewAnalytics";
import ShareCard from "./Components/ShareCard";

function App() {
  const { isSignedUp, isLoggedIn } = useContext(AppContext);

  return (
    <div className="overflow-x-hidden relative">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ChooseDesign" element={<ChooseDesign />} />
        <Route path="/add-info" element={<AddInfo />} />
        <Route path="/user-cards" element={<UserCards />} />
        <Route path="/user-cards/:userId/:cardIndex" element={<ViewCard />} />
        <Route path="/user-cards/:userId" element={<ShareCard />} />
        <Route path="/user-cards/edit-card" element={<AddInfo />} />
      </Routes>

      {isSignedUp && <SignUp />}
      {isLoggedIn && <Login />}
    </div>
  );
}

export default App;
