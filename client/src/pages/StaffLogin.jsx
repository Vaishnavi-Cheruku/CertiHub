import React, { useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const StaffLogin = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsStaffLoggedin } = useContext(AppContent);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${backendUrl}/api/staff-auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        setIsStaffLoggedin(true);
        toast.success("Staff Login successful!");
      
        // Save role + token
        localStorage.setItem("loginRole", "staff");
        localStorage.setItem("staffToken", response.data.token); // <== add this if token exists
      
        navigate("/staff-home");
      }
      else {
        toast.error(response.data.message || "Invalid credentials.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <FaUser className="text-gray-600 text-2xl" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Government Staff Login</h2>
        <p className="text-gray-500 text-sm mb-4">Authorized personnel only</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <p
          className="text-blue-600 text-sm text-center mt-3 cursor-pointer hover:underline"
          onClick={() => navigate("/reset-password")}
        >
          Forgot Password?
        </p>

        <p className="text-gray-500 text-xs text-center mt-3">
          Having trouble? Contact IT Support
        </p>
      </div>
    </div>
  );
};

export default StaffLogin;
