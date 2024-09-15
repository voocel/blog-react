import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/Dashboard.module.css';
import StatCard from '../../components/StatCard';
import Sidebar from '../../components/common/Sidebar';
import { getDashboardStats, DashboardStats } from '../../services/dashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    userCount: 0,
    totalArticles: 0,
    totalComments: 0,
    totalViews: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <button className={styles.menuButton}>☰</button>
          <div className={styles.userInfo}>
            <img src={user?.avatar} alt={user?.username} className={styles.avatar} />
            <span>{user?.username}</span>
          </div>
        </header>
        <div className={styles.noticeBar}>
          <span>Notice For Everyone.</span>
          <button className={styles.editButton}>编辑</button>
        </div>
        <div className={styles.statsContainer}>
          <StatCard title="用户数" value={stats.userCount} icon="👥" />
          <StatCard title="访问数" value={stats.totalViews} icon="👁️" />
          <StatCard title="文章数" value={stats.totalArticles} icon="📄" />
          <StatCard title="评论数" value={stats.totalComments} icon="💬" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
