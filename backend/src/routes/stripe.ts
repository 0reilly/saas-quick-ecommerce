import express from 'express';
import { createCheckoutSession } from '../controllers/stripe';
import { authenticateToken } from '../middleware/auth'; // Import authenticateToken

const router = express.Router();

router.post('/create-checkout-session', authenticateToken, createCheckoutSession); // Protect createCheckoutSession route

export default router;