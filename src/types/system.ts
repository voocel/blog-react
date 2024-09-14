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
  // ... 其他系统信息
}
