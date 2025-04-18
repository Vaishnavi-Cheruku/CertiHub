import React, { useState } from 'react';

const Caste = () => {
  const [formData, setFormData] = useState({
    applicantName: '',
    relation: '',
    motherName: '',
    gender: '',
    dob: '',
    doorNo: '',
    landmark: '',
    district: '',
    mandal: '',
    village: '',
    pincode: '',
    rationCardNo: '',
    mobileNo: '',
    aadhaarNo: '',
    issuedBefore: '',
    casteClaimed: '',
    casteCategory: '',
    purpose: '',
    religion: '',
  });

  const [documents, setDocuments] = useState({
    applicationForm: null,
    proofOfAddress: null,
    proofOfCaste: null,
    proofOfIdentity: null,
    passportPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    Object.entries(documents).forEach(([key, file]) => {
      if (file) {
        submissionData.append(key, file);
      }
    });

    console.log('Form data and documents ready to be submitted');
    // Use fetch or axios to POST submissionData to a backend endpoint
    alert('Form submitted successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Government of Telangana <br /> Revenue Department
      </h2>
      <h3 className="text-xl font-semibold text-center mt-2 mb-6 text-gray-700">
        Community and Birth Application (Caste) Form – 6
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mandal and District */}
        <div>
          <label className="block text-sm font-medium text-gray-700">To The Tahsildar</label>
          <input type="text" placeholder="Mandal" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          <input type="text" placeholder="District" className="mt-2 block w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>

        {/* Personal Info */}
        {[
          { label: 'Applicant Name', name: 'applicantName' },
          { label: 'Relation (S/o, D/o, W/o, etc)', name: 'relation' },
          { label: 'Mother Name', name: 'motherName' }
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Address */}
        <h4 className="font-semibold text-gray-800 mt-6">Address</h4>

        <div className="grid grid-cols-2 gap-4">
          {['doorNo', 'landmark'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">{field === 'doorNo' ? 'Door No' : 'Landmark'}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {['district', 'mandal', 'village'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {['pincode', 'rationCardNo'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">{field === 'pincode' ? 'Pincode' : 'Ration Card No'}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}
        </div>

        {['mobileNo', 'aadhaarNo'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">{field === 'mobileNo' ? 'Mobile No' : 'AADHAAR No'}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}

        {/* Caste Certificate Info */}
        <h4 className="font-semibold text-gray-800 mt-6">Caste Certificate Details</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Issued Before</label>
            <select
              name="issuedBefore"
              value={formData.issuedBefore}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {['casteClaimed', 'casteCategory', 'purpose', 'religion'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}
        </div>

        {/* File Uploads */}
        <h4 className="font-semibold text-gray-800 mt-6">Upload Required Documents</h4>

        <div className="space-y-4">
          {[
            { label: 'Application Form *', name: 'applicationForm' },
            { label: 'Proof of Address *', name: 'proofOfAddress' },
            { label: 'Proof of Caste *', name: 'proofOfCaste' },
            { label: 'Proof of Identity *', name: 'proofOfIdentity' },
            { label: 'Passport Size Photo', name: 'passportPhoto' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type="file"
                name={name}
                onChange={handleFileChange}
                className="mt-1 block w-full text-gray-700"
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default Caste;
