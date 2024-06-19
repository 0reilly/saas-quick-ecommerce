import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/products';
import { authenticateToken } from '../middleware/auth'; // Import authenticateToken

const router = express.Router();

router.post('/', authenticateToken, createProduct); // Protect createProduct route
router.get('/', authenticateToken, getProducts); // Protect getProducts route
router.get('/:id', authenticateToken, getProductById); // Protect getProductById route
router.put('/:id', authenticateToken, updateProduct); // Protect updateProduct route
router.delete('/:id', authenticateToken, deleteProduct); // Protect deleteProduct route

export default router;