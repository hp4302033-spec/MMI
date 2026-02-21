import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
    schemeName: { type: String, required: true, trim: true },
    amcName: { type: String, required: true, trim: true },
    investmentType: { type: String, enum: ['sip', 'lump_sum'], required: true },
    sipAmount: { type: Number, default: 0 },
    totalInvestedAmount: { type: Number, required: true },
    investmentDate: { type: Date, required: true },
    folioNumber: { type: String, required: true, trim: true, index: true },
    currentValue: { type: Number, required: true },
    returnsPercentage: { type: Number, default: 0 },
    nextSipDueDate: Date,
    paymentStatus: { type: String, enum: ['paid', 'pending'], default: 'pending' },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

investmentSchema.pre('save', function calcReturns(next) {
  if (this.totalInvestedAmount > 0) {
    this.returnsPercentage = Number((((this.currentValue - this.totalInvestedAmount) / this.totalInvestedAmount) * 100).toFixed(2));
  }
  next();
});

export const Investment = mongoose.model('Investment', investmentSchema);
