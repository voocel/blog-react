import React, { useState, useEffect } from 'react';
import { Card, Descriptions, message, Spin } from 'antd';
import { getSystemInfo, SystemInfo } from '../../services/system';
import styles from '../../styles/SystemSettings.module.css';

const SystemSettings: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const info = await getSystemInfo();
        setSystemInfo(info);
      } catch (error) {
        message.error('获取系统信息失败');
      } finally {
        setLoading(false);
      }
    };

    fetchSystemInfo();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className={styles.systemSettings}>
      <h1>系统设置</h1>
      <Card title="系统信息" className={styles.card}>
        <Descriptions column={1}>
          <Descriptions.Item label="PHP 版本">{systemInfo?.php}</Descriptions.Item>
          <Descriptions.Item label="网站服务器">{systemInfo?.webServer}</Descriptions.Item>
          <Descriptions.Item label="域名">{systemInfo?.domain}</Descriptions.Item>
          <Descriptions.Item label="IP 地址">{systemInfo?.ip}</Descriptions.Item>
          <Descriptions.Item label="User Agent">{systemInfo?.userAgent}</Descriptions.Item>
          <Descriptions.Item label="操作系统">{systemInfo?.platform}</Descriptions.Item>
          <Descriptions.Item label="Node.js 版本">{systemInfo?.nodeVersion}</Descriptions.Item>
          <Descriptions.Item label="CPU 使用率">{systemInfo?.cpuUsage}%</Descriptions.Item>
          <Descriptions.Item label="内存使用">
            已用: {systemInfo?.memoryUsage.used} MB / 
            总计: {systemInfo?.memoryUsage.total} MB
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default SystemSettings;
