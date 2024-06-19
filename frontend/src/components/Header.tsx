import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, removeAuthToken } from '../utils/storage';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsLoggedIn(true);
      // Fetch username from backend using the token
      // (replace with your actual backend logic)
      setUsername('your_username'); // Replace with actual username
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className='bg-blue-500 text-white py-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Ecommerce App</h1>
        <nav>
          <ul className='flex space-x-4'>
            <li><a href='/'>Home</a></li>
            <li><a href='/products'>Products</a></li>
            <li><a href='/cart'>Cart</a></li>
            {isLoggedIn ? (
              <>
                <li className='text-white'>Welcome, {username}!</li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <li><a href='/login'>Login</a></li>
            )}
            {!isLoggedIn && <li><a href='/signup'>Signup</a></li>}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;