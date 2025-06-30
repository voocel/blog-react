// API相关常量
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  ARTICLES: {
    LIST: '/articles',
    CREATE: '/articles',
    UPDATE: (id: string) => `/articles/${id}`,
    DELETE: (id: string) => `/articles/${id}`,
    DETAIL: (id: string) => `/articles/${id}`,
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
  COMMENTS: {
    LIST: '/comments',
    CREATE: '/comments',
    UPDATE: (id: string) => `/comments/${id}`,
    DELETE: (id: string) => `/comments/${id}`,
  },
} as const;

// 应用配置
export const APP_CONFIG = {
  NAME: 'Voocel Blog',
  VERSION: '1.0.0',
  DESCRIPTION: '一个现代化的博客管理系统',
  AUTHOR: 'Voocel',
  WEBSITE: 'https://voocel.com',
  GITHUB: 'https://github.com/voocel',
} as const;

// 分页配置
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// 文件上传配置
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_FILE_TYPES: ['application/pdf', 'text/plain', 'application/msword'],
} as const;

// 本地存储键名
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  UNAUTHORIZED: '登录已过期，请重新登录',
  FORBIDDEN: '没有权限访问该资源',
  NOT_FOUND: '请求的资源不存在',
  SERVER_ERROR: '服务器内部错误，请稍后重试',
  VALIDATION_ERROR: '输入数据格式不正确',
  UNKNOWN_ERROR: '发生未知错误，请稍后重试',
} as const;

// 成功消息
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '登录成功',
  REGISTER_SUCCESS: '注册成功',
  LOGOUT_SUCCESS: '退出成功',
  UPDATE_SUCCESS: '更新成功',
  CREATE_SUCCESS: '创建成功',
  DELETE_SUCCESS: '删除成功',
  UPLOAD_SUCCESS: '上传成功',
} as const;

// 路由路径
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ADMIN: '/admin',
  ARTICLES: '/articles',
  ARTICLE_DETAIL: (id: string) => `/articles/${id}`,
  ADMIN_USERS: '/admin/users',
  ADMIN_ARTICLES: '/admin/articles',
  ADMIN_COMMENTS: '/admin/comments',
} as const;