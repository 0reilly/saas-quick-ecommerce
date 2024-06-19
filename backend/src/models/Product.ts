import { Schema, model } from 'mongoose';
import { Product } from '../types/product';

const productSchema = new Schema<Product>({  
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

productSchema.index({ name: 1 }); // Create index for name field

const ProductModel = model<Product>('Product', productSchema);

export default ProductModel;