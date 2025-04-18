import React from "react";
import Navbar from "../components/WNavbar.jsx";
import Header from "../components/Header.jsx";

const Welcome = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen-bg-[url("../assets/bg.jpeg")] bg-cover bg-center'>
      <Navbar />  {/* Add Navbar component */}
      <Header />  {/* Add Header component */}

    </div>
  );
};

export default Welcome;
