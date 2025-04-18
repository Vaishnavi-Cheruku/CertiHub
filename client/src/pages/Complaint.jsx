
import React from "react";

const Complaint = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Complaint Box</h2>
        <p className="text-gray-700 mb-2">
          If you’re facing any issues related to certificate issuance or service delays, you can submit your complaint here. Your feedback helps us improve.
        </p>

        <p className="text-gray-800 mt-4">
          📬 You can also reach out via email at{" "}
          <a
            href="mailto:grievance@delhi.gov.in"
            className="text-blue-600 hover:underline"
          >
            grievance@delhi.gov.in
          </a>
        </p>

        <p className="text-gray-800 mt-2">
          📞 Helpline: <span className="text-gray-600">011-98765432</span>
        </p>
      </div>
    </div>
  );
};

export default Complaint;
