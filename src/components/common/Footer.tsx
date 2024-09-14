import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.upperFooter}>
        <div className={styles.footerContent}>
          <div className={styles.socialLinks}>
            <a href="/" aria-label="Home">🏠</a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>
      <div className={styles.lowerFooter}>
        <div className={styles.footerContent}>
          <div className={styles.copyright}>
            © 2023 voocel. All rights reserved.
          </div>
          <div className={styles.links}>
            <Link to="/">友情链接</Link>
            <Link to="/">关于我们</Link>
            <Link to="/">隐私政策</Link>
          </div>
          <div className={styles.icp}>
            备案号: 闽ICP备20220073143-1
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
