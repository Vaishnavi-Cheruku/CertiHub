import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifiedApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewApplication, setViewApplication] = useState(null);
  
  // Get staff ID from localStorage or wherever you store it after login
  const staffId = '67dbcf81993e7c68bfa7fa4e'; // Vaishnavi's ID

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/api/income-certificates/staff/${staffId}/approved`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('staffToken')}` }
      });
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch verified applications');
      setLoading(false);
    }
  };

  const handleViewApplication = async (applicationId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/income-certificates/${applicationId}`);
      setViewApplication(response.data);
    } catch (error) {
      console.error('Error fetching application details:', error);
      toast.error('Failed to fetch application details');
    }
  };

  const closeViewModal = () => {
    setViewApplication(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Approved Applications</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-gray-100 p-6 text-center rounded-lg">
          <p className="text-gray-600">No approved applications found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Application ID</th>
                <th className="py-3 px-4 text-left">User ID</th>
                <th className="py-3 px-4 text-left">Applicant Name</th>
                <th className="py-3 px-4 text-left">Submission Date</th>
                <th className="py-3 px-4 text-left">Approval Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{application._id.substring(0, 8)}...</td>
                  <td className="py-3 px-4">{application.userId?._id.substring(0, 8)}...</td>
                  <td className="py-3 px-4">{application.fullName}</td>
                  <td className="py-3 px-4">{new Date(application.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{new Date(application.reviewDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => handleViewApplication(application._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Application Details Modal */}
      {viewApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Application Details</h2>
                <button onClick={closeViewModal} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mb-4 p-3 bg-green-100 rounded-lg">
                <p className="text-green-800 font-semibold">
                  Status: Approved on {new Date(viewApplication.reviewDate).toLocaleDateString()}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-bold mb-2">Personal Information</h3>
                  <p><span className="font-semibold">Name:</span> {viewApplication.fullName}</p>
                  <p><span className="font-semibold">Parent's Name:</span> {viewApplication.parentName}</p>
                  <p><span className="font-semibold">Address:</span> {viewApplication.houseNumber}, {viewApplication.wardVillage}, {viewApplication.mandal}</p>
                  <p><span className="font-semibold">Pincode:</span> {viewApplication.pincode}</p>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Income Details</h3>
                  <p><span className="font-semibold">Ration Card Type:</span> {viewApplication.rationCardType}</p>
                  <p><span className="font-semibold">Ration Card Number:</span> {viewApplication.rationCardNumber}</p>
                  <p><span className="font-semibold">Total Annual Income:</span> ₹{viewApplication.totalAnnualIncome}</p>
                  <p><span className="font-semibold">Purpose:</span> {viewApplication.purpose}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold mb-2">Income Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p><span className="font-semibold">Income from Land:</span> ₹{viewApplication.incomeFromLand}</p>
                  <p><span className="font-semibold">Income from Business:</span> ₹{viewApplication.incomeFromBusiness}</p>
                  <p><span className="font-semibold">Salary Income:</span> ₹{viewApplication.incomeSalary}</p>
                  <p><span className="font-semibold">Daily Wage Income:</span> ₹{viewApplication.incomeDailyWage}</p>
                  <p><span className="font-semibold">Other Sources Income:</span> ₹{viewApplication.incomeOtherSources}</p>
                </div>
                {viewApplication.incomeOtherDetails && (
                  <p className="mt-2"><span className="font-semibold">Other Income Details:</span> {viewApplication.incomeOtherDetails}</p>
                )}
              </div>
              
              {viewApplication.photo && (
                <div className="mb-6">
                  <h3 className="font-bold mb-2">Uploaded Photo</h3>
                  <img 
                    src={`http://localhost:4000/uploads/${viewApplication.photo}`} 
                    alt="Applicant Photo" 
                    className="max-h-40 border"
                  />
                </div>
              )}
              
              {viewApplication.reviewComments && (
                <div className="mb-6">
                  <h3 className="font-bold mb-2">Review Comments</h3>
                  <p className="p-3 bg-gray-100 rounded">{viewApplication.reviewComments}</p>
                </div>
              )}
              
              <div className="flex justify-end">
                <button 
                  onClick={closeViewModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifiedApplications;