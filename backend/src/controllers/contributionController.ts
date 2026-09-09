import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db';
import { Contribution } from '../models/Contribution';
import { fallbackStore, StoreContribution } from '../services/fallbackStore';
import { logActivity } from '../services/notificationService';

export const createContribution = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, amount, purpose, paymentRef } = req.body;

    if (!name || !email || !amount || !purpose) {
      res.status(400).json({ success: false, message: 'Name, email, amount, and purpose are required.' });
      return;
    }

    if (amount <= 0) {
      res.status(400).json({ success: false, message: 'Amount must be greater than zero.' });
      return;
    }

    const refNumber = paymentRef || 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);

    if (isMongoConnected) {
      const contribution = await Contribution.create({
        name,
        email,
        phone,
        amount,
        purpose,
        paymentStatus: 'completed',
        paymentRef: refNumber
      });
      res.status(201).json({
        success: true,
        message: 'Thank you for your generous contribution to Vatsalya Vatika!',
        data: contribution
      });
      logActivity('contribution', '💰 New Donation Received', `${name} donated ₹${amount} for ${purpose}.`, { name, email, amount, purpose, paymentRef: refNumber }).catch(() => {});
    } else {
      const newContribution: StoreContribution = {
        _id: 'con-' + Date.now(),
        name,
        email,
        phone,
        amount,
        purpose,
        paymentStatus: 'completed',
        paymentRef: refNumber,
        createdAt: new Date().toISOString()
      };
      fallbackStore.contributions.unshift(newContribution);
      res.status(201).json({
        success: true,
        message: 'Thank you for your generous contribution to Vatsalya Vatika!',
        data: newContribution
      });
      logActivity('contribution', '💰 New Donation Received', `${name} donated ₹${amount} for ${purpose}.`, { name, email, amount, purpose, paymentRef: refNumber }).catch(() => {});
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Unable to process contribution. Please try again.' });
  }
};

export const getContributions = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      const items = await Contribution.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: items });
    } else {
      res.status(200).json({ success: true, data: fallbackStore.contributions });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getContributionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const item = await Contribution.findById(id);
      if (!item) {
        res.status(404).json({ success: false, message: 'Contribution record not found.' });
        return;
      }
      res.status(200).json({ success: true, data: item });
    } else {
      const item = fallbackStore.contributions.find(c => c._id === id);
      if (!item) {
        res.status(404).json({ success: false, message: 'Contribution record not found.' });
        return;
      }
      res.status(200).json({ success: true, data: item });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
