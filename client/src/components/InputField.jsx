import React from "react";

const InputField = ({ type = "text", name, placeholder, value, onChange, icon: Icon, required = true }) => {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-3 text-gray-400" />}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full p-3 ${Icon ? "pl-10" : ""} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-gray-400 shadow-sm`}
      />
    </div>
  );
};

export default InputField;
