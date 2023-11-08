import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Your API base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // You can add any custom headers here
  },
});

export default axiosInstance;
