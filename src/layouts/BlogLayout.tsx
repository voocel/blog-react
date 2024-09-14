import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from '../styles/Blog.module.css';

const BlogLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default BlogLayout;
