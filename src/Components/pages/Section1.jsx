import React, { useContext } from "react"; // Importing necessary React functionalities
import { MdOutlineArrowOutward } from "react-icons/md"; // Importing an icon from react-icons
import Navbar from "../ui/Navbar"; // Importing Navbar component
import { AppContext } from "../../Context/AppProvider"; // Importing the AppContext for global state
import { useNavigate } from "react-router-dom"; // Importing useNavigate for programmatic navigation

const Section1 = () => {
  // Destructuring user and setAuthModal from AppContext
  const { user} = useContext(AppContext);

  // Initializing useNavigate hook for navigation
  const navigate = useNavigate();

  // Function to handle button click for navigation or showing authentication modal
  const handleButtonClick = () => {
    if (user) {
      // If user is logged in, navigate to the ChooseDesign page
      navigate("/ChooseDesign");
    } else {
      // If no user is logged in, show signup modal
      navigate("/signup");
    }
  };

  return (
    <div className="w-full h-[70vh] px-5 py-10 relative" id="home">
      {/* Rendering the Navbar component */}
      <Navbar />
      
      {/* Blob background element for styling */}
      <div className="blob -top-[10rem] h-[500px] w-[500px] -left-[10rem]"></div>
      
      {/* Main content section */}
      <div className="text-white w-full h-full flex justify-center md:items-start md:text-left items-center flex-col gap-3 md:gap-5 2xl:gap-10">
        {/* Main heading */}
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-7xl md:text-left md:w-[70%] xl:w-[90%] leading-none text-center z-10">
          QRbit is a <br className="md:hidden" />
          purpose-built <br className="md:hidden xl:block" /> tool for
          effortless networking.
        </h1>
        
        {/* Description text */}
        <p className="text-sm xl:text-base tracking-tighter opacity-70 text-center md:text-left md:w-[60%] xl:w-[40%] leading-none 2xl:text-xl">
          Meet the modern way to share your professional details. Generate sleek
          digital cards with QR codes and link.
        </p>
        
        {/* Button to trigger either navigation or modal */}
        <button
          className="bg-[#ffffff21] rounded-full px-5 py-3 flex gap-3 justify-center items-center text-sm backdrop-blur-xl 2xl:text-base 2xl:py-5 2xl:px-7"
          onClick={handleButtonClick} // Handling button click
        >
          Create your card
          <MdOutlineArrowOutward /> {/* Adding an arrow icon to the button */}
        </button>
      </div>
    </div>
  );
};

export default Section1; // Exporting the Section1 component for use in other parts of the app
