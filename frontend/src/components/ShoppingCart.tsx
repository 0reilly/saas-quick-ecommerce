import React, { useState, useEffect } from 'react';
import { getCart } from '../utils/api';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCartItems(cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className='flex justify-between items-center mb-2'>
              <div>
                <p>{item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.product.price}</p>
              </div>
              <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-600'>Cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCart;