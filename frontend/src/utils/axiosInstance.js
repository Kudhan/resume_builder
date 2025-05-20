import axios from 'axios';
import { BASEURL } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Token expired or not valid
        localStorage.removeItem('token'); // Optional: clear token
        window.location.href = '/';       // Redirect to login/home
      } else if (error.response.status === 500) {
        console.error('Server error. Please try again later.');
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
