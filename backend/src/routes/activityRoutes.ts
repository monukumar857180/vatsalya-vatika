import { Router } from 'express';
import { authenticateAdmin } from '../middleware/authMiddleware';
import {
  getActivities,
  getUnreadCount,
  markRead,
  markAllRead,
  deleteActivity
} from '../controllers/activityController';

const router = Router();

router.get('/', authenticateAdmin, getActivities);
router.get('/unread-count', authenticateAdmin, getUnreadCount);
router.put('/mark-all-read', authenticateAdmin, markAllRead);
router.put('/:id/read', authenticateAdmin, markRead);
router.delete('/:id', authenticateAdmin, deleteActivity);

export default router;
