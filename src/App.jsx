
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ChooseDesign from "./Components/ChooseDesign";
import { AppContext } from "./context/AppProvider";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import AddInfo from "./Components/AddInfo";

function App() {
  const { isSignedUp, isLoggedIn } = useContext(AppContext);

  return (
    <div className="overflow-x-hidden relative">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ChooseDesign" element={<ChooseDesign />} />
        <Route path="/add-info" element={<AddInfo />} />
      </Routes>

      {/* Global modals */}
      {isSignedUp && <SignUp />}
      {isLoggedIn && <Login />}
    </div>
  );
}

export default App;
