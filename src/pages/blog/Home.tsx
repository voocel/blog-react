import React from 'react';
import ArticleList from '../../components/blog/ArticleList';
import styles from '../../styles/Blog.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.homeContent}>
      <ArticleList />
    </div>
  );
};

export default Home;
