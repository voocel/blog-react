import { Moment } from 'moment';

export interface Article {
  id: number;
  title: string;
  content: string;
  tags: string[];
  author: string;
  coverImage?: string;
  published: boolean;
  publishTime: string | Date; // 或者使用 Date 类型
  isDraft: boolean;
  isPublic: boolean;
  description: string;
  summary: string;
  category: {
    id: number;
    name: string;
  };
  // 其他可能的属性...
}

// 如果你需要在表单中使用的类型
export interface ArticleFormValues extends Omit<Article, 'publishTime'> {
  publishTime: Moment | null;
}
