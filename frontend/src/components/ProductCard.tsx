import React from 'react';
import { addToCart } from '../utils/api';

interface ProductCardProps {
  product: any;
  quantity?: number;
}

const ProductCard = ({ product, quantity }: ProductCardProps) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id.toString(), quantity || 1);
      // Handle success (e.g., show a message, update cart state)
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className='bg-white rounded shadow-md p-4 hover:shadow-lg transform transition duration-300 hover:scale-105'>
      <img src={product.imageUrl} alt={product.name} className='w-full h-48 object-cover rounded-md mb-2' loading="lazy" />
      <h3 className='text-lg font-bold'>{product.name}</h3>
      <p className='text-gray-600'>{product.description}</p>
      <p className='text-xl font-bold'>${product.price}</p>
      <button onClick={handleAddToCart} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Add to Cart</button>
    </div>
  );
};

export default ProductCard;