import { Response } from 'express';
import { DonationSettings } from '../models/DonationSettings';
import { Activity } from '../models/Activity';
import { AuthRequest } from '../middleware/authMiddleware';
import { isMongoConnected } from '../config/db';

// In-memory fallback for donation settings when MongoDB is not connected
const fallbackDonationSettings = {
  bankAccountName: 'Vatsalya Vatika Trust',
  bankAccountNumber: 'XXXX-XXXX-XXXX',
  ifscCode: 'XXXX0001234',
  bankName: 'Your Bank Name',
  branch: 'Your Branch Name',
  upiId: 'vatsalyavatika@upi',
  qrCodeImage: '/donate-qr.jpg',
};

export const getDonationSettings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!isMongoConnected) {
      res.status(200).json({ success: true, data: fallbackDonationSettings });
      return;
    }
    let settings = await DonationSettings.findOne();
    if (!settings) {
      settings = await DonationSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve donation settings.' });
  }
};

export const updateDonationSettings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { bankAccountName, bankAccountNumber, ifscCode, bankName, branch, upiId, qrCodeImage } = req.body;

    if (!bankAccountName || !bankAccountNumber || !ifscCode || !bankName || !branch || !upiId || !qrCodeImage) {
      res.status(400).json({ success: false, message: 'All fields are required.' });
      return;
    }

    if (!isMongoConnected) {
      // Update fallback in-memory store
      Object.assign(fallbackDonationSettings, { bankAccountName, bankAccountNumber, ifscCode, bankName, branch, upiId, qrCodeImage });
      res.status(200).json({ success: true, data: fallbackDonationSettings, message: 'Donation settings updated successfully.' });
      return;
    }

    let settings = await DonationSettings.findOne();

    if (settings) {
      settings.bankAccountName = bankAccountName;
      settings.bankAccountNumber = bankAccountNumber;
      settings.ifscCode = ifscCode;
      settings.bankName = bankName;
      settings.branch = branch;
      settings.upiId = upiId;
      settings.qrCodeImage = qrCodeImage;
      settings.updatedBy = req.user?.id as any;
      await settings.save();
    } else {
      settings = await DonationSettings.create({
        bankAccountName, bankAccountNumber, ifscCode, bankName, branch, upiId, qrCodeImage,
        updatedBy: req.user?.id
      });
    }

    // Log the audit activity
    await Activity.create({
      type: 'other',
      title: 'Donation Settings Updated',
      description: 'An administrator updated the bank details, UPI ID, or QR Code.',
      metadata: { adminId: req.user?.id }
    });

    res.status(200).json({ success: true, data: settings, message: 'Donation settings updated successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update donation settings.' });
  }
};
