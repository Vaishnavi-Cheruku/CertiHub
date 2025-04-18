import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: [
      "CSC Operator",
      "Patwari",
      "SDM Office Staff",
      "SDM",
      "Deputy Commissioner",
      "Divisional Commissioner",
      "Admin",
    ],
    required: true,
  },
  isActive: { type: Boolean, default: true }, // Can be deactivated by Admin
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" }, // Who created this staff account (Admin)
  isVerified: { type: Boolean, default: false },
  verifyOtp: { type: String, default: '' },
  verifyOtpExpireAt: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
});


const staffModel = mongoose.models.Staff || mongoose.model('Staff', staffSchema);
export default staffModel;
