import { Router } from 'express';
import {
  getCarouselImages,
  addCarouselImage,
  updateCarouselImage,
  deleteCarouselImage,
  reorderCarouselImages
} from '../controllers/carouselController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getCarouselImages);
router.post('/', authenticateAdmin, addCarouselImage);
router.put('/reorder', authenticateAdmin, reorderCarouselImages);
router.put('/:id', authenticateAdmin, updateCarouselImage);
router.delete('/:id', authenticateAdmin, deleteCarouselImage);

export default router;
