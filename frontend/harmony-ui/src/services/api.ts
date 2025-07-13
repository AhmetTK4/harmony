const API_BASE_URL = 'http://localhost:8081/api';

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  roles: string[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('jwt_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async register(userData: UserRegistrationData): Promise<User> {
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

  async login(loginData: LoginData): Promise<LoginResponse> {
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

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  }

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  }

  async healthCheck(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/users/health`);
    
    if (!response.ok) {
      throw new Error('Health check failed');
    }

    return response.text();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }
}

export const apiService = new ApiService(); 