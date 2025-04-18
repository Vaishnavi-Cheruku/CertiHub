import React from "react";
import { Link } from "react-router-dom";

const PendingApplications = () => {
  const dummyPending = [
    { id: 1, name: "Ravi Kumar", govId: "123456789012", submitted: "2025-04-01" },
  ];

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">🕒 Pending Applications</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Govt ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyPending.map((app) => (
              <tr key={app.id} className="border-t">
                <td className="py-2 px-4">{app.name}</td>
                <td className="py-2 px-4">{app.govId}</td>
                <td className="py-2 px-4">{app.submitted}</td>
                <td className="py-2 px-4">
                  <Link to={`/application-details/${app.id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingApplications;
