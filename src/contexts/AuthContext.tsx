import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/user';
import { register as registerService } from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // 实现登录逻辑
    setIsAuthenticated(true);
    // 设置用户信息
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
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
