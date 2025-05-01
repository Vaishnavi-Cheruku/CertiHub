import React from "react";
import Navbar from "../components/WNavbar.jsx";
import Header from "../components/Header.jsx";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/assets/bg.jpeg')] bg-cover bg-center text-gray-900 relative">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0" />
      <Navbar />
      <Header />
    </div>
  );
};

export default Welcome;
