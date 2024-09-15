import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // 登录成功后重定向到首页
    } catch (error) {
      console.error('登录失败:', error);
      alert('登录失败，请检查您的邮箱和密码');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.authWrapper}>
        <div className={styles.authContainer}>
          <h2 className={styles.authTitle}>登录</h2>
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">邮箱地址</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">密码</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                required
              />
            </div>
            <div className={styles.rememberMe}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">记住我</label>
            </div>
            <button type="submit" className={styles.submitButton}>登录</button>
          </form>
          <div className={styles.forgotPassword}>
            <Link to="/forgot-password">忘记密码?</Link>
          </div>
          <div className={styles.switchAuth}>
            没有账号？ <Link to="/register">立即注册</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
