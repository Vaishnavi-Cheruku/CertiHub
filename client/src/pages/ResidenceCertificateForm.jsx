import React, { useState } from 'react';

const ResidenceCertificateForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    officialName: '',
    officialDesignation: '',
    applicantName: '',
    parentSpouseName: '',
    villageTownWard: '',
    mandal: '',
    district: '',
    fullName: '',
    guardianName: '',
    landlinePhone: '',
    mobilePhone: '',
    email: '',
    photo: null,
    documents: []
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      if (name === 'documents') {
        setFormData({
          ...formData,
          [name]: Array.from(files)
        });
      } else {
        setFormData({
          ...formData,
          [name]: files[0]
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'documents') {
        value.forEach((file) => {
          data.append('documents', file);
        });
      } else {
        data.append(key, value);
      }
    });
  
    try {
      const response = await fetch('http://localhost:4000/api/residence-certificates', {
        method: 'POST',
        body: data
      });
  
      if (response.ok) {
        alert('Application submitted successfully!');
        // Optional: reset form or redirect
      } else {
        alert('Something went wrong while submitting. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Server error. Please try again later.');
    }
  };  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Request for Residence Certificate</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-1 font-medium">User ID:</label>
          <input
            type="text"
            name="userId"
            value={formData.userID}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">To,</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Shri / Smt.</label>
              <input
                type="text"
                name="officialName"
                value={formData.officialName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Designation:</label>
              <input
                type="text"
                name="officialDesignation"
                value={formData.officialDesignation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="mb-4">
            I, <strong>
              <input
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                className="border-b border-gray-400 text-center mx-1 px-1"
                placeholder="(Applicant's Name)"
                required
              />
            </strong>, son/daughter/wife of <strong>
              <input
                type="text"
                name="parentSpouseName"
                value={formData.parentSpouseName}
                onChange={handleChange}
                className="border-b border-gray-400 text-center mx-1 px-1"
                placeholder="(Parent/Spouse Name)"
                required
              />
            </strong>, am residing in <strong>
              <input
                type="text"
                name="villageTownWard"
                value={formData.villageTownWard}
                onChange={handleChange}
                className="border-b border-gray-400 text-center mx-1 px-1"
                placeholder="(Village/Town/Ward Name)"
                required
              />
            </strong> of <strong>
              <input
                type="text"
                name="mandal"
                value={formData.mandal}
                onChange={handleChange}
                className="border-b border-gray-400 text-center mx-1 px-1"
                placeholder="(Mandal Name)"
                required
              />
            </strong> in <strong>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="border-b border-gray-400 text-center mx-1 px-1"
                placeholder="(District Name)"
                required
              />
            </strong>. I have been living in this area permanently for a long time.
          </p>
          
          <p className="mb-4">
            I request the issuance of a <strong>Residence Certificate</strong> as proof of my permanent residence in this location.
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Applicant's Details:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Father's / Husband's / Guardian's Name:</label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block mb-1 font-medium">Applicant's Signature (in the presence of an official):</label>
            <div className="border-b border-gray-400 h-10"></div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Documents Required for Application:</h2>
          
          <ul className="list-decimal pl-5 space-y-2">
            <li><strong>Application Form</strong> <em>(Mandatory)</em></li>
            <li><strong>Ration Card / Aadhaar Card / Voter ID*</strong></li>
            <li><strong>Proof of Residence (Rental Agreement / Electricity Bill / Property Documents / Any Valid Address Proof)*</strong></li>
            <li><strong>Passport Size Photograph</strong></li>
          </ul>
          
          <div className="mt-4">
            <label className="block mb-2 font-medium">Upload Passport Size Photo:</label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              accept="image/*"
              required
            />
            {formData.photo && (
              <div className="mt-2 border border-dashed border-gray-300 p-2 w-32">
                <img 
                  src={URL.createObjectURL(formData.photo)} 
                  alt="Applicant" 
                  className="h-32 w-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">Upload Supporting Documents:</label>
            <input
              type="file"
              name="documents"
              multiple
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            {formData.documents.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                {formData.documents.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Details:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Landline Phone No.:</label>
              <input
                type="text"
                name="landlinePhone"
                value={formData.landlinePhone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Mobile Phone No.:*</label>
              <input
                type="text"
                name="mobilePhone"
                value={formData.mobilePhone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Email ID:*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mb-4 text-sm text-gray-600">
          <p>(* = Mandatory for verification, # = Additional documents may be required based on application type.)</p>
        </div>
        
        <div className="text-center">
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResidenceCertificateForm;
