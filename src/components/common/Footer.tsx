import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          © {currentYear} voocel. All rights reserved.
        </div>
        <div className={styles.links}>
          <Link to="/">首页</Link>
          <a href="https://github.com/voocel" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://twitter.com/voocel" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
