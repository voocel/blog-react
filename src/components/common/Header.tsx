import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          <Link to="/" className={styles.logo}>voocel</Link>
          <div className={styles.navLinks}>
            <Link to="/articles">文章</Link>
            <Link to="/tags">讨论</Link>
          </div>
          <div className={styles.userActions}>
            <input type="search" placeholder="搜索..." className={styles.searchInput} />
            <Link to="/login" className={styles.loginButton}>登录</Link>
            <Link to="/register" className={styles.registerButton}>注册</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
