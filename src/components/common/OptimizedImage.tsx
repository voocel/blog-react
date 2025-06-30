import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 生成不同尺寸的图片URL（如果使用CDN）
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [400, 800, 1200, 1600];
    return sizes.map(size => `${baseSrc}?w=${size} ${size}w`).join(', ');
  };

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      
      <img
        src={src}
        srcSet={generateSrcSet(src)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
      
      {hasError && (
        <div 
          className="flex items-center justify-center bg-gray-100 text-gray-500"
          style={{ width, height }}
        >
          图片加载失败
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;