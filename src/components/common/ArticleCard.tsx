import React from 'react';
import { Clock, Eye, User } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  timeAgo: string;
  views?: string;
  author?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  image,
  tags,
  timeAgo,
  views,
  author
}) => {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden mb-6">
      <div className="flex">
        {/* Image */}
        <div className="w-48 h-32 flex-shrink-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-medium text-gray-600 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
              {title}
            </h2>
            
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {description}
            </p>

            <div className="flex items-center space-x-1 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-3">
              {author && (
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span className="username">{author}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{timeAgo}</span>
              </div>
              {views && (
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{views}</span>
                </div>
              )}
            </div>
            
            <button className="read-more-button font-medium">
              Read More →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;