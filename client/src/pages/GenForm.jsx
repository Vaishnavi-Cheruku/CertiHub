// App.jsx
import { useState } from 'react';
import { servicesList } from './services';

function GeneralForm() {
  const [formData, setFormData] = useState({
    service: '',
    applicantName: '',
    fatherName: '',
    gender: '',
    dob: '',
    address: '',
    district: '',
    mandal: '',
    village: '',
    pincode: '',
    mobileNumber: '',
    email: '',
    idProofType: '',
    idProofNumber: '',
    supportingDocuments: [],
    purpose: '',
    declaration: false,
  });

  // Filter out community, birth-death, income, residence, and OBC certificates
  const excludedServices = [
    "Community and Date of Birth Certificate",
    "Income Certificate",
    "Residence Certificate",
    "OBC Certificate",
    "Late Registration of Birth Death"
  ];
  
  const filteredServices = servicesList.filter(
    service => !excludedServices.includes(service.name)
  );

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: Array.from(files),
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Application submitted successfully!');
    // Here you would typically send the data to your backend service
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Certificate Application Form</h1>
          <p className="text-gray-600">General application for government certificates and services</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selection */}
          <div className="form-section">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Service Details</h2>
            <div className="mb-4">
              <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
                Select Service *
              </label>
              <select
                id="service"
                name="service"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a service --</option>
                {filteredServices.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="purpose" className="block text-gray-700 font-medium mb-2">
                Purpose of Certificate *
              </label>
              <textarea
                id="purpose"
                name="purpose"
                rows="3"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Please specify the purpose for which you need this certificate"
                required
              ></textarea>
            </div>
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="applicantName" className="block text-gray-700 font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="applicantName"
                  name="applicantName"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.applicantName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="fatherName" className="block text-gray-700 font-medium mb-2">
                  Father's/Spouse's Name *
                </label>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select gender --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Contact Information</h2>
            <div>
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Complete Address *
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="district" className="block text-gray-700 font-medium mb-2">
                  District *
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="mandal" className="block text-gray-700 font-medium mb-2">
                  Mandal/Tehsil *
                </label>
                <input
                  type="text"
                  id="mandal"
                  name="mandal"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.mandal}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="village" className="block text-gray-700 font-medium mb-2">
                  Village/Ward *
                </label>
                <input
                  type="text"
                  id="village"
                  name="village"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.village}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="pincode" className="block text-gray-700 font-medium mb-2">
                  PIN Code *
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  pattern="[0-9]{6}"
                  maxLength="6"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="mobileNumber" className="block text-gray-700 font-medium mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* ID Proof */}
          <div className="form-section">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Identification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="idProofType" className="block text-gray-700 font-medium mb-2">
                  ID Proof Type *
                </label>
                <select
                  id="idProofType"
                  name="idProofType"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.idProofType}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select ID type --</option>
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pan">PAN Card</option>
                  <option value="voter">Voter ID Card</option>
                  <option value="driving">Driving License</option>
                  <option value="passport">Passport</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="idProofNumber" className="block text-gray-700 font-medium mb-2">
                  ID Number *
                </label>
                <input
                  type="text"
                  id="idProofNumber"
                  name="idProofNumber"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.idProofNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="form-section">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Supporting Documents</h2>
            <div>
              <label htmlFor="supportingDocuments" className="block text-gray-700 font-medium mb-2">
                Upload Supporting Documents *
              </label>
              <input
                type="file"
                id="supportingDocuments"
                name="supportingDocuments"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                multiple
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload relevant documents based on the service you are applying for (PDF, JPG, PNG formats only, max 5MB each)
              </p>
            </div>
          </div>

          {/* Declaration */}
          <div className="form-section">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Declaration</h2>
            <div className="flex items-start mb-4">
              <input
                type="checkbox"
                id="declaration"
                name="declaration"
                className="mt-1 mr-2"
                checked={formData.declaration}
                onChange={handleChange}
                required
              />
              <label htmlFor="declaration" className="text-gray-700">
                I hereby declare that all the information provided by me is true to the best of my knowledge. I understand that any false information may result in rejection of my application and/or legal action.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={!formData.declaration}
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GeneralForm;