import { useState, useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import { AuthService } from '../services/authService';
import { User } from '../types/auth';

export const useUserProfile = () => {
  const { user, updateUser, isLoggedIn } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  // 刷新用户信息
  const refresh = useCallback(async () => {
    if (!isLoggedIn) return null;

    setIsLoading(true);
    try {
      const latestUser = await AuthService.getCurrentUser();
      updateUser(latestUser);
      return latestUser;
    } catch (error) {
      console.error('Failed to refresh user profile:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, updateUser]);

  // 更新用户资料
  const update = useCallback(async (data: Partial<User>) => {
    if (!isLoggedIn) throw new Error('用户未登录');

    try {
      const updatedUser = await AuthService.updateProfile(data);
      updateUser(updatedUser); // 立即同步到全局状态
      return updatedUser;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw error;
    }
  }, [isLoggedIn, updateUser]);

  return {
    user,
    isLoading,
    refresh,
    update,
  };
}; 