import { useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import { AuthService } from '../services/authService';
import { User } from '../types/auth';

// 真实API模式 - 模拟数据已移除

interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useAuth = () => {
  const { isLoggedIn, user, token, login, logout, updateUser } = useAuthStore();

  // 登录 - 可以轻松切换到真实API
  const handleLogin = useCallback(async (data: LoginRequest) => {
    try {
      const result = await AuthService.login(data);
      login(result.user, result.token);
      return { success: true, user: result.user };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '登录失败' 
      };
    }
  }, [login]);

  // 注册 - 可以轻松切换到真实API
  const handleRegister = useCallback(async (data: RegisterRequest) => {
    try {
      const result = await AuthService.register(data);
      login(result.user, result.token);
      return { success: true, user: result.user };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '注册失败' 
      };
    }
  }, [login]);

  // 登出 - 可以轻松切换到真实API
  const handleLogout = useCallback(async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
    }
  }, [logout]);

  // 更新用户信息 - 可以轻松切换到真实API
  const handleUpdateProfile = useCallback(async (data: Partial<User>) => {
    try {
      const updatedUser = await AuthService.updateProfile(data);
      updateUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '更新失败' 
      };
    }
  }, [updateUser, user]);

  // 修改密码 - 可以轻松切换到真实API
  const handleChangePassword = useCallback(async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      await AuthService.changePassword(data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '密码修改失败' 
      };
    }
  }, [user]);

  return {
    // 状态
    isLoggedIn,
    user,
    token,
    
    // 方法
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    changePassword: handleChangePassword,
  };
};