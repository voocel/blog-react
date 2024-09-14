import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { login, register, logout, getCurrentUser } from '../services/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const loggedInUser = await login(email, password);
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    const newUser = await register(username, email, password);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login: handleLogin, logout: handleLogout, register: handleRegister }}>
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
