export interface Comment {
  id: number;
  content: string;
  userId: number;  // 添加这个属性
  author: string;
  type: string;
  avatar?: string;
  createdAt: string;
  // 其他可能的属性...
}