import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext';

const IncomeCertificateForm = () => {
  const { backendUrl } = useContext(AppContent);
  
  const [formData, setFormData] = useState({
    userId:'',
    fullName: '',
    parentName: '',
    wardVillage: '',
    mandal: '',
    houseNumber: '',
    rationCardType: '',
    rationCardNumber: '',
    totalAnnualIncome: '',
    pincode: '',
    incomeFromLand: '',
    incomeFromBusiness: '',
    incomeSalary: '',
    incomeDailyWage: '',
    incomeOtherSources: '',
    incomeOtherDetails: '',
    purpose: '',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const submissionData = new FormData();
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }
  
    try {
      // Show loading toast
      const loadingToastId = toast.loading("Submitting your application...");
      
      // Use backendUrl from context if available, otherwise fallback to hardcoded URL
      const apiUrl = backendUrl ? `${backendUrl}/api/income-certificates` : 'http://localhost:4000/api/income-certificates';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: submissionData,
        credentials: 'include' // Include cookies in the request
      });
  
      const data = await response.json();
      
      // Update the loading toast with success or error message
      if (response.ok) {
        toast.update(loadingToastId, {
          render: data.message || 'Income Certificate Application Submitted Successfully!',
          type: "success",
          isLoading: false,
          autoClose: 5000
        });
        
        // Reset form
        setFormData({
          userId:'',
          fullName: '',
          parentName: '',
          wardVillage: '',
          mandal: '',
          houseNumber: '',
          rationCardType: '',
          rationCardNumber: '',
          totalAnnualIncome: '',
          pincode: '',
          incomeFromLand: '',
          incomeFromBusiness: '',
          incomeSalary: '',
          incomeDailyWage: '',
          incomeOtherSources: '',
          incomeOtherDetails: '',
          purpose: '',
          photo: null
        });
      } else {
        toast.update(loadingToastId, {
          render: data.message || 'Error submitting your application.',
          type: "error",
          isLoading: false,
          autoClose: 5000
        });
      }
    } catch (err) {
      toast.error('Network error while submitting form. Please try again.');
      console.error(err);
    }
  };
  

  // Calculate total from income sources
  const calculateTotal = () => {
    const sources = [
      parseFloat(formData.incomeFromLand) || 0,
      parseFloat(formData.incomeFromBusiness) || 0,
      parseFloat(formData.incomeSalary) || 0,
      parseFloat(formData.incomeDailyWage) || 0,
      parseFloat(formData.incomeOtherSources) || 0
    ];
    
    return sources.reduce((sum, current) => sum + current, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Income Certificate Application Form</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Applicant Details Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Applicant Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">User ID</label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
      
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Father's/Mother's Name</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Ward/Village</label>
              <input
                type="text"
                name="wardVillage"
                value={formData.wardVillage}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Mandal (Subdivision)</label>
              <input
                type="text"
                name="mandal"
                value={formData.mandal}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">House Number</label>
              <input
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Ration Card Type</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="rationCardType"
                    value="White"
                    checked={formData.rationCardType === 'White'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  White
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="rationCardType"
                    value="Pink"
                    checked={formData.rationCardType === 'Pink'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Pink
                </label>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Ration Card Number</label>
              <input
                type="text"
                name="rationCardNumber"
                value={formData.rationCardNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Total Annual Income (INR)</label>
              <div className="flex items-center">
                <span className="mr-1">₹</span>
                <input
                  type="number"
                  name="totalAnnualIncome"
                  value={formData.totalAnnualIncome}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Purpose of Income Certificate</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Income Sources Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Income Sources</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Income from Land & Properties</label>
              <div className="flex items-center">
                <span className="mr-1">₹</span>
                <input
                  type="number"
                  name="incomeFromLand"
                  value={formData.incomeFromLand}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Income from Business</label>
              <div className="flex items-center">
                <span className="mr-1">₹</span>
                <input
                  type="number"
                  name="incomeFromBusiness"
                  value={formData.incomeFromBusiness}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Salary (Combined for Husband & Wife)</label>
              <div className="flex items-center">
                <span className="mr-1">₹</span>
                <input
                  type="number"
                  name="incomeSalary"
                  value={formData.incomeSalary}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Daily Wage Earnings</label>
              <div className="flex items-center">
                <span className="mr-1">₹</span>
                <input
                  type="number"
                  name="incomeDailyWage"
                  value={formData.incomeDailyWage}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Other Sources of Income</label>
              <div className="flex items-center">
                <span className="mr-1">₹</span>
                <input
                  type="number"
                  name="incomeOtherSources"
                  value={formData.incomeOtherSources}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-600">Specify details</label>
                <input
                  type="text"
                  name="incomeOtherDetails"
                  value={formData.incomeOtherDetails}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-300">
              <label className="block mb-2 text-sm font-medium text-gray-600">Total Annual Income</label>
              <div className="flex items-center">
                <span className="mr-1">₹</span>
                <input
                  type="text"
                  value={calculateTotal()}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Declaration Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Declaration</h2>
          
          <p className="mb-6 text-sm text-gray-700">
            I hereby declare that the above-mentioned details are <strong>true and correct</strong> to the best of my knowledge. 
            If any information is found to be false, I understand that I am liable for legal action under the <strong>Indian Penal Code.</strong>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Applicant's Photo (Affix Passport Size Photo Here)</label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
                required
              />
              <div className="mt-2 border border-dashed border-gray-300 p-4 text-center">
                {formData.photo ? (
                  <img 
                    src={URL.createObjectURL(formData.photo)} 
                    alt="Applicant" 
                    className="w-32 h-32 mx-auto rounded-full"
                  />
                ) : (
                  <span className="text-gray-400">No photo selected</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <button 
                type="submit"
                className="w-full px-6 py-3 mt-6 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IncomeCertificateForm;