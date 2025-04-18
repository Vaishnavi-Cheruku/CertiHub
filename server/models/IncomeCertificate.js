import mongoose from 'mongoose';

const incomeCertificateSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  parentName: { type: String, required: true },
  wardVillage: { type: String, required: true },
  mandal: { type: String, required: true },
  houseNumber: { type: String, required: true },
  rationCardType: { type: String, required: true },
  rationCardNumber: { type: String, required: true },
  totalAnnualIncome: { type: Number, required: true },
  purpose: { type: String, required: true },

  incomeFromLand: { type: Number, default: 0 },
  incomeFromBusiness: { type: Number, default: 0 },
  incomeSalary: { type: Number, default: 0 },
  incomeDailyWage: { type: Number, default: 0 },
  incomeOtherSources: { type: Number, default: 0 },
  incomeOtherDetails: { type: String },

  photo: { type: String }, // stores file path
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 👈 This line is for tracking

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('IncomeCertificate', incomeCertificateSchema);
