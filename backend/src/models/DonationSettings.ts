import mongoose, { Schema, Document } from 'mongoose';

export interface IDonationSettings extends Document {
  bankAccountName: string;
  bankAccountNumber: string;
  ifscCode: string;
  bankName: string;
  branch: string;
  upiId: string;
  qrCodeImage: string;
  updatedBy?: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const DonationSettingsSchema: Schema = new Schema(
  {
    bankAccountName: { type: String, default: 'Vatsalya Vatika Trust' },
    bankAccountNumber: { type: String, default: 'XXXX-XXXX-XXXX' },
    ifscCode: { type: String, default: 'XXXX0001234' },
    bankName: { type: String, default: 'Your Bank Name' },
    branch: { type: String, default: 'Your Branch Name' },
    upiId: { type: String, default: 'vatsalyavatika@upi' },
    qrCodeImage: { type: String, default: '/donate-qr.jpg' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const DonationSettings = mongoose.model<IDonationSettings>('DonationSettings', DonationSettingsSchema);
