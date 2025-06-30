declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const initGA = (trackingId: string) => {
  // 如果已经初始化过，直接返回
  if (window.gtag) {
    return;
  }

  // 创建 dataLayer
  window.dataLayer = window.dataLayer || [];

  // 加载 Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // 初始化 gtag 函数
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // 配置 Google Analytics
  window.gtag('js', new Date());
  window.gtag('config', trackingId, {
    page_title: document.title,
    page_location: window.location.href,
    // 启用增强型电子商务
    send_page_view: false // 我们手动发送页面浏览
  });

  console.log('Google Analytics 初始化成功:', trackingId);
};

export const trackPageView = (path: string, title?: string) => {
  if (window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.origin + path
    });
    
    // 发送页面浏览事件
    window.gtag('event', 'page_view', {
      page_title: title || document.title,
      page_location: window.location.origin + path,
      page_path: path
    });
  }
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// 跟踪文章阅读
export const trackArticleView = (articleId: string, articleTitle: string) => {
  trackEvent('view_article', 'engagement', articleTitle);
  
  // 自定义事件
  if (window.gtag) {
    window.gtag('event', 'article_view', {
      article_id: articleId,
      article_title: articleTitle,
      content_type: 'article'
    });
  }
};

// 跟踪搜索
export const trackSearch = (searchTerm: string, resultCount?: number) => {
  if (window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      result_count: resultCount
    });
  }
};

// 跟踪用户注册
export const trackUserRegistration = (method: string = 'email') => {
  if (window.gtag) {
    window.gtag('event', 'sign_up', {
      method: method
    });
  }
};

// 跟踪用户登录
export const trackUserLogin = (method: string = 'email') => {
  if (window.gtag) {
    window.gtag('event', 'login', {
      method: method
    });
  }
};

// 跟踪文件下载
export const trackFileDownload = (fileName: string, fileType: string) => {
  if (window.gtag) {
    window.gtag('event', 'file_download', {
      file_name: fileName,
      file_type: fileType
    });
  }
};

// 跟踪外部链接点击
export const trackExternalLink = (url: string, linkText?: string) => {
  if (window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'external_link',
      event_label: url,
      link_text: linkText
    });
  }
};

// 跟踪错误
export const trackError = (errorMessage: string, errorType: string = 'javascript') => {
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: errorMessage,
      fatal: false,
      error_type: errorType
    });
  }
};

// 跟踪用户互动时间
export const trackEngagement = (engagementTime: number, page: string) => {
  if (window.gtag) {
    window.gtag('event', 'user_engagement', {
      engagement_time_msec: engagementTime,
      page_title: page
    });
  }
};