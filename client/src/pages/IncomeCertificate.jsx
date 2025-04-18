import React, { useState } from 'react';

const IncomeCertificateForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    parentName: '',
    wardVillage: '',
    mandal: '',
    houseNumber: '',
    rationCardType: '',
    rationCardNumber: '',
    totalAnnualIncome: '',
    purpose: '',
    locality: '',
    district: '',
    pincode: '',
    incomeFromLand: '',
    incomeFromBusiness: '',
    incomeSalary: '',
    incomeDailyWage: '',
    incomeOtherSources: '',
    incomeOtherDetails: '',
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
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
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
