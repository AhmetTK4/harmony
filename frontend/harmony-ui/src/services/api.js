// API taban URL'ini environment'a göre belirler
const getApiBaseUrl = () => {
  // Öncelik: Environment variable
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Development ortamı (npm start veya local docker)
  if (process.env.REACT_APP_ENVIRONMENT === 'development' || process.env.NODE_ENV === 'development') {
    return 'http://localhost:8081/api';
  }
  // Production ortamı (Google Cloud Run)
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    return 'https://user-service-71511467925.europe-west1.run.app/api';
  }
  // Fallback: local
  return 'http://localhost:8081/api';
};

// Her mikroservis için ayrı base URL'ler
const getServiceBaseUrl = (service) => {
  const isDevelopment = process.env.REACT_APP_ENVIRONMENT === 'development' || process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    const ports = {
      user: '8081',
      product: '8083',
      order: '8082',
      notification: '8084'
    };
    return `http://localhost:${ports[service]}/api`;
  } else {
    // Production URLs
    const urls = {
      user: 'https://user-service-71511467925.europe-west1.run.app/api',
      product: 'https://product-service-71511467925.europe-west1.run.app/api',
      order: 'https://order-service-71511467925.europe-west1.run.app/api',
      notification: 'https://notification-service-71511467925.europe-west1.run.app/api'
    };
    return urls[service];
  }
};

const API_BASE_URL = getApiBaseUrl();

class ApiService {
  getAuthHeaders() {
    const token = localStorage.getItem('jwt_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // User Service Methods
  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  }

  async login(loginData) {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  }

  async getUserById(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  }

  async getUserByEmail(email) {
    const response = await fetch(`${API_BASE_URL}/users/email/${email}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  }

  // Product Service Methods
  async getProducts() {
    const response = await fetch(`${getServiceBaseUrl('product')}/products`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  }

  async getProductById(id) {
    const response = await fetch(`${getServiceBaseUrl('product')}/products/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  }

  async createProduct(productData) {
    const response = await fetch(`${getServiceBaseUrl('product')}/products`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return response.json();
  }

  async updateProduct(id, productData) {
    const response = await fetch(`${getServiceBaseUrl('product')}/products/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return response.json();
  }

  async deleteProduct(id) {
    const response = await fetch(`${getServiceBaseUrl('product')}/products/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    return response.json();
  }

  // Order Service Methods
  async getOrders() {
    const response = await fetch(`${getServiceBaseUrl('order')}/orders`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return response.json();
  }

  async getOrderById(id) {
    const response = await fetch(`${getServiceBaseUrl('order')}/orders/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    return response.json();
  }

  async createOrder(orderData) {
    const response = await fetch(`${getServiceBaseUrl('order')}/orders`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return response.json();
  }

  async updateOrder(id, orderData) {
    const response = await fetch(`${getServiceBaseUrl('order')}/orders/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to update order');
    }

    return response.json();
  }

  async deleteOrder(id) {
    const response = await fetch(`${getServiceBaseUrl('order')}/orders/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete order');
    }

    return response.json();
  }

  async getUserOrders(userId) {
    const response = await fetch(`${getServiceBaseUrl('order')}/orders/user/${userId}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user orders');
    }

    return response.json();
  }

  // Notification Service Methods
  async getNotifications() {
    const response = await fetch(`${getServiceBaseUrl('notification')}/notifications`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    return response.json();
  }

  async getNotificationById(id) {
    const response = await fetch(`${getServiceBaseUrl('notification')}/notifications/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notification');
    }

    return response.json();
  }

  async createNotification(notificationData) {
    const response = await fetch(`${getServiceBaseUrl('notification')}/notifications`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(notificationData),
    });

    if (!response.ok) {
      throw new Error('Failed to create notification');
    }

    return response.json();
  }

  async updateNotification(id, notificationData) {
    const response = await fetch(`${getServiceBaseUrl('notification')}/notifications/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(notificationData),
    });

    if (!response.ok) {
      throw new Error('Failed to update notification');
    }

    return response.json();
  }

  async deleteNotification(id) {
    const response = await fetch(`${getServiceBaseUrl('notification')}/notifications/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete notification');
    }

    return response.json();
  }

  async getUserNotifications(userId) {
    const response = await fetch(`${getServiceBaseUrl('notification')}/notifications/user/${userId}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user notifications');
    }

    return response.json();
  }

  async markNotificationAsRead(id) {
    const response = await fetch(`${getServiceBaseUrl('notification')}/notifications/${id}/read`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }

    return response.json();
  }

  // Health Check Methods
  async healthCheck() {
    const response = await fetch(`${getServiceBaseUrl('user')}/users/actuator/health`);
    return response.json();
  }

  async productHealthCheck() {
    const response = await fetch(`${getServiceBaseUrl('product')}/products/actuator/health`);
    return response.json();
  }

  async orderHealthCheck() {
    const response = await fetch(`${getServiceBaseUrl('order')}/orders/actuator/health`);
    return response.json();
  }

  async notificationHealthCheck() {
    const response = await fetch(`${getServiceBaseUrl('notification')}/notifications/actuator/health`);
    return response.json();
  }

  // Auth Methods
  isAuthenticated() {
    return !!localStorage.getItem('jwt_token');
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }

  getToken() {
    return localStorage.getItem('jwt_token');
  }

  setToken(token) {
    localStorage.setItem('jwt_token', token);
  }
}

export const apiService = new ApiService();
export default apiService; 