import React, { useState, useEffect } from 'react';
import { getCartItems } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShoppingCart from '../components/ShoppingCart';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCartItems();
        setCartItems(cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <Header/>
      <main className='container mx-auto py-8'>
        <ShoppingCart cartItems={cartItems}/>
      </main>
      <Footer/>
    </div>
  );
};

export default CartPage;