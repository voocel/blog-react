import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span>/</span>}
            {index === items.length - 1 ? (
              <span className="text-gray-900">{item.name}</span>
            ) : (
              <Link to={item.url} className="hover:text-blue-600">
                {item.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumb;