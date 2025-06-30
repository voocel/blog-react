export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  nickname?: string;
  website?: string;
  description?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

// 模拟用户数据
export const mockUsers: User[] = [
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

// 模拟登录验证
export const authenticateUser = (email: string, password: string): User | null => {
  // 简单的模拟验证逻辑
  if (email === 'admin@163.com' && password === 'admin123') {
    return mockUsers[0]; // 管理员
  }
  if (email === 'testuser@example.com' && password === 'user123') {
    return mockUsers[1]; // 普通用户
  }
  return null;
};

// 模拟注册
export const registerUser = (username: string, email: string, password: string): User => {
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