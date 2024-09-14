import React from 'react';
import BlogLayout from '../../layouts/BlogLayout';
import ArticleList from '../../components/blog/ArticleList';

const Home: React.FC = () => {
  return (
    <BlogLayout>
      <ArticleList />
    </BlogLayout>
  );
};

export default Home;
