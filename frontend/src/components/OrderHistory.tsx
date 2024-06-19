import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrdersByUser } from '../utils/api';

const OrderHistory = () => {
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
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl font-bold mb-4'>Order History</h2>
        {orders.length > 0 ? (
          <ul>
            {orders.map((order) => (
              <li key={order._id} className='mb-2'>
                <div className='flex justify-between items-center'>
                  <p>Order ID: {order._id}</p>
                  <p>Status: {order.status}</p>
                </div>
                <p>Total Price: ${order.totalPrice}</p>
                <p>Products:</p>
                <ul>
                  {order.products.map((product) => (
                    <li key={product.product._id} className='mb-1'>
                      {product.product.name} (Quantity: {product.quantity})
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate(`/orders/${order._id}`)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                  View Details
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-600'>No order history found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;