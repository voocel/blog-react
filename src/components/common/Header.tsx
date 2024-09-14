import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logo}>voocel</div>
        <nav className={styles.nav}>
          <Link to="/">文章</Link>
          <Link to="/tags">标签</Link>
          {/* 添加其他导航链接 */}
        </nav>
        <div className={styles.userActions}>
          {/* 添加用户头像和操作按钮 */}
        </div>
      </div>
      <div className={styles.headerBanner}>
        <h2>Nothing is impossible.</h2>
        <p>https://voocel.com</p>
      </div>
    </header>
  );
};

export default Header;
