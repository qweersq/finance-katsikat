import axios from 'axios';

const HOST = import.meta.env.VITE_API_HOST;
const PORT = parseInt(import.meta.env.VITE_API_PORT, 10);
const TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT, 10);

export const API_URL = HOST?.includes('localhost') ? `${HOST}:${PORT}` : HOST;

const instance = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
});

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete instance.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Load saved token on app start
const savedToken = localStorage.getItem('token');
if (savedToken) {
  setAuthToken(savedToken);
}

// Add interceptor for response handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      setAuthToken(null); // Remove invalid token
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default instance;

// Helper functions for API calls
export const fetchData = (url, config = {}) => instance.get(url, config);
export const postData = (url, data, config = {}) => instance.post(url, data, config);
export const putData = (url, data, config = {}) => instance.put(url, data, config);
export const deleteData = (url, config = {}) => instance.delete(url, config);
