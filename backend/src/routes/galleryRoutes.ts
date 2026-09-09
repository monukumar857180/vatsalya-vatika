import { Router } from 'express';
import {
  getGallery,
  getGalleryById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getGallery);
router.get('/:id', getGalleryById);
router.post('/', authenticateAdmin, createGalleryItem);
router.put('/:id', authenticateAdmin, updateGalleryItem);
router.delete('/:id', authenticateAdmin, deleteGalleryItem);

export default router;
