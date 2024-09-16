import api from './api';
import { LinkItem } from '../types/link';
import { message } from 'antd';

interface LinksResponse {
  data: LinkItem[];
  total: number;
}

export const getLinks = async (page: number, pageSize: number): Promise<LinksResponse> => {
  return api.get<LinksResponse>('/links', { params: { page, pageSize } });
};

export const createLink = async (linkData: Partial<LinkItem>): Promise<void> => {
  // 这里应该是实际的 API 调用
  // 现在我们只是模拟一个成功的响应
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('创建的友链数据:', linkData);
      message.success('友链创建成功');
      resolve();
    }, 1000);
  });
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
