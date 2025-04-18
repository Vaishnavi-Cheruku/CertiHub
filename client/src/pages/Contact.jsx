import React from "react";

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-2">
          We'd love to hear from you! For any inquiries or support, feel free to reach out to us.
        </p>
        <p className="text-gray-800 font-medium mt-4">
          📧 Email:{" "}
          <a
            href="mailto:support@delhi.gov.in"
            className="text-blue-600 hover:underline"
          >
            support@delhi.gov.in
          </a>
        </p>
        <p className="text-gray-800 font-medium mt-2">
          ☎️ Phone: <span className="text-gray-600">011-12345678</span>
        </p>
        <p className="text-gray-800 font-medium mt-2">
          🏢 Office Address: <br />
          3rd Floor, Delhi Secretariat, IP Estate, New Delhi - 110002
        </p>
      </div>
    </div>
  );
};

export default Contact;
