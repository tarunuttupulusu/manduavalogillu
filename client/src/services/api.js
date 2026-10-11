// API Client for Manduva Logillu MERN Stack

const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('ml_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request(`/products${queryString}`);
  },

  async getProduct(id) {
    return request(`/products/${id}`);
  },

  async submitReview(productId, reviewData) {
    return request(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  },

  // Auth
  async login(credentials) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  async register(userData) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  async getProfile() {
    return request('/auth/me');
  },

  async updateProfile(profileData) {
    return request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  // Orders
  async createOrder(orderData) {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  async getMyOrders() {
    return request('/orders/my-orders');
  },

  async getOrder(id) {
    return request(`/orders/${id}`);
  },

  // Showroom Visit Appointments
  async bookAppointment(appointmentData) {
    return request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    });
  },

  // Inquiries
  async sendInquiry(inquiryData) {
    return request('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData)
    });
  },

  // Admin Endpoints
  async getAdminStats() {
    return request('/admin/stats');
  },

  async getAdminOrders() {
    return request('/orders');
  },

  async updateOrderStatus(id, statusData) {
    return request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData)
    });
  },

  async getAdminAppointments() {
    return request('/appointments');
  },

  async updateAppointmentStatus(id, status) {
    return request(`/appointments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  async getAdminInquiries() {
    return request('/inquiries');
  },

  async createProduct(productData) {
    return request('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },

  async updateProduct(id, productData) {
    return request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },

  async deleteProduct(id) {
    return request(`/products/${id}`, {
      method: 'DELETE'
    });
  }
};
