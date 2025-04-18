import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {
        userId: userData?._id,
      });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-email`, {
        userId: userData?._id,
        otp,
      });

      if (data.success) {
        toast.success("Email verified successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-lg border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <button
        onClick={sendOtp}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-2 border mb-4 rounded"
      />
      <button
        onClick={verifyOtp}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
};

export default EmailVerify;
