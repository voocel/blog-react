import React, { useState, useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { UserOutlined, EyeOutlined, FileTextOutlined, CommentOutlined } from '@ant-design/icons';
import { getDashboardStats, DashboardStats } from '../../services/dashboard';
import StatCard from '../../components/StatCard';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <h1>仪表板</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <StatCard title="用户数" value={stats?.userCount || 0} icon={<UserOutlined />} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard title="访问数" value={stats?.viewCount || 0} icon={<EyeOutlined />} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard title="文章数" value={stats?.articleCount || 0} icon={<FileTextOutlined />} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard title="评论数" value={stats?.commentCount || 0} icon={<CommentOutlined />} />
        </Col>
      </Row>
      {/* 可以添加更多的统计信息或图表 */}
    </div>
  );
};

export default Dashboard;
