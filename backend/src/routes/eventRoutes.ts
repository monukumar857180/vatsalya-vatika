import { Router } from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authenticateAdmin, createEvent);
router.put('/:id', authenticateAdmin, updateEvent);
router.delete('/:id', authenticateAdmin, deleteEvent);

export default router;
