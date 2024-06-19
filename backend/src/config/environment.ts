import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

export const MONGO_USER = process.env.MONGO_USER || 'admin';

export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'password';

export const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_YOUR_STRIPE_SECRET_KEY';

export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'password';

export const KAFKA_BROKERS = process.env.KAFKA_BROKERS || 'localhost:9092';