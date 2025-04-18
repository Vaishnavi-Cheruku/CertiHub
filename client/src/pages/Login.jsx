import React, { useContext, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin } = useContext(AppContent);

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    governmentId: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isRegister) {
        response = await axios.post(
          `${backendUrl}/api/auth/register`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
            governmentId: formData.governmentId,
          },
          { withCredentials: true } // Ensure cookies are sent
        );
        toast.success("Registration successful! Please log in.");
      } else {
        response = await axios.post(
          `${backendUrl}/api/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );
        toast.success("Login successful!");
        setIsLoggedin(true);
        localStorage.setItem("userToken", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
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
        <h2 className="text-2xl font-semibold mb-4">
          {isRegister ? "User Registration" : "User Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="governmentId"
                placeholder="Government ID (Aadhar)"
                value={formData.governmentId}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </>
          )}

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
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p
          className="text-blue-600 text-sm text-center mt-2 cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>

        {!isRegister && (
          <p
            className="text-gray-600 text-sm text-center mt-3 cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/reset-password")}
          >
            Forgot Password?
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
