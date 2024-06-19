import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database';
import usersRouter from './routes/users';
import productsRouter from './routes/products'; // Add products router
import ordersRouter from './routes/orders'; // Add orders router
import stripeRouter from './routes/stripe'; // Add stripe router
import cartRouter from './routes/cart'; // Add cart router
import { PORT } from './config/environment';
import { authenticateToken } from './middleware/auth';
import redisClient from './utils/redis'; // Import Redis client
import { errorHandler } from './middleware/errorHandler'; // Import errorHandler middleware
import { createLogger, format, transports } from 'winston';
import kafka from './utils/kafka'; // Import Kafka utility

// Create a logger instance
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'logs/combined.log' }), // Log all messages to a file
  ],
});

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/users', usersRouter);

app.use('/products', productsRouter);

app.use('/orders', ordersRouter);

app.use('/stripe', stripeRouter);

app.use('/cart', cartRouter);

// Start Kafka consumer to process order created messages
kafka.consumeOrderCreatedMessage();

// Error handling middleware
app.use(errorHandler); // Use errorHandler middleware

// Connect to database
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});