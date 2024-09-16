import api from './api';
import { Category } from '../types/category';

interface CategoriesResponse {
  data: Category[];
  total: number;
}

interface CategoryResponse {
  data: Category;
}

export const getCategories = (page = 1, pageSize = 10) => {
  return api.get<CategoriesResponse>('/categories', { params: { page, pageSize } });
};

export const createCategory = async (category: Partial<Category>): Promise<Category> => {
  const response = await api.post<CategoryResponse>('/categories', category);
  return response.data;
};

export const updateCategory = async (id: number, category: Partial<Category>): Promise<Category> => {
  const response = await api.put<CategoryResponse>(`/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};

export const getCategory = async (id: number): Promise<Category> => {
  const response = await api.get<CategoryResponse>(`/categories/${id}`);
  return response.data;
};
