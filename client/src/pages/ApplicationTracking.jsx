import React, { useState } from "react";
import axios from "axios";
import Tracking from "../components/Tracking";

const ApplicationTracking = () => {
  const [applicationId, setApplicationId] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setApplicationId(e.target.value);
  };

  const handleTrack = async () => {
    if (!applicationId.trim()) {
      setError("Please enter a valid Application ID.");
      return;
    }

    setLoading(true);
    setError("");
    setStatus(null);

    try {
      const response = await axios.get(`http://localhost:4000/api/track-application/${applicationId}`);
      setStatus(response.data);
    } catch (err) {
      setError("Application not found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tracking>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Track Your Application</h2>

          <div className="space-y-4">
            <input
              type="text"
              className="w-full px-5 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              placeholder="Enter Application ID"
              value={applicationId}
              onChange={handleChange}
            />

            <button
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
              onClick={handleTrack}
              disabled={loading}
            >
              {loading ? "Tracking..." : "Track Application"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center mt-4 animate-pulse">{error}</p>
          )}

          {/* Application Status Display */}
          {status && (
            <div className="mt-8 p-6 rounded-xl bg-blue-50 border border-blue-200 shadow-md space-y-2">
              <h5 className="text-2xl font-semibold text-blue-800 text-center">Application Details</h5>

              <p><span className="font-semibold">Application ID:</span> {status.id}</p>
              <p><span className="font-semibold">Applicant Name:</span> {status.name}</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>
                <span
                  className={`px-4 py-1 rounded-full text-white font-semibold text-sm
                    ${status.status === "Approved" ? "bg-green-500" 
                      : status.status === "Pending" ? "bg-yellow-500" 
                      : "bg-red-500"}`}
                >
                  {status.status}
                </span>
              </div>
              <p><span className="font-semibold">Last Updated:</span> {status.lastUpdated}</p>
            </div>
          )}
        </div>
      </div>
    </Tracking>
  );
};

export default ApplicationTracking;
