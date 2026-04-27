import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);

// Habits
export const getHabits = () => api.get('/habits');
export const createHabit = (data) => api.post('/habits', data);
export const updateHabit = (id, data) => api.put(`/habits/${id}`, data);
export const deleteHabit = (id) => api.delete(`/habits/${id}`);
export const completeHabit = (id) => api.post(`/habits/${id}/complete`);

export default api;
