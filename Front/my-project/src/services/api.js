import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to login using window.location if not within a React component context
            // Or just clear the storage and let the AuthContext handle the redirect if it's listening
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const orderService = {
    // Create a new order
    createOrder: async (orderData) => {
        const response = await api.post('/api/orders', orderData);
        return response.data;
    },

    // Get user's orders
    getMyOrders: async () => {
        const response = await api.get('/api/orders/my-orders');
        return response.data;
    },

    // Create Stripe Checkout Session
    createStripeSession: async (sessionData) => {
        const response = await api.post('/api/stripe/create-checkout-session', sessionData);
        return response.data;
    },
};

export default api;
