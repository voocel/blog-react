export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
}

export interface DashboardStats {
  users: number;
  visits: number;
  articles: number;
  comments: number;
}