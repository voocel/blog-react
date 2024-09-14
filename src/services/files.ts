import api from './api';
import { File } from '../types/file';

export const getFiles = async (): Promise<File[]> => {
  return api.get<File[]>('/files');
};

export const deleteFile = async (id: number): Promise<void> => {
  await api.delete(`/files/${id}`);
};

export const createFolder = async (name: string): Promise<File> => {
  return api.post<File>('/files/folder', { name });
};

export const uploadFile = async (file: FormData): Promise<File> => {
  return api.post<File>('/files/upload', file, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
