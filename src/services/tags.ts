import api from './api';
import { Tag } from '../types/tag';

interface TagsResponse {
  data: Tag[];
  total: number;
}

export const getTags = async (page: number, pageSize: number): Promise<TagsResponse> => {
  return api.get<TagsResponse>('/tags', { params: { page, pageSize } });
};

export const createTag = async (tag: Partial<Tag>): Promise<Tag> => {
  return api.post<Tag>('/tags', tag);
};

export const updateTag = async (id: number, tag: Partial<Tag>): Promise<Tag> => {
  return api.put<Tag>(`/tags/${id}`, tag);
};

export const deleteTag = async (id: number): Promise<void> => {
  await api.delete(`/tags/${id}`);
};

export const getTag = async (id: number): Promise<Tag> => {
  return api.get<Tag>(`/tags/${id}`);
};
