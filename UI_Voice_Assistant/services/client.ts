import axiosInstance from './axios';

const client = {
  // Define your API methods here
  get: (url:string, config:any = {}) => axiosInstance.get(url, config),
  post: (url:string, data:any, config = {}) => axiosInstance.post(url, data, config),
  put: (url:string, data:any, config = {}) => axiosInstance.put(url, data, config),
  delete: (url:string, data:any, config = {}) => axiosInstance.delete(url, config),
  // Add more methods (put, delete, etc.) as needed
};

export default client;
