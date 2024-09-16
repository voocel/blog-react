import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';
import { login as loginService, register as registerService, LoginResponse } from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  console.log('AuthProvider: isAuthenticated =', isAuthenticated, 'user =', user); // 添加这行来调试

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [isAuthenticated, user]);

  const login = async (email: string, password: string) => {
    try {
      const response: LoginResponse = await loginService(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      console.log('Login successful:', response.user); // 添加这行来调试
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const newUser = await registerService(email, password, username);
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('注册失败:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
