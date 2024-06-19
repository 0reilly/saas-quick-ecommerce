import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Header/>
      <main className='container mx-auto py-8'>
        <h1 className='text-3xl font-bold mb-4'>Welcome to Our Ecommerce Store!</h1>
        <p className='text-lg mb-8'>Discover a wide selection of amazing products, browse our latest arrivals, and enjoy a seamless shopping experience.</p>
        {/* Add more content for the homepage here, such as featured products, promotions, or any other relevant information. */}
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;