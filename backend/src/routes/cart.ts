import express from 'express';
import { addToCart, removeFromCart, getCartItems } from '../controllers/cart';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/add', authenticateToken, addToCart); // Protect addToCart route
router.post('/remove', authenticateToken, removeFromCart); // Protect removeFromCart route
router.get('/', authenticateToken, getCartItems); // Protect getCartItems route

export default router;