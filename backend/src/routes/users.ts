import express from 'express';
import { registerUser, loginUser, logoutUser, updateUser, deleteUser, getUserById } from '../controllers/users';
import { validateUserRegistration, validateUserLogin, validateUserId } from '../middleware/validation';
import { authenticateToken, rateLimitLogin } from '../middleware/auth';

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/login', rateLimitLogin, validateUserLogin, loginUser); // Apply rate limiting to login route
router.post('/logout', logoutUser);
router.put('/:id', authenticateToken, validateUserId, updateUser);
router.delete('/:id', authenticateToken, validateUserId, deleteUser);
router.get('/:id', authenticateToken, validateUserId, getUserById);

export default router;