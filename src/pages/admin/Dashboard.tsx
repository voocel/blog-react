import React from 'react';
import { Row, Col, Card } from 'antd';
import { UserOutlined, EyeOutlined, FileTextOutlined, CommentOutlined, MenuOutlined } from '@ant-design/icons';
import { useSidebar } from '../../contexts/SidebarContext';
import styles from '../../styles/Dashboard.module.css';

const Dashboard: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <MenuOutlined className={styles.menuIcon} onClick={toggleSidebar} />
      </header>
      <div className={styles.content}>
        <div className={styles.noticeBar}>
          <span>Notice For Everyone.</span>
          <span className={styles.admin}>管理员</span>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <StatCard icon={<UserOutlined />} title="用户数" value={4670} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatCard icon={<EyeOutlined />} title="访问数" value={61329} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatCard icon={<FileTextOutlined />} title="文章数" value={31} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatCard icon={<CommentOutlined />} title="评论数" value={2} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <Card className={styles.statCard}>
    <div className={styles.statHeader}>{title}</div>
    <div className={styles.statContent}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
    <div className={styles.statBadge}>全部</div>
  </Card>
);

export default Dashboard;
