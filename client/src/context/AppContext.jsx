import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContent = createContext();

// ✅ Ensure cookies are always sent with requests
axios.defaults.withCredentials = true;

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isStaffLoggedin, setIsStaffLoggedin] = useState(false);
  const [staffData, setStaffData] = useState(null);

  // ✅ Fetch User Auth State
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        getUserData(); // ✅ Fetch user data immediately after successful login check
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  // ✅ Fetch User Data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.user);
      } else {
        setUserData(null);
        toast.error(data.message);
      }
    } catch (error) {
      setUserData(null);
      toast.error(error.response?.data?.message || "Error fetching user data");
    }
  };

  // ✅ Fetch Staff Auth State
  const getStaffAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/staff-auth/is-auth`);
      if (data.success) {
        setIsStaffLoggedin(true);
        getStaffData();
      } else {
        setIsStaffLoggedin(false);
        setStaffData(null);
      }
    } catch (error) {
      setIsStaffLoggedin(false);
      setStaffData(null);
    }
  };

  // ✅ Fetch Staff Data
  const getStaffData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/staff/data`);
      if (data.success) {
        setStaffData(data.staff);
      } else {
        setStaffData(null);
        toast.error(data.message);
      }
    } catch (error) {
      setStaffData(null);
      toast.error(error.response?.data?.message || "Error fetching staff data");
    }
  };

  // ✅ Ensure User & Staff Auth States are Checked on App Load
  useEffect(() => {
    const role = localStorage.getItem("loginRole");
    if (role === "staff") {
      getStaffAuthState();
    } else {
      getAuthState();
    }
  }, []);
  

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    getAuthState,
    isStaffLoggedin,
    setIsStaffLoggedin,
    staffData,
    setStaffData,
    getStaffData,
    getStaffAuthState,
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};
