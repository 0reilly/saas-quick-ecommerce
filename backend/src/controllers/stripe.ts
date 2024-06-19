import { Request, Response } from 'express';
import stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_YOUR_STRIPE_SECRET_KEY'; // Replace with your secret key
const stripe = new stripe(stripeSecretKey);

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1234567890', // Replace with your product price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`, // Replace with your success URL
      cancel_url: `${process.env.FRONTEND_URL}/cancel`, // Replace with your cancel URL
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: 'Failed to create checkout session' });
  }
};