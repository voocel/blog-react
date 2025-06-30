import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Voocel Blog - 技术分享与交流平台',
  description = 'Voocel Blog是一个专注于技术分享的博客平台，涵盖前端开发、后端技术、人工智能、DevOps等领域的优质内容。',
  keywords = 'Voocel, 博客, 技术分享, 前端开发, React, TypeScript, Go, AI, 人工智能',
  image = 'https://voocel.com/og-image.jpg',
  url = 'https://voocel.com',
  type = 'website',
  author = 'voocel',
  publishedTime,
  modifiedTime,
  tags = []
}) => {
  const fullTitle = title.includes('Voocel Blog') ? title : `${title} - Voocel Blog`;
  
  return (
    <Helmet>
      {/* 基础Meta标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Voocel Blog" />
      <meta property="og:locale" content="zh_CN" />
      
      {/* Twitter Card标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@voocel" />
      <meta name="twitter:site" content="@voocel" />
      
      {/* 文章特定标签 */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* 移动端优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* 搜索引擎指令 */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* 网站验证 */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="baidu-site-verification" content="your-baidu-verification-code" />
      
      {/* 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'WebSite',
          "name": fullTitle,
          "description": description,
          "url": url,
          "image": image,
          ...(type === 'article' && {
            "author": {
              "@type": "Person",
              "name": author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Voocel Blog",
              "logo": {
                "@type": "ImageObject",
                "url": "https://voocel.com/logo.png"
              }
            },
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime
          })
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;