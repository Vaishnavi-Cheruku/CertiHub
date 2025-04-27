// models/IncomeCertificate.js - Update this file
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
  pincode: { type: String }, // Make sure this field is included

  incomeFromLand: { type: Number, default: 0 },
  incomeFromBusiness: { type: Number, default: 0 },
  incomeSalary: { type: Number, default: 0 },
  incomeDailyWage: { type: Number, default: 0 },
  incomeOtherSources: { type: Number, default: 0 },
  incomeOtherDetails: { type: String },

  photo: { type: String }, // stores file path
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // New fields for application tracking
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Staff'
  },
  reviewedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Staff'
  },
  reviewComments: { type: String },
  reviewDate: { type: Date },
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('IncomeCertificate', incomeCertificateSchema);