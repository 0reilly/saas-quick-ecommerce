import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrdersByUser } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrderHistory from '../components/OrderHistory';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrdersByUser();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Header />
      <main className='container mx-auto py-8'>
        <OrderHistory orders={orders} />
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;