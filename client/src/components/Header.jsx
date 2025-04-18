import React, { useContext, useEffect } from "react";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData, getUserData, isLoggedin } = useContext(AppContent);

  useEffect(() => {
    if (isLoggedin && !userData) {
      getUserData();
    }
  }, [isLoggedin, userData, getUserData]);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"}!
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to CertiHub!
      </h2>

      <p className="mb-8 max-w-md">
        Let's start with a quick product tour and we will have you up and running in no time!
      </p>

      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
