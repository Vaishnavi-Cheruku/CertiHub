// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiUser } from "react-icons/fi"; // Profile Icon

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear token or session
    navigate("/"); // Redirect to Welcome page
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-md py-3 px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Flag_of_Delhi_Capital_Territory.svg/1200px-Flag_of_Delhi_Capital_Territory.svg.png"
            alt="Delhi Govt"
            className="h-16"
          />
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-blue-600 tracking-wide">
              CertiHub
            </span>
            <h1 className="text-xl font-semibold text-gray-800">
              Government of NCT of Delhi
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
            alt="India"
            className="h-10"
          />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="text-gray-700 hover:text-blue-800 text-2xl"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FiUser />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <Link to="/email-verify" className="block px-4 py-2 hover:bg-gray-100">Verify Email</Link>
                  </li>
                  <li>
                    <Link to="/forgot-password" className="block px-4 py-2 hover:bg-gray-100">Reset Password</Link>
                  </li>
                  <li>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  </li>
                  <li>
                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navbar Links */}
      <nav className="bg-gradient-to-r from-cyan-500 to-blue-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-4 justify-center md:justify-end">
          <Link to="/home" className="hover:text-yellow-300 font-medium">Home</Link>
          <Link to="/services" className="hover:text-yellow-300 font-medium">Services</Link>
          <Link to="/tracking" className="hover:text-yellow-300 font-medium">Application Tracking</Link>
          <Link to="/contact" className="hover:text-yellow-300 font-medium">Contact Us</Link>
          <Link to="/complaint" className="hover:text-yellow-300 font-medium">Complaint Box</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;