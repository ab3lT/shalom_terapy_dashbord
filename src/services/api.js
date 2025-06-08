import axios from 'axios';

const API_BASE_URL = 'http://localhost:8003/api/v1/shalom';
const AUTH_BASE_URL = 'http://localhost:8003/api/v1/shalom/auth/';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth service
export const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${AUTH_BASE_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  changePassword: async (data) => {
    const response = await axios.post(`${AUTH_BASE_URL}/changePassword`, data);
    return response.data;
  },

  validateToken: async () => {
    const response = await axios.get(`${AUTH_BASE_URL}/validate`);
    return response.data;
  },
};

export default api; 