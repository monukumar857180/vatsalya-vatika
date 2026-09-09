import mongoose, { Schema, Document } from 'mongoose';

export interface IContribution extends Document {
  name: string;
  email: string;
  phone?: string;
  amount: number;
  purpose: 'Education' | 'Food' | 'Healthcare' | 'Books' | 'General Support';
  paymentStatus: 'completed' | 'pending' | 'failed';
  paymentRef?: string;
  createdAt: Date;
}

const ContributionSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      match: [/^(?:(?![^@]*\.{2})[a-zA-Z0-9._%+-]+@(?!gmail\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?![.])(?!.*[.]{2})[a-zA-Z0-9.]{6,30}(?<![.])@gmail\.com)$/i, 'Please provide a valid email address. Random or sub-addressed Gmail addresses are not allowed.']
    },
    phone: { 
      type: String,
      match: [/^(?:\+?\d{1,3}[- ]?)?\d{10}$/, 'Please provide a valid 10-digit mobile number'],
      required: false
    },
    amount: { 
      type: Number, 
      required: [true, 'Amount is required'],
      min: [100, 'Contribution amount must be at least ₹100'],
      max: [10000000, 'Contribution amount cannot exceed ₹1,00,0,000']
    },
    purpose: { 
      type: String, 
      required: [true, 'Purpose is required'],
      enum: ['Education', 'Food', 'Healthcare', 'Books', 'General Support'],
      default: 'General Support'
    },
    paymentStatus: {
      type: String,
      enum: ['completed', 'pending', 'failed'],
      default: 'completed'
    },
    paymentRef: { type: String }
  },
  { timestamps: true }
);

export const Contribution = mongoose.model<IContribution>('Contribution', ContributionSchema);
