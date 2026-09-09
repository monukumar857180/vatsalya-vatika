import { Router } from 'express';
import {
  createContribution,
  getContributions,
  getContributionById
} from '../controllers/contributionController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public contribution submission
router.post('/', createContribution);

// Admin contribution management
router.get('/', authenticateAdmin, getContributions);
router.get('/:id', authenticateAdmin, getContributionById);

export default router;
