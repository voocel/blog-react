import api from './api';
import { Visit } from '../types/visit';

interface VisitsResponse {
  data: Visit[];
  total: number;
}

export const getVisits = async (page: number, pageSize: number): Promise<VisitsResponse> => {
  return api.get<VisitsResponse>('/visits', { params: { page, pageSize } });
};
