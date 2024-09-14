import api from './api';
import { LinkItem } from '../types/link';

interface LinksResponse {
  data: LinkItem[];
  total: number;
}

export const getLinks = async (page: number, pageSize: number): Promise<LinksResponse> => {
  return api.get<LinksResponse>('/links', { params: { page, pageSize } });
};

export const createLink = async (linkData: Partial<LinkItem>): Promise<LinkItem> => {
  return api.post<LinkItem>('/links', linkData);
};

export const updateLink = async (id: number, linkData: Partial<LinkItem>): Promise<LinkItem> => {
  return api.put<LinkItem>(`/links/${id}`, linkData);
};

export const deleteLink = async (id: number): Promise<void> => {
  await api.delete(`/links/${id}`);
};

export const getLinkById = async (id: number): Promise<LinkItem> => {
  return api.get<LinkItem>(`/links/${id}`);
};
