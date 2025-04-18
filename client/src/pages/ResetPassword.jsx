import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const ResetPassword = ({ userType = "user" }) => {
  const { backendUrl } = useContext(AppContent);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Determine API base route
  const apiRoute = `${backendUrl}/api/${userType}`;

  const sendResetOtp = async () => {
    setLoading(true);
    try {
      const endpoint =
        userType === "staff"
          ? `${backendUrl}/api/staff/send-reset-otp`
          : `${backendUrl}/api/auth/send-reset-otp`;
  
      const { data } = await axios.post(endpoint, { email });
  
      if (data.success) {
        toast.success(data.message);
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending reset OTP");
    } finally {
      setLoading(false);
    }
  };
  

  const resetPassword = async () => {
    setLoading(true);
    try {
      const endpoint =
        userType === "staff"
          ? `${backendUrl}/api/staff/reset-password`
          : `${backendUrl}/api/auth/reset-password`;
  
      const { data } = await axios.post(endpoint, {
        email,
        otp,
        newPassword,
      });
  
      if (data.success) {
        toast.success(data.message);
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-lg border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {userType === "staff" ? "Staff" : "User"} Reset Password
      </h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border mb-4 rounded"
          />
          <button
            onClick={sendResetOtp}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send Reset OTP"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border mb-4 rounded"
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border mb-4 rounded"
          />
          <button
            onClick={resetPassword}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
