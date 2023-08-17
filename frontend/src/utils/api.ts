import axios from 'axios';

import config from '../../config.ts';

const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token?.toString() !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
