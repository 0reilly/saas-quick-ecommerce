import express from 'express';
import { createOrder, getOrdersByUser, getOrderById, updateOrderStatus } from '../controllers/orders';
import { authenticateToken } from '../middleware/auth'; // Import authenticateToken

const router = express.Router();

router.post('/', authenticateToken, createOrder); // Protect createOrder route
router.get('/', authenticateToken, getOrdersByUser); // Protect getOrdersByUser route
router.get('/:id', authenticateToken, getOrderById); // Protect getOrderById route
router.put('/:id', authenticateToken, updateOrderStatus); // Protect updateOrderStatus route

export default router;