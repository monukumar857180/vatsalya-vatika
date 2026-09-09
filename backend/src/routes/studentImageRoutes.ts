import { Router } from 'express';
import { getAllStudentImages, createStudentImage, updateStudentImage, deleteStudentImage } from '../controllers/studentImageController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAllStudentImages);
router.post('/', authenticateAdmin, createStudentImage);
router.put('/:id', authenticateAdmin, updateStudentImage);
router.delete('/:id', authenticateAdmin, deleteStudentImage);

export default router;
