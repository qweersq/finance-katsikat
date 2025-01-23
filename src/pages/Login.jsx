import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData, setAuthToken } from '../services/api';
import { useGeneral } from '../hooks/useGeneral';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useGeneral();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await postData('/login', { email, password })
        .then((response) => {
          const { token } = response.data.data;
          
          if (response.data.data.userCheck.role !== 'superadmin') {
            setError('You are not authorized to access this page');
            return;
          }
          setAuthToken(token); // Save token and set it in headers
          setIsAuthenticated(true);
          navigate('/');
        })
        .catch((err) => {
          setError(err.response?.data?.message || 'An error occurred. Please try again.');
        });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-100 to-white">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-sky-100 mb-4">
            <img className="h-20 w-20" src="https://www.katsikat.id/assets/newKatsikat-ac5e55a2.png" alt="Logo" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent mb-2">
            Finance Dashboard
          </h2>
          <p className="text-gray-600">
            Katsikat finance dashboard ✨
          </p>
        </div>

        <form className="bg-white p-8 rounded-2xl shadow-lg border border-sky-100" onSubmit={handleLogin}>
          {error && <p className="text-red-600 mb-4 text-sm bg-red-50 p-3 rounded">{error}</p>}

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-400 to-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:from-sky-500 hover:to-sky-600 transition-all duration-200 shadow-md hover:shadow-sky-200"
          >
            Sign In
          </button>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-sky-600 hover:text-sky-700 transition-colors">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
