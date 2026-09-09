import { Router } from 'express';
import { authenticateAdmin } from '../middleware/authMiddleware';
import {
  createReview,
  getPublicReviews,
  getAllReviews,
  toggleReviewApproval,
  deleteReview
} from '../controllers/reviewController';

const router = Router();

// Public
router.get('/', getPublicReviews);
router.post('/', createReview);

// Admin only
router.get('/all', authenticateAdmin, getAllReviews);
router.put('/:id/toggle', authenticateAdmin, toggleReviewApproval);
router.delete('/:id', authenticateAdmin, deleteReview);

export default router;
