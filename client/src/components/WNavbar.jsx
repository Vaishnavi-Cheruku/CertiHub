import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    backendUrl, // ✅ Ensure backendUrl is used
    userData,
    setUserData,
    setIsLoggedin,
  } = useContext(AppContent);

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // ✅ Handle User Logout
  const handleUserLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);

      if (data.success) {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // ✅ Clear token cookie
        setIsLoggedin(false);
        setUserData(null);
        navigate("/login"); // ✅ Redirect after logout
      } else {
        toast.error("Logout failed, try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
    }
  };

  // ✅ Handle Email Verification
  const handleUserVerifyEmail = () => {
    navigate("/verify-email");
  };

  // ✅ Toggle Dropdown
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <div className="flex items-center gap-4">
        {/* ✅ User Login or Profile */}
        {userData ? (
          <div className="relative">
            <div
              className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-500 text-white cursor-pointer"
              onClick={toggleUserDropdown}
            >
              {userData.name[0].toUpperCase()}
            </div>
            {userDropdownOpen && (
              <div className="absolute top-10 right-0 z-10 bg-white shadow-lg rounded-md w-36">
                <ul className="list-none p-2 text-sm">
                  {!userData.isAccountVerified && (
                    <li
                      className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                      onClick={handleUserVerifyEmail}
                    >
                      Verify Email
                    </li>
                  )}
                  <li
                    className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                    onClick={handleUserLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            className="border border-gray-500 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all"
            onClick={() => navigate("/login")}
          >
            User Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
