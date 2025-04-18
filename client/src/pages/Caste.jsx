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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with actual submission logic
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
        {/* Addressed To */}
        <div>
          <label className="block text-sm font-medium text-gray-700">To The Tahsildar</label>
          <input type="text" placeholder="Mandal" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          <input type="text" placeholder="District" className="mt-2 block w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>

        {/* Applicant Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Applicant Name</label>
          <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Relation (S/o, D/o, W/o, etc)</label>
          <input type="text" name="relation" value={formData.relation} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mother Name</label>
          <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        {/* Address */}
        <h4 className="font-semibold text-gray-800 mt-6">Address</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Door No</label>
            <input type="text" name="doorNo" value={formData.doorNo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Landmark</label>
            <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">District</label>
            <input type="text" name="district" value={formData.district} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mandal</label>
            <input type="text" name="mandal" value={formData.mandal} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Village</label>
            <input type="text" name="village" value={formData.village} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ration Card No</label>
            <input type="text" name="rationCardNo" value={formData.rationCardNo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile No</label>
          <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">AADHAAR No</label>
          <input type="text" name="aadhaarNo" value={formData.aadhaarNo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>

        {/* Caste Certificate */}
        <h4 className="font-semibold text-gray-800 mt-6">Caste Certificate Details</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Issued Before</label>
            <select name="issuedBefore" value={formData.issuedBefore} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Caste Claimed</label>
            <input type="text" name="casteClaimed" value={formData.casteClaimed} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Caste Category</label>
            <input type="text" name="casteCategory" value={formData.casteCategory} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Purpose</label>
            <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Religion</label>
          <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>

        {/* Submit */}
        <div className="text-center mt-6">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
            Submit Application
          </button>
        </div>
      </form>

      {/* Required Documents */}
      <div className="mt-8">
        <h4 className="font-semibold text-gray-800">Required Documents:</h4>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Application Form *</li>
          <li>Proof of Address *</li>
          <li>Proof of Caste *</li>
          <li>Proof of Identity *</li>
          <li>Passport Size Photo</li>
        </ul>
      </div>
    </div>
  );
};

export default Caste;
