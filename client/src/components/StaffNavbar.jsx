// src/components/StaffNavbar.jsx
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const StaffNavbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("staffToken");
      localStorage.removeItem("role");
      navigate("/staff-login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gray-100 py-3 px-6 flex justify-between items-center border-b">
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Flag_of_Delhi_Capital_Territory.svg/1200px-Flag_of_Delhi_Capital_Territory.svg.png"
            alt="Delhi Govt Logo"
            className="h-16 mr-4"
          />
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-blue-600 tracking-wide">
              CertiHub
            </span>
            <h1 className="text-xl font-semibold text-gray-800">
              Government of National Capital Territory of Delhi
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
            alt="Indian Flag"
            className="h-12"
          />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none"
            >
              <FaUserCircle className="text-3xl text-gray-700 hover:text-gray-900" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                <Link
                  to="/staff-profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/staff-reset-password"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Reset Password
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navbar with items aligned to the right */}
      <nav className="bg-gray-800 text-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-end items-center h-14 space-x-6">
            <Link to="/staff-dashboard" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <Link to="/staff-pending" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Pending Applications
            </Link>
            <Link to="/staff-verified" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Verified Applications
            </Link>
            <Link to="/staff-rejected" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Rejected Applications
            </Link>
            <Link to="/staff-profile" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Profile
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default StaffNavbar;