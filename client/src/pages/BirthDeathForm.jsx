import React, { useState } from "react";

const BirthDeathForm = () => {
  const [formType, setFormType] = useState("birth");

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-2 mx-2 rounded-full font-semibold transition-all duration-200 ${
            formType === "birth" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setFormType("birth")}
        >
          Birth Certificate
        </button>
        <button
          className={`px-6 py-2 mx-2 rounded-full font-semibold transition-all duration-200 ${
            formType === "death" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setFormType("death")}
        >
          Death Certificate
        </button>
      </div>
      <div className="transition-all duration-300">{formType === "birth" ? <BirthForm /> : <DeathForm />}</div>
    </div>
  );
};

const InputGroup = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-1">{label}:</label>
    {children}
  </div>
);

const BirthForm = () => {
  const [formData, setFormData] = useState({
    childName: "",
    gender: "",
    dob: "",
    placeOfBirth: "",
    fatherName: "",
    motherName: "",
    address: "",
    reason: "",
    contact: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Birth Form Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Late Registration of Birth Application
      </h2>

      {[
        { label: "Name of Child", name: "childName" },
        { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
        { label: "Date of Birth", name: "dob", type: "date" },
        { label: "Place of Birth", name: "placeOfBirth" },
        { label: "Father's Name", name: "fatherName" },
        { label: "Mother's Name", name: "motherName" },
        { label: "Address", name: "address" },
        { label: "Reason for Late Registration", name: "reason" },
        { label: "Contact Number", name: "contact" },
        { label: "Email ID", name: "email", type: "email" }
      ].map((field, idx) => (
        <InputGroup key={idx} label={field.label}>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select</option>
              {field.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          )}
        </InputGroup>
      ))}

      <div className="text-right pt-4">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit Birth Form
        </button>
      </div>
    </form>
  );
};

const DeathForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    fatherName: "",
    motherName: "",
    hospitalName: "",
    houseAddress: "",
    otherPlace: "",
    copiesRequired: 1,
    wantCourier: "No",
    courierAddress: "",
    applicantInfo: "",
    telephone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Death Form Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Death Certificate Application
      </h2>

      <InputGroup label="1. Name of Deceased">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </InputGroup>

      <InputGroup label="2. Gender">
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </InputGroup>

      <InputGroup label="3. Name of the Father">
        <input
          type="text"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </InputGroup>

      <InputGroup label="4. Name of the Mother">
        <input
          type="text"
          name="motherName"
          value={formData.motherName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </InputGroup>

      <InputGroup label="5. Place of Death">
        <p className="text-sm text-gray-500 mb-2">(Specify the location where death occurred)</p>
        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital/Institution Name"
          value={formData.hospitalName}
          onChange={handleChange}
          className="w-full p-3 mb-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="houseAddress"
          placeholder="House Address"
          value={formData.houseAddress}
          onChange={handleChange}
          className="w-full p-3 mb-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="otherPlace"
          placeholder="Other Place"
          value={formData.otherPlace}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </InputGroup>

      <InputGroup label="6. No. of Copies Required">
        <input
          type="number"
          name="copiesRequired"
          value={formData.copiesRequired}
          onChange={handleChange}
          min="1"
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </InputGroup>

      <InputGroup label="7. Do you want the Death Certificate by Courier?">
        <select
          name="wantCourier"
          value={formData.wantCourier}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </InputGroup>

      {formData.wantCourier === "Yes" && (
        <InputGroup label="Courier Address">
          <textarea
            name="courierAddress"
            value={formData.courierAddress}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="3"
            required
          />
        </InputGroup>
      )}

      <InputGroup label="Applicant Name & Contact">
        <textarea
          name="applicantInfo"
          value={formData.applicantInfo}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          rows="3"
          required
        />
      </InputGroup>

      <InputGroup label="Telephone No">
        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </InputGroup>

      <div className="text-sm text-gray-600 mt-4">
        <p className="font-semibold">Documents Required:</p>
        <ul className="list-disc ml-5">
          <li>Application Form* (Not mandatory for citizen login)</li>
        </ul>
        <p className="mt-2">Note: Death certificate will be issued subject to entry found in official records.</p>
      </div>

      <div className="text-right pt-4">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
};

export default BirthDeathForm;
