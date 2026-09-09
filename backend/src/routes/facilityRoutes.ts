import { Router } from 'express';
import {
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility
} from '../controllers/facilityController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getFacilities);
router.post('/', authenticateAdmin, createFacility);
router.put('/:id', authenticateAdmin, updateFacility);
router.delete('/:id', authenticateAdmin, deleteFacility);

export default router;
