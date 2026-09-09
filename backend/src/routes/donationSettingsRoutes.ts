import { Router } from 'express';
import { getDonationSettings, updateDonationSettings } from '../controllers/donationSettingsController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public route to get donation settings (bank details, UPI, QR code)
router.get('/', getDonationSettings);

// Protected route to update donation settings
router.put('/', authenticateAdmin, updateDonationSettings);

export default router;
