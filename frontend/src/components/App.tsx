import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = lazy(() => import('../pages/Home'));
const ProductsPage = lazy(() => import('../pages/Products'));
const CartPage = lazy(() => import('../pages/Cart'));
const CheckoutPage = lazy(() => import('../pages/Checkout'));
const LoginPage = lazy(() => import('../pages/Login'));
const SignupPage = lazy(() => import('../pages/Signup'));
const OrderHistoryPage = lazy(() => import('../pages/OrderHistory'));
const OrderDetailsPage = lazy(() => import('../pages/OrderDetails'));

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='container mx-auto py-8'>
        <Suspense fallback={<div>Loading...</div>}> 
          <Routes>
            <Route path='/' element={<HomePage />} /> 
            <Route path='/products' element={<ProductsPage />} /> 
            <Route path='/cart' element={<CartPage />} /> 
            <Route path='/checkout' element={<CheckoutPage />} /> 
            <Route path='/login' element={<LoginPage />} /> 
            <Route path='/signup' element={<SignupPage />} /> 
            <Route path='/orders' element={<OrderHistoryPage />} /> 
            <Route path='/orders/:orderId' element={<OrderDetailsPage />} /> 
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
