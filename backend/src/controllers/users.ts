import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import { User } from '../types/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';  

export const registerUser = async (req: Request, res: Response) => {  
  const { username, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    const newUser = new UserModel({ username, password });
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Failed to register user' });
  }
};

export const loginUser = async (req: Request, res: Response) => {  
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Failed to log in' });
  }
};

export const logoutUser = async (req: Request, res: Response) => {  
  // Implement logout logic (e.g., invalidate token or clear session)
  return res.status(200).json({ message: 'Logged out successfully' });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (username) {
      user.username = username;
    }
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }
    await user.save();
    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Failed to delete user' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Failed to fetch user' });
  }
};