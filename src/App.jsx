import Section1 from "./Components/Section1";
import Section2 from "./Components/Section2";
import Section3 from "./Components/Section3";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import AppProvider, { AppContext } from "./context/AppProvider";
import { useContext } from "react";
import Login from "./Components/Login";


function App() {
   const {isSignedUp,isLoggedIn} = useContext(AppContext)
  return (
    <div className="overflow-x-hidden relative">
      <Section1 />

      {isSignedUp ? <SignUp /> : null}
      {isLoggedIn ? <Login /> : null}

      <Section2 />
      <Section3 />
      <Footer />
    </div>
  );
}

export default App;
