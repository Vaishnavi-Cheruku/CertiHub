import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String, required: true },
  governmentId: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{12}$/.test(v); // Ensures exactly 12 digits
      },
      message: props => `${props.value} is not a valid Aadhar number!`
    }
  },

  isAccountVerified: { type: Boolean, default: false },
  verifyOtp: { type: String, default: '' },
  verifyOtpExpireAt: { type: Number, default: 0 },
  resetOtp: { type: String, default: '' },
  resetOtpExpireAt: { type: Number, default: 0 },
  applicationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }], // Tracks applications
}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export default UserModel;
