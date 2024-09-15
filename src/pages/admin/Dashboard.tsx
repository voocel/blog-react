import React from 'react';
import { Row, Col, Card } from 'antd';
import { UserOutlined, EyeOutlined, FileTextOutlined, CommentOutlined } from '@ant-design/icons';
import styles from '../../styles/Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.noticeBar}>
        Notice For Everyone.
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
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: number }> = ({ icon, title, value }) => (
  <Card className={styles.statCard}>
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statInfo}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statTitle}>{title}</div>
    </div>
    <div className={styles.statBadge}>全部</div>
  </Card>
);

export default Dashboard;
