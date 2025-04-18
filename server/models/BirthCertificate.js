import mongoose from "mongoose";

const birthCertificateSchema = new mongoose.Schema({
  childName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  placeOfBirth: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  address: { type: String, required: true },
  reason: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true }
});

const BirthCertificate = mongoose.model("BirthCertificate", birthCertificateSchema);
export default BirthCertificate;
