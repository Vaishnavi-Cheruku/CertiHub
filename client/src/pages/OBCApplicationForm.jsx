
import React from "react";

const ObcCertificateForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg p-12 w-full max-w-4xl border border-gray-300 rounded-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">ANNEXURE - B</h1>
        <h2 className="text-xl font-semibold text-center mb-8 text-gray-600 leading-relaxed">
          APPLICATION FORM FOR CERTIFICATE OF ELIGIBILITY FOR RESERVATION OF JOBS
          FOR THE OTHER BACKWARD CLASSES IN CIVIL POSTS AND SERVICES UNDER CENTRAL GOVT. OF INDIA
        </h2>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">I. Necessary Particulars:</h3>

            <label className="block text-sm font-medium text-gray-600 mb-2">Full Name of the Applicant (In BLOCK LETTERS):</label>
            <input type="text" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Gender:</label>
                <input type="text" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Date of Birth:</label>
                <input type="date" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-700 mt-6">Complete Residential Address:</h3>

            <h4 className="font-semibold text-md text-gray-700 mt-4">a) Permanent Address:</h4>
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="D.No" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Locality" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Village" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Mandal" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="District" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Pincode" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <h4 className="font-semibold text-md text-gray-700 mt-6">b) Present (Postal) Address:</h4>
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="D.No" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Locality" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Village" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Mandal" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="District" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Pincode" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Religion:</label>
            <input type="text" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <label className="block text-sm font-medium text-gray-600 mt-4 mb-2">Caste:</label>
            <input type="text" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <label className="block text-sm font-medium text-gray-600 mt-4 mb-2">Sub-Caste:</label>
            <input type="text" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex items-center gap-2 mt-6">
            <input type="checkbox" className="border p-2" />
            <label className="text-sm text-gray-700">Issued Caste Certificate in the Past</label>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" className="border p-2" />
            <label className="text-sm text-gray-700">Does Education Certificate Contain Caste?</label>
          </div>

          <label className="block text-sm font-medium text-gray-600 mt-4 mb-2">Occupation Group:</label>
          <input type="text" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <label className="block text-sm font-medium text-gray-600 mt-4 mb-2">
            Serial Number of the Caste in the CENTRAL LIST OF OBCs:
          </label>
          <input type="text" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Declaration:</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              I certify that the above-mentioned particulars are true to the best of my knowledge and belief 
              and that I do not belong to the CREAMY LAYER of OBCs, making me eligible for consideration under OBC reservation for government posts.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-4">
              In the event of any false or incorrect information being found or ineligibility being detected before or after
              selection, I understand that my candidature or appointment may be canceled and that I will be subject to further
              legal action as per applicable rules.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <input type="text" placeholder="Place" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="date" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <label className="block text-sm font-medium text-gray-600 mt-4 mb-2">Signature of the Candidate:</label>
          <input type="text" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Procedure (Documents to be Enclosed):</h3>
            <ul className="list-disc pl-6 text-sm text-gray-600">
              <li>Application Form (Compulsory)</li>
              <li>Ration Card / Aadhaar Card / EPIC Card (Any One)</li>
              <li>Father / Mother’s Property Details (Any One)</li>
              <li>Father / Mother’s Employment Details / Income Tax Returns (for professionals) (Compulsory)</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Contact Details:</h3>
            <label className="block text-sm font-medium text-gray-600 mb-2">Landline Number:</label>
            <input type="text" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <label className="block text-sm font-medium text-gray-600 mt-4 mb-2">Mobile Number:</label>
            <input type="text" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <label className="block text-sm font-medium text-gray-600 mt-4 mb-2">Email ID:</label>
            <input type="email" className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ObcCertificateForm;
