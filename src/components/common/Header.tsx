import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/Header.module.css';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  console.log('Current user:', user);  // 添加这行来调试

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link to="/">voocel</Link>
        </div>
        <nav className={styles.nav}>
          <Link to="/">文章</Link>
          <Link to="/discuss">讨论</Link>
        </nav>
        <div className={styles.auth}>
          {isAuthenticated && user ? (
            <div className={styles.userMenu}>
              <div className={styles.userInfo} onClick={toggleDropdown}>
                <span className={styles.username}>{user.username}</span>
                <span className={`${styles.dropdownArrow} ${dropdownOpen ? styles.open : ''}`}>▼</span>
                <img src={user.avatar} alt={user.username} className={styles.avatar} />
              </div>
              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <Link to="/profile">个人中心</Link>
                  <Link to="/settings">个人设置</Link>
                  <Link to="/drafts">草稿箱</Link>
                  {user && user.role === 1 && (  // 确保这里的条件正确
                    <>
                      <Link to="/admin">面板</Link>
                      <div className={styles.divider}></div>
                    </>
                  )}
                  <button onClick={logout}>退出</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={styles.loginButton}>登录</Link>
              <Link to="/register" className={styles.registerButton}>注册</Link>
            </>
          )}
        </div>
      </div>
      <div className={styles.slogan}>
        <p>Nothing is impossible.</p>
        <p>https://voocel.com</p>
      </div>
    </header>
  );
};

export default Header;
