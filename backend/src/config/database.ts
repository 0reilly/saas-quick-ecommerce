import mongoose from 'mongoose';

const connectDB = async () => {  
  try {
    const conn = await mongoose.connect(process.env.MONGO_ATLAS_URI || 'mongodb://localhost:27017/ecommerce', {
      user: process.env.MONGO_ATLAS_USER, // Database user
      pass: process.env.MONGO_ATLAS_PASSWORD, // Database password
      authSource: 'admin' // Authentication database
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;