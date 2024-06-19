import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Checkout from '../components/Checkout';

const CheckoutPage = () => {
  return (
    <div>
      <Header/>
      <main className='container mx-auto py-8'>
        <Checkout/>
      </main>
      <Footer/>
    </div>
  );
};

export default CheckoutPage;