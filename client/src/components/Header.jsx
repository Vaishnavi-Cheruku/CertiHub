import React, { useContext, useEffect } from "react";
import { AppContent } from "../context/AppContext";
import { motion } from "framer-motion";

const Header = () => {
  const { userData, getUserData, isLoggedin } = useContext(AppContent);

  useEffect(() => {
    if (isLoggedin && !userData) {
      getUserData();
    }
  }, [isLoggedin, userData, getUserData]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center h-screen z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl sm:text-5xl font-bold text-blue-800 mb-4 drop-shadow-md">
        Welcome to CertiHub!
      </h2>
      <p className="mb-6 max-w-xl text-gray-700 text-base sm:text-lg">
        Start with a quick tour to understand how CertiHub simplifies your certificate needs.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="px-8 py-2.5 text-white bg-blue-700 hover:bg-blue-800 rounded-full shadow-md transition-all"
      >
        Get Started
  </motion.button>
</motion.div>
  );
};

export default Header;
