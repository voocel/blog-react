// API 相关类型定义

// 通用 API 响应格式
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

// 分页响应格式
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 错误响应格式
export interface ErrorResponse {
  code: number;
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
  timestamp: number;
}

// 用户相关类型
export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  nickname?: string;
  website?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// 文章相关类型
export interface Article {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  status: 'published' | 'draft';
  isOriginal: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tags: Tag[];
  category: Category;
  author: {
    id: number;
    username: string;
    avatar: string;
  };
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// 讨论相关类型
export interface Discussion {
  id: number;
  title: string;
  content: string;
  status: 'active' | 'inactive';
  viewCount: number;
  replyCount: number;
  tags: Tag[];
  author: {
    id: number;
    username: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}

// 评论相关类型
export interface Comment {
  id: number;
  content: string;
  status: 'approved' | 'pending' | 'rejected';
  articleId?: number;
  discussionId?: number;
  parentId?: number;
  author: {
    id: number;
    username: string;
    avatar: string;
  };
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

// 标签相关类型
export interface Tag {
  id: number;
  name: string;
  title?: string;
  description?: string;
  color?: string;
  articleCount: number;
  createdAt: string;
  updatedAt: string;
}

// 分类相关类型
export interface Category {
  id: number;
  name: string;
  path: string;
  description?: string;
  articleCount: number;
  createdAt: string;
  updatedAt: string;
}

// 友链相关类型
export interface FriendLink {
  id: number;
  name: string;
  url: string;
  logo?: string;
  description?: string;
  status: 'active' | 'inactive';
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// 文件相关类型
export interface FileItem {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  path: string;
  type: 'file' | 'folder';
  createdAt: string;
}

// 访问统计类型
export interface VisitRecord {
  id: number;
  articleId?: number;
  articleTitle?: string;
  ip: string;
  userAgent: string;
  referer?: string;
  visitCount: number;
  createdAt: string;
}

// 仪表盘统计类型
export interface DashboardStats {
  users: {
    total: number;
    growth: number;
  };
  articles: {
    total: number;
    growth: number;
  };
  comments: {
    total: number;
    growth: number;
  };
  visits: {
    total: number;
    growth: number;
  };
}

// 系统信息类型
export interface SystemInfo {
  language: string;
  version: string;
  webServer: string;
  domain: string;
  ip: string;
  userAgent: string;
  database: {
    type: string;
    version: string;
  };
  php?: {
    version: string;
    extensions: string[];
  };
}

// 请求参数类型
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface CreateArticleRequest {
  title: string;
  subtitle?: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  categoryId: number;
  tagIds: number[];
  status: 'published' | 'draft';
  isOriginal: boolean;
  publishedAt?: string;
}

export interface CreateDiscussionRequest {
  title: string;
  content: string;
  tagIds: number[];
  status: 'active' | 'inactive';
}

export interface CreateCommentRequest {
  content: string;
  articleId?: number;
  discussionId?: number;
  parentId?: number;
}

export interface CreateTagRequest {
  name: string;
  title?: string;
  description?: string;
  color?: string;
}

export interface CreateCategoryRequest {
  name: string;
  path: string;
  description?: string;
}

export interface CreateFriendLinkRequest {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  status: 'active' | 'inactive';
  sortOrder?: number;
}

// 查询参数类型
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SearchParams extends PaginationParams {
  search?: string;
}

export interface ArticleQueryParams extends SearchParams {
  category?: string;
  tag?: string;
  status?: 'published' | 'draft';
}

export interface DiscussionQueryParams extends SearchParams {
  tag?: string;
  status?: 'active' | 'inactive';
}

export interface CommentQueryParams extends SearchParams {
  articleId?: number;
  discussionId?: number;
  status?: 'approved' | 'pending' | 'rejected';
}

export interface FileQueryParams extends SearchParams {
  path?: string;
  type?: 'file' | 'folder';
}

export interface VisitQueryParams extends SearchParams {
  startDate?: string;
  endDate?: string;
}