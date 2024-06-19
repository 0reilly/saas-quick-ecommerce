import { Request, Response } from 'express';
import ProductModel from '../models/Product';
import redisClient from '../utils/redis'; // Import Redis client

export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId; // Get user ID from authenticated user
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const redisKey = `cart:${userId}`;
    const cart = await redisClient.get(redisKey);
    if (cart) {
      const parsedCart = JSON.parse(cart);
      const existingItemIndex = parsedCart.findIndex((item: any) => item.product.toString() === productId.toString());
      if (existingItemIndex !== -1) {
        parsedCart[existingItemIndex].quantity += quantity;
      } else {
        parsedCart.push({ product, quantity });
      }
      await redisClient.set(redisKey, JSON.stringify(parsedCart));
    } else {
      const newCart = [{ product, quantity }];
      await redisClient.set(redisKey, JSON.stringify(newCart));
    }
    return res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ message: 'Failed to add item to cart' });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const userId = req.user.userId; // Get user ID from authenticated user
  try {
    const redisKey = `cart:${userId}`;
    const cart = await redisClient.get(redisKey);
    if (cart) {
      const parsedCart = JSON.parse(cart);
      const updatedCart = parsedCart.filter((item: any) => item.product.toString() !== productId.toString());
      await redisClient.set(redisKey, JSON.stringify(updatedCart));
    }
    return res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return res.status(500).json({ message: 'Failed to remove item from cart' });
  }
};

export const getCartItems = async (req: Request, res: Response) => {
  const userId = req.user.userId; // Get user ID from authenticated user
  try {
    const redisKey = `cart:${userId}`;
    const cart = await redisClient.get(redisKey);
    if (cart) {
      return res.status(200).json(JSON.parse(cart));
    }
    return res.status(200).json([]); // Return an empty array if the cart is empty
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ message: 'Failed to fetch cart items' });
  }
};