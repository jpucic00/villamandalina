// In production, API is served from same origin. In development, use localhost:3001
const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001');

// Token management
const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);
const removeToken = () => localStorage.removeItem('token');

// API helper with auth header
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

// Auth functions
export const logInWithEmailAndPassword = async (email, password) => {
  const data = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return data.user;
};

export const logout = () => {
  removeToken();
};

export const verifyToken = async () => {
  try {
    const data = await apiRequest('/api/auth/verify');
    return data.user;
  } catch {
    removeToken();
    return null;
  }
};

export const isAuthenticated = () => {
  return !!getToken();
};

// Booked dates functions
export const getBookedDates = async () => {
  return apiRequest('/api/booked-dates');
};

export const createBookedDate = async (startDate, endDate) => {
  return apiRequest('/api/booked-dates', {
    method: 'POST',
    body: JSON.stringify({ startDate, endDate }),
  });
};

export const deleteBookedDate = async (id) => {
  return apiRequest(`/api/booked-dates/${id}`, {
    method: 'DELETE',
  });
};

// Prices functions
export const getPrices = async () => {
  return apiRequest('/api/prices');
};

export const createPrice = async (startDate, endDate, price) => {
  return apiRequest('/api/prices', {
    method: 'POST',
    body: JSON.stringify({ startDate, endDate, price }),
  });
};

export const updatePrice = async (id, startDate, endDate, price) => {
  return apiRequest(`/api/prices/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ startDate, endDate, price }),
  });
};

export const deletePrice = async (id) => {
  return apiRequest(`/api/prices/${id}`, {
    method: 'DELETE',
  });
};
