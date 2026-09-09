import { Router } from 'express';
import { getSiteSettings, updateSiteSettings } from '../controllers/siteSettingsController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public route to get settings
router.get('/', getSiteSettings);

// Protected route to update settings
router.put('/', authenticateAdmin, updateSiteSettings);

export default router;
