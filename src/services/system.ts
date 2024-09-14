import api from './api';

export interface SystemInfo {
  version: string;
  nodeVersion: string;
  platform: string;
  cpuUsage: number;
  memoryUsage: {
    total: number;
    used: number;
    free: number;
  };
  php: string;
  webServer: string;
  domain: string;
  ip: string;
  userAgent: string;
  // ... 其他系统信息
}

export const getSystemInfo = async (): Promise<SystemInfo> => {
  return api.get<SystemInfo>('/system-info');
};
