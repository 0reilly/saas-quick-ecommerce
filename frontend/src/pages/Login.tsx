import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import { setAuthToken } from '../utils/storage';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = await loginUser(username, password);
      setAuthToken(token);
      navigate('/'); // Redirect to homepage after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-700 font-bold mb-2'>Username</label>
            <input
              type='text'
              id='username'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>Password</label>
            <input
              type='password'
              id='password'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between'>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;