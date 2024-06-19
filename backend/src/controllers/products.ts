import { Request, Response } from 'express';
import ProductModel from '../models/Product';
import redisClient from '../utils/redis'; // Import Redis client

export const createProduct = async (req: Request, res: Response) => {  
  const { name, description, price, imageUrl } = req.body;
  try {
    const newProduct = new ProductModel({ name, description, price, imageUrl });
    await newProduct.save();
    // Clear Redis cache after creating a new product
    redisClient.del('products');
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Failed to create product' });
  }
};

export const getProducts = async (req: Request, res: Response) => {  
  try {
    const redisKey = 'products';
    const cachedProducts = await redisClient.get(redisKey);
    if (cachedProducts) {
      return res.status(200).json(JSON.parse(cachedProducts));
    }
    const products = await ProductModel.find();
    await redisClient.set(redisKey, JSON.stringify(products), 'EX', 3600); // Cache for 1 hour
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {  
  const { id } = req.params;
  try {
    const redisKey = `product:${id}`;
    const cachedProduct = await redisClient.get(redisKey);
    if (cachedProduct) {
      return res.status(200).json(JSON.parse(cachedProduct));
    }
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await redisClient.set(redisKey, JSON.stringify(product), 'EX', 3600); // Cache for 1 hour
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Failed to fetch product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {  
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, { name, description, price, imageUrl }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Clear Redis cache after updating a product
    redisClient.del(`product:${id}`);
    redisClient.del('products');
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {  
  const { id } = req.params;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Clear Redis cache after deleting a product
    redisClient.del(`product:${id}`);
    redisClient.del('products');
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Failed to delete product' });
  }
};