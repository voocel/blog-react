export const generateSitemap = (articles: any[], discussions: any[]) => {
  const baseUrl = 'https://voocel.com';
  const currentDate = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/articles</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/discussions</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

  // 添加文章页面
  articles.forEach(article => {
    sitemap += `
  <url>
    <loc>${baseUrl}/articles/${article.id}</loc>
    <lastmod>${article.updatedAt || article.createdAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // 添加讨论页面
  discussions.forEach(discussion => {
    sitemap += `
  <url>
    <loc>${baseUrl}/discussions/${discussion.id}</loc>
    <lastmod>${discussion.updatedAt || discussion.createdAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  sitemap += '\n</urlset>';
  return sitemap;
};