import { Router } from 'express';
import {
  getMemoryVaultCards,
  getMemoryVaultCardById,
  createMemoryVaultCard,
  updateMemoryVaultCard,
  deleteMemoryVaultCard,
} from '../controllers/memoryVaultController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getMemoryVaultCards);
router.get('/:id', getMemoryVaultCardById);
router.post('/', authenticateAdmin, createMemoryVaultCard);
router.put('/:id', authenticateAdmin, updateMemoryVaultCard);
router.delete('/:id', authenticateAdmin, deleteMemoryVaultCard);

export default router;
