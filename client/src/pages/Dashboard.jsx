import React from "react";

const Dashboard = () => {
  const totalApplications = 120;
  const pendingApplications = 45;
  const verifiedApplications = 60;
  const rejectedApplications = 15;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">📊 Staff Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow p-4 border-t-4 border-blue-500 text-center rounded">
          <h3 className="text-lg font-semibold">Total Applications</h3>
          <p className="text-2xl">{totalApplications}</p>
        </div>
        <div className="bg-white shadow p-4 border-t-4 border-yellow-500 text-center rounded">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl">{pendingApplications}</p>
        </div>
        <div className="bg-white shadow p-4 border-t-4 border-green-500 text-center rounded">
          <h3 className="text-lg font-semibold">Verified</h3>
          <p className="text-2xl">{verifiedApplications}</p>
        </div>
        <div className="bg-white shadow p-4 border-t-4 border-red-500 text-center rounded">
          <h3 className="text-lg font-semibold">Rejected</h3>
          <p className="text-2xl">{rejectedApplications}</p>
        </div>
      </div>

      <div className="bg-white shadow p-6 rounded">
        <h4 className="text-xl font-semibold mb-2">📌 Instructions for Staff</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Review applications from the Pending tab.</li>
          <li>Ensure documents match user details.</li>
          <li>Only approve valid and verified entries.</li>
          <li>If rejecting, add a clear reason for rejection.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
