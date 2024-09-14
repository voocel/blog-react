import { useState, useEffect } from 'react';
import { User } from '../types/user'; // 假设你有一个 User 类型定义

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // 这里可以添加检查用户认证状态的逻辑
    // 例如，从 localStorage 或 API 获取用户信息
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    // 实现登录逻辑
    // 设置 authState
  };

  const logout = () => {
    // 实现登出逻辑
    // 清除 authState
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    login,
    logout,
  };
};

// 如果你想使用默认导出，可以这样写：
// export default useAuth;
