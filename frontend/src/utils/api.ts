import axios from 'axios';

import config from '../../config.ts';

const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.request.use(
  (conf) => {
    const token = localStorage.getItem('token');
    if (token?.toString() !== '') {
      conf.headers.Authorization = `Bearer ${token}`;
    }

    return conf;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
