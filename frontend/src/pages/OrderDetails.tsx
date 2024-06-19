import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const fetchedOrder = await getOrderById(orderId);
        setOrder(fetchedOrder);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header/>
      <main className='container mx-auto py-8'>
        <h2 className='text-2xl font-bold mb-4'>Order Details</h2>
        <p>Order ID: {order._id}</p>
        <p>Status: {order.status}</p>
        <p>Total Price: ${order.totalPrice}</p>
        <h3>Products:</h3>
        <ul>
          {order.products.map((product) => (
            <li key={product.product._id} className='mb-2'>
              <p>{product.product.name}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: ${product.product.price}</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer/>
    </div>
  );
};

export default OrderDetails;