import mongoose from 'mongoose';

const residenceCertificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  officialName: { type: String, required: true },
  officialDesignation: { type: String, required: true },
  applicantName: { type: String, required: true },
  parentSpouseName: { type: String, required: true },
  villageTownWard: { type: String, required: true },
  mandal: { type: String, required: true },
  district: { type: String, required: true },
  fullName: { type: String, required: true },
  guardianName: { type: String, required: true },
  landlinePhone: { type: String },
  mobilePhone: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: true },
  documents: [{ type: String }],
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const ResidenceCertificate = mongoose.model('ResidenceCertificate', residenceCertificateSchema);
export default ResidenceCertificate;