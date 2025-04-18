import React from "react";
import { Link } from "react-router-dom";

const servicesList = [
  { sno: 1, department: "Revenue", certificate: "Agricultural Land Value Application" },
  { sno: 2, department: "Revenue", certificate: "Agriculture Income Certificate" },
  { sno: 3, department: "Revenue", certificate: "Apathbandhu Scheme" },
  { sno: 4, department: "Revenue", certificate: "Appeals on Demarcation" },
  { sno: 5, department: "Revenue", certificate: "CC of ROM HYD" },
  { sno: 6, department: "Revenue", certificate: "Certified Copies of TSLR" },
  { sno: 7, department: "Revenue", certificate: "Change of Name Application" },
  { sno: 8, department: "Revenue", certificate: "Community and Date of Birth Certificate" },
  { sno: 9, department: "Revenue", certificate: "Cracker or Storage of Explosive Material License" },
  { sno: 10, department: "Revenue", certificate: "Demarcation HYD" },
  { sno: 11, department: "Revenue", certificate: "EBC Certificate" },
  { sno: 12, department: "Revenue", certificate: "Economically weaker Section" },
  { sno: 13, department: "Revenue", certificate: "Extract of House Site Patta Extract of Dform Patta" },
  { sno: 14, department: "Revenue", certificate: "Extract of NOC Under Explosive Petroleum Act" },
  { sno: 15, department: "Revenue", certificate: "Extract of ORC" },
  { sno: 16, department: "Revenue", certificate: "Family Membership Certificate" },
  { sno: 17, department: "Revenue", certificate: "Fline Petitions Sub Division" },
  { sno: 18, department: "Revenue", certificate: "Gap Certificate" },
  { sno: 19, department: "Revenue", certificate: "Income Certificate" },
  { sno: 20, department: "Revenue", certificate: "Issue of Arm Licence" },
  { sno: 21, department: "Revenue", certificate: "Issue of Caste Certificate to Brahmin Community" },
  { sno: 22, department: "Revenue", certificate: "Issue of NOC for Storing of Petroleum Products" },
  { sno: 23, department: "Revenue", certificate: "Issue of Occupancy Rights Cert for Inam Lands" },
  { sno: 24, department: "Revenue", certificate: "Issue of Small and Marginal Farmer Certificate" },
  { sno: 25, department: "Revenue", certificate: "Issue of Tonch Map" },
  { sno: 26, department: "Revenue", certificate: "Late Registration of Birth Death" },
  { sno: 27, department: "Revenue", certificate: "Local Candidate Certificate for Educational Institutional Purpose" },
  { sno: 28, department: "Revenue", certificate: "Localization of Properties HYD" },
  { sno: 29, department: "Revenue", certificate: "Minority Certificate" },
  { sno: 30, department: "Revenue", certificate: "Money Lending" },
  { sno: 31, department: "Revenue", certificate: "Nativity Certificate" },
  { sno: 32, department: "Revenue", certificate: "NFBS Application" },
  { sno: 33, department: "Revenue", certificate: "No Earning Member Certificate" },
  { sno: 34, department: "Revenue", certificate: "No Objection Certificate" },
  { sno: 35, department: "Revenue", certificate: "No Property Application Service" },
  { sno: 36, department: "Revenue", certificate: "NOC for Construction of Cinema Hall" },
  { sno: 37, department: "Revenue", certificate: "OBC Certificate" },
  { sno: 38, department: "Revenue", certificate: "Orphanage Integrated Certificate Application" },
  { sno: 39, department: "Revenue", certificate: "Pawn Broker" },
  { sno: 40, department: "Revenue", certificate: "Permission for Digging an Agricultural Well / Drinking Water Well" },
  { sno: 41, department: "Revenue", certificate: "Permission to Run the Benefit Show" },
  { sno: 42, department: "Revenue", certificate: "Possession Certificate" },
  { sno: 43, department: "Revenue", certificate: "Refund of Trade Deposit" },
  { sno: 44, department: "Revenue", certificate: "Renewal of Cinema Licence" },
  { sno: 45, department: "Revenue", certificate: "Residence Certificate" },
  { sno: 46, department: "Revenue", certificate: "Village Map Copy" }
];

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
        Available Certificates
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-700 text-white text-md">
            <tr>
              <th className="px-4 py-3">S. No</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Certificate Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {servicesList.map((service) => (
              <tr key={service.sno} className="hover:bg-blue-50 transition">
                <td className="px-4 py-2">{service.sno}</td>
                <td className="px-4 py-2">{service.department}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/services/${service.sno}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {service.certificate}
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

export default Services;
