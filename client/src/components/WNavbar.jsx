import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { backendUrl, userData, setUserData, setIsLoggedin } = useContext(AppContent);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleUserLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLoggedin(false);
        setUserData(null);
        navigate("/login");
      } else {
        toast.error("Logout failed, try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
    }
  };

  const handleUserVerifyEmail = () => {
    navigate("/verify-email");
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  return (
    <nav className="w-full z-10 flex justify-between items-center p-4 sm:px-24 absolute top-0">
      <h1 className="text-xl sm:text-2xl font-bold text-blue-900">CertiHub</h1>
      <div className="flex items-center gap-4">
        {userData ? (
          <div className="relative">
            <div
              className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-600 text-white font-semibold cursor-pointer"
              onClick={toggleUserDropdown}
            >
              {userData.name[0].toUpperCase()}
            </div>

            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 bg-white border shadow-md rounded-md overflow-hidden w-40 z-20"
                >
                  <ul className="text-sm">
                    {!userData.isAccountVerified && (
                      <li
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={handleUserVerifyEmail}
                      >
                        Verify Email
                      </li>
                    )}
                    <li
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={handleUserLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 border border-blue-700 text-blue-700 rounded-full hover:bg-blue-50 transition"
          >
            User Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
