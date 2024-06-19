import { Schema, model } from 'mongoose';
import { User } from '../types/user';
import bcrypt from 'bcrypt';

const userSchema = new Schema<User>({  
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {  
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.index({ username: 1 }, { unique: true }); // Create index for username field
userSchema.index({ email: 1 }, { unique: true }); // Create index for email field

const UserModel = model<User>('User', userSchema);

export default UserModel;