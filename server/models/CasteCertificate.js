import mongoose from 'mongoose';

const casteCertificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicantName: { type: String, required: true },
  relation: { type: String, required: true },
  motherName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  doorNo: { type: String, required: true },
  landmark: { type: String },
  district: { type: String, required: true },
  mandal: { type: String, required: true },
  village: { type: String, required: true },
  pincode: { type: String, required: true },
  rationCardNo: { type: String },
  mobileNo: { type: String, required: true },
  aadhaarNo: { type: String, required: true },
  issuedBefore: { type: String, required: true },
  casteClaimed: { type: String, required: true },
  casteCategory: { type: String, required: true },
  purpose: { type: String, required: true },
  religion: { type: String, required: true },
  documents: {
    applicationForm: String,
    proofOfAddress: String,
    proofOfCaste: String,
    proofOfIdentity: String,
    passportPhoto: String
  },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const CasteCertificate = mongoose.model('CasteCertificate', casteCertificateSchema);
export default CasteCertificate;