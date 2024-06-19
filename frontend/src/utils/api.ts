import axios from 'axios';
import { getAuthToken } from './storage';
import redisClient from '../../backend/src/utils/redis'; // Import Redis client from backend

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({  
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${getAuthToken()}`, // Include authorization token in headers
  },
});

export const registerUser = async (username: string, password: string) => {
  const response = await axiosInstance.post('/users/register', {
    username,
    password,
  });
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  const response = await axiosInstance.post('/users/login', {
    username,
    password,
  });
  return response.data.token;
};

export const createCheckoutSession = async () => {
  const response = await axiosInstance.post('/stripe/create-checkout-session');
  return response.data;
};

export const getOrders = async () => {
  const redisKey = 'orders';
  const cachedOrders = await redisClient.get(redisKey);
  if (cachedOrders) {
    return JSON.parse(cachedOrders);
  }
  const response = await axiosInstance.get('/orders');
  await redisClient.set(redisKey, JSON.stringify(response.data), 'EX', 3600); // Cache for 1 hour
  return response.data;
};

export const getOrderById = async (orderId: string) => {
  const redisKey = `order:${orderId}`;
  const cachedOrder = await redisClient.get(redisKey);
  if (cachedOrder) {
    return JSON.parse(cachedOrder);
  }
  const response = await axiosInstance.get(`/orders/${orderId}`);
  await redisClient.set(redisKey, JSON.stringify(response.data), 'EX', 3600); // Cache for 1 hour
  return response.data;
};

export const getCartItems = async () => {
  const response = await axiosInstance.get('/cart');
  return response.data;
};

export const addToCart = async (productId: string, quantity: number) => {
  const response = await axiosInstance.post('/cart/add', {
    productId,
    quantity,
  });
  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await axiosInstance.post('/cart/remove', {
    productId,
  });
  return response.data;
};

export const getProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

export const getProductById = async (productId: string) => {
  const response = await axiosInstance.get(`/products/${productId}`);
  return response.data;
};

export const createProduct = async (name: string, description: string, price: number, imageUrl: string) => {
  const response = await axiosInstance.post('/products', {
    name,
    description,
    price,
    imageUrl,
  });
  return response.data;
};

export const updateProduct = async (productId: string, name: string, description: string, price: number, imageUrl: string) => {
  const response = await axiosInstance.put(`/products/${productId}`, {
    name,
    description,
    price,
    imageUrl,
  });
  return response.data;
};

export const deleteProduct = async (productId: string) => {
  const response = await axiosInstance.delete(`/products/${productId}`);
  return response.data;
};

export const createOrder = async (products: any[]) => {
  const response = await axiosInstance.post('/orders', {
    products,
  });
  return response.data;
};

export const getOrdersByUser = async () => {
  const response = await axiosInstance.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await axiosInstance.put(`/orders/${orderId}`, {
    status,
  });
  return response.data;
};