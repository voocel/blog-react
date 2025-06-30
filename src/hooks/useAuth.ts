import { useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import { AuthService } from '../services/authService';
import { User } from '../types/auth';

// 模拟用户数据 - 生产环境中应该删除
const mockUsers: User[] = [
  {
    id: '1',
    username: 'voocel',
    email: 'admin@163.com',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
    role: 'admin',
    nickname: 'voocel',
    website: 'https://voocel.com',
    description: '全栈开发者，专注于Go、React和AI技术'
  },
  {
    id: '2',
    username: 'testuser',
    email: 'testuser@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    role: 'user',
    nickname: '测试用户',
    website: '',
    description: '这是一个普通用户账号'
  }
];

// 模拟登录验证 - 生产环境中应该删除
const authenticateUser = (email: string, password: string): User | null => {
  if (email === 'admin@163.com' && password === 'admin123') {
    return mockUsers[0]; // 管理员
  }
  if (email === 'testuser@example.com' && password === 'user123') {
    return mockUsers[1]; // 普通用户
  }
  return null;
};

// 模拟注册 - 生产环境中应该删除
const registerUser = (username: string, email: string, password: string): User => {
  return {
    id: Date.now().toString(),
    username,
    email,
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    role: 'user',
    nickname: username,
    website: '',
    description: ''
  };
};

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
      // 🔄 切换到真实API时，取消注释下面的代码，删除模拟逻辑
      /*
      const result = await AuthService.login(data);
      login(result.user, result.token);
      return { success: true, user: result.user };
      */

      // 🚧 模拟逻辑 - 生产环境中删除
      await new Promise(resolve => setTimeout(resolve, 1000));
      const authenticatedUser = authenticateUser(data.email, data.password);
      
      if (authenticatedUser) {
        const mockToken = `mock_token_${Date.now()}`;
        login(authenticatedUser, mockToken);
        return { success: true, user: authenticatedUser };
      } else {
        return { 
          success: false, 
          error: '邮箱或密码错误' 
        };
      }
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
      // 🔄 切换到真实API时，取消注释下面的代码，删除模拟逻辑
      /*
      const result = await AuthService.register(data);
      login(result.user, result.token);
      return { success: true, user: result.user };
      */

      // 🚧 模拟逻辑 - 生产环境中删除
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUser = registerUser(data.username, data.email, data.password);
      const mockToken = `mock_token_${Date.now()}`;
      
      login(newUser, mockToken);
      return { success: true, user: newUser };
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
      // 🔄 切换到真实API时，取消注释下面的代码
      /*
      await AuthService.logout();
      */

      // 🚧 模拟逻辑 - 生产环境中删除
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
    }
  }, [logout]);

  // 更新用户信息 - 可以轻松切换到真实API
  const handleUpdateProfile = useCallback(async (data: Partial<User>) => {
    try {
      // 🔄 切换到真实API时，取消注释下面的代码，删除模拟逻辑
      /*
      const updatedUser = await AuthService.updateProfile(data);
      updateUser(updatedUser);
      return { success: true, user: updatedUser };
      */

      // 🚧 模拟逻辑 - 生产环境中删除
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateUser(data);
      return { success: true, user: { ...user, ...data } as User };
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
      // 🔄 切换到真实API时，取消注释下面的代码，删除模拟逻辑
      /*
      await AuthService.changePassword(data);
      return { success: true };
      */

      // 🚧 模拟逻辑 - 生产环境中删除
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 简单验证旧密码
      if (user?.email === 'admin@163.com' && data.oldPassword !== 'admin123') {
        return { 
          success: false, 
          error: '旧密码不正确' 
        };
      }
      
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