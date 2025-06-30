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
  id: string;
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
  id: string;
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
    id: string;
    username: string;
    avatar: string;
  };
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// 讨论相关类型
export interface Discussion {
  id: string;
  title: string;
  content: string;
  status: 'active' | 'inactive';
  viewCount: number;
  replyCount: number;
  tags: Tag[];
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}

// 评论相关类型
export interface Comment {
  id: string;
  content: string;
  status: 'approved' | 'pending' | 'rejected';
  articleId?: string;
  discussionId?: string;
  parentId?: string;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

// 标签相关类型
export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  articleCount: number;
  createdAt: string;
  updatedAt: string;
}

// 分类相关类型
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  articleCount: number;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

// 友链相关类型
export interface FriendLink {
  id: string;
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
  id: string;
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
  id: string;
  articleId?: string;
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
  categoryId: string;
  tagIds: string[];
  status: 'published' | 'draft';
  isOriginal: boolean;
  publishedAt?: string;
}

export interface CreateDiscussionRequest {
  title: string;
  content: string;
  tagIds: string[];
  status: 'active' | 'inactive';
}

export interface CreateCommentRequest {
  content: string;
  articleId?: string;
  discussionId?: string;
  parentId?: string;
}

export interface CreateTagRequest {
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
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
  articleId?: string;
  discussionId?: string;
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