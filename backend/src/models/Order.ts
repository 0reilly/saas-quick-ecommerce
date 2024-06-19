import { Schema, model } from 'mongoose';
import { Order } from '../types/order';

const orderSchema = new Schema<Order>({  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

orderSchema.index({ user: 1 }); // Create index for user field
orderSchema.index({ status: 1 }); // Create index for status field

const OrderModel = model<Order>('Order', orderSchema);

export default OrderModel;