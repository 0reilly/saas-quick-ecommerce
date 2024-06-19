import { Request, Response } from 'express';
import OrderModel from '../models/Order';
import UserModel from '../models/User';
import ProductModel from '../models/Product';
import redisClient from '../utils/redis'; // Import Redis client
import kafka from '../utils/kafka'; // Import Kafka utility

export const createOrder = async (req: Request, res: Response) => {  
  const { products } = req.body;
  const userId = req.user.userId; // Get user ID from authenticated user
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const productIds = products.map((product) => product.product);
    const productsData = await ProductModel.find({ _id: { $in: productIds } });
    let totalPrice = 0;
    const orderProducts = products.map((product) => {
      const productData = productsData.find((p) => p._id.toString() === product.product.toString());
      if (productData) {
        totalPrice += productData.price * product.quantity;
        return {
          product: productData._id,
          quantity: product.quantity,
        };
      }
      return null;
    }).filter((p) => p !== null) as { product: any; quantity: number }[];

    const newOrder = new OrderModel({ user: userId, products: orderProducts, totalPrice });
    await newOrder.save();
    // Clear Redis cache after creating a new order
    redisClient.del(`order:${newOrder._id}`);
    redisClient.del('orders');
    // Send order created message to Kafka
    kafka.sendOrderCreatedMessage(newOrder);
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Failed to create order' });
  }
};

export const getOrdersByUser = async (req: Request, res: Response) => {  
  const userId = req.user.userId; // Get user ID from authenticated user
  try {
    const redisKey = `orders:${userId}`; // Cache key for user orders
    const cachedOrders = await redisClient.get(redisKey);
    if (cachedOrders) {
      return res.status(200).json(JSON.parse(cachedOrders));
    }
    const orders = await OrderModel.find({ user: userId }).populate('products.product');
    await redisClient.set(redisKey, JSON.stringify(orders), 'EX', 3600); // Cache for 1 hour
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {  
  const { id } = req.params;
  try {
    const redisKey = `order:${id}`;
    const cachedOrder = await redisClient.get(redisKey);
    if (cachedOrder) {
      return res.status(200).json(JSON.parse(cachedOrder));
    }
    const order = await OrderModel.findById(id).populate('products.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await redisClient.set(redisKey, JSON.stringify(order), 'EX', 3600); // Cache for 1 hour
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ message: 'Failed to fetch order' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {  
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // Clear Redis cache after updating an order
    redisClient.del(`order:${id}`);
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ message: 'Failed to update order status' });
  }
};