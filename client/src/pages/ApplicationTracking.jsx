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
      // Replace with your backend API endpoint
      const response = await axios.get(`http://localhost:5000/api/track-application/${applicationId}`);
      setStatus(response.data);
    } catch (err) {
      setError("Application not found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tracking>
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">Track Your Application</h2>

      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Application ID"
          value={applicationId}
          onChange={handleChange}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
          onClick={handleTrack}
          disabled={loading}
        >
          {loading ? "Tracking..." : "Track Application"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Application Status Display */}
      {status && (
        <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
          <h5 className="text-xl font-semibold">Application Details</h5>
          <p><strong>Application ID:</strong> {status.id}</p>
          <p><strong>Applicant Name:</strong> {status.name}</p>
          <p>
            <strong>Status:</strong>
            <span
              className={`inline-block px-3 py-1 mt-2 rounded-full text-white 
                ${status.status === "Approved" ? "bg-green-500" : status.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}
            >
              {status.status}
            </span>
          </p>
          <p><strong>Last Updated:</strong> {status.lastUpdated}</p>
        </div>
      )}
    </div>
    </Tracking>
  );
};

export default ApplicationTracking;
