import mongoose from "mongoose";

const deathCertificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  hospitalName: String,
  houseAddress: String,
  otherPlace: String,
  copiesRequired: { type: Number, required: true },
  wantCourier: { type: String, required: true },
  courierAddress: String,
  applicantInfo: { type: String, required: true },
  telephone: { type: String, required: true }
});

const DeathCertificate = mongoose.model("DeathCertificate", deathCertificateSchema);
export default DeathCertificate;
