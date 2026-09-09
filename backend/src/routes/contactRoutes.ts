import { Router } from 'express';
import {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public contact submission
router.post('/', createContact);

// Admin contact management
router.get('/', authenticateAdmin, getContacts);
router.put('/:id', authenticateAdmin, updateContactStatus);
router.delete('/:id', authenticateAdmin, deleteContact);

export default router;
