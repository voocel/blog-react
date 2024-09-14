import { Article } from '../types/article';
import api from './api';

// 获取文章列表
export const getArticles = async (page: number, pageSize: number): Promise<{ data: Article[], total: number }> => {
  const response = await api.get<{ data: Article[], total: number }>('/articles', { params: { page, pageSize } });
  return response;
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
  page: number = 1, 
  pageSize: number = 10
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
  page: number = 1, 
  pageSize: number = 10
): Promise<{ data: Article[], total: number }> => {
  const response = await api.get<{ data: Article[], total: number }>(
    '/articles', 
    { params: { tag, page, pageSize } }
  );
  return response;
};
