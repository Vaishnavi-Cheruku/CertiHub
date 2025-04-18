import React from "react";

const StaffProfile = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">👤 Staff Profile</h3>
      <div className="bg-white p-6 rounded shadow space-y-2">
        <p><strong>Name:</strong> Officer Name</p>
        <p><strong>Email:</strong> officer@gov.in</p>
        <p><strong>Role:</strong> District Officer</p>
      </div>
    </div>
  );
};

export default StaffProfile;
