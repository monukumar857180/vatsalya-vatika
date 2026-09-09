import { Router } from 'express';
import { loginUser, registerUser, getRegisteredUsers, getMe } from '../controllers/authController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/users', authenticateAdmin, getRegisteredUsers);
router.get('/me', authenticateAdmin, getMe);

export default router;
