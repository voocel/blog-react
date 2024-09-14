import { Article } from '../types/article';
import api from './api';

// 获取文章列表


const mockArticles: Article[] = [
  {
    id: 1,
    title: "ComfyUI入门指南",
    summary: "ComfyUI使用教程",
    image: "https://via.placeholder.com/150",
    content: '',
    tags: [],
    author: '',
    published: false,
    publishTime: '',
    isDraft: false,
    isPublic: false,
    description: '',
    category: {
      id: 0,
      name: ''
    }
  },
  {
    id: 2,
    title: "如何使用llama本地部署大语言模型",
    summary: "Llama 2 本地部署教程",
    image: "https://via.placeholder.com/150",
    content: '',
    tags: [],
    author: '',
    published: false,
    publishTime: '',
    isDraft: false,
    isPublic: false,
    description: '',
    category: {
      id: 0,
      name: ''
    }
  },
  // 添加更多模拟文章...
];

interface ArticlesResponse {
  data: Article[];
  total: number;
}

// 移除参数的类型注解，让 TypeScript 自动推断
export const getArticles = async (page = 1, pageSize = 10): Promise<ArticlesResponse> => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = mockArticles.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: mockArticles.length
  };
};

// 创建新文章
export const createArticle = async (articleData: Omit<Article, 'id'>): Promise<Article> => {
  const response = await api.post<Article>('/articles', articleData);
  return response;
};

// 更新文章
export const updateArticle = async (id: number, articleData: Partial<Article>): Promise<Article> => {
  const response = await api.put<Article>(`/articles/${id}`, articleData);
  return response;
};

// 删除文章
export const deleteArticle = async (id: number): Promise<void> => {
  await api.delete(`/articles/${id}`);
};

// 获取单篇文章详情
export const getArticle = async (id: number): Promise<Article> => {
  const response = await api.get<Article>(`/articles/${id}`);
  return response;
};

// 根据分类获取文章
export const getArticlesByCategory = async (
  categoryId: number, 
  page = 1,
  pageSize = 10
): Promise<{ data: Article[], total: number }> => {
  const response = await api.get<{ data: Article[], total: number }>(
    '/articles', 
    { params: { categoryId, page, pageSize } }
  );
  return response;
};

// 根据标签获取文章
export const getArticlesByTag = async (
  tag: string, 
  page = 1,
  pageSize = 10
): Promise<{ data: Article[], total: number }> => {
  const response = await api.get<{ data: Article[], total: number }>(
    '/articles', 
    { params: { tag, page, pageSize } }
  );
  return response;
};
