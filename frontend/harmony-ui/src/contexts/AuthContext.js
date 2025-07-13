import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, LoginData, UserRegistrationData, User } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (loginData: LoginData) => Promise<void>;
  register: (userData: UserRegistrationData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = apiService.getToken();
    if (token) {
      setIsAuthenticated(true);
      // Optionally fetch user data here
    }
    setLoading(false);
  }, []);

  const login = async (loginData: LoginData) => {
    try {
      const response = await apiService.login(loginData);
      apiService.setToken(response.token);
      setIsAuthenticated(true);
      
      // Fetch user data
      const users = await apiService.getUsers();
      const currentUser = users.find(u => u.email === loginData.email);
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: UserRegistrationData) => {
    try {
      const newUser = await apiService.register(userData);
      setUser(newUser);
      // After registration, automatically log in
      await login({ email: userData.email, password: userData.password });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 