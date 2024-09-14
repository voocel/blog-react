import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Home from '../pages/blog/Home';
import ArticlePage from '../pages/blog/ArticlePage';
import CategoryPage from '../pages/blog/CategoryPage';
import TagPage from '../pages/blog/TagPage';

const BlogLayout: React.FC = () => {
  return (
    <div className="blog-layout">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/tag/:tagName" element={<TagPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default BlogLayout;
