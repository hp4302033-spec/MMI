import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, index: true },
    dob: { type: Date, required: true },
    panNumber: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    aadhaarNumber: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobile: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    bankDetails: {
      accountHolderName: String,
      accountNumber: String,
      bankName: String,
      ifscCode: String
    },
    nomineeDetails: {
      name: String,
      relation: String,
      contact: String
    },
    riskProfile: { type: String, enum: ['conservative', 'moderate', 'aggressive'], required: true, index: true },
    assignedRelationshipManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    kycDocument: {
      originalName: String,
      fileName: String,
      mimeType: String,
      size: Number,
      path: String
    },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

clientSchema.index({ fullName: 'text', panNumber: 'text' });

export const Client = mongoose.model('Client', clientSchema);
