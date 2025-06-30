import React, { useState } from 'react';

interface VisitorRecord {
  id: number;
  title: string;
  ip: string;
  visitCount: number;
  createdAt: string;
}

const VisitorStatistics: React.FC = () => {
  const [visitors] = useState<VisitorRecord[]>([
    {
      id: 31601,
      title: 'Golang 中的 gRPC 入门指南',
      ip: '165.191.171.5',
      visitCount: 1,
      createdAt: '2024-09-12 23:52:06'
    },
    {
      id: 31600,
      title: '免费https证书生成',
      ip: '165.191.171.7',
      visitCount: 1,
      createdAt: '2024-09-12 23:48:18'
    },
    {
      id: 31599,
      title: 'Golang实现硬编码',
      ip: '220.243.191.67',
      visitCount: 1,
      createdAt: '2024-09-12 23:11:42'
    },
    {
      id: 31598,
      title: 'Golang实现硬编码',
      ip: '39.129.5.11',
      visitCount: 1,
      createdAt: '2024-09-12 23:11:38'
    },
    {
      id: 31597,
      title: 'Golang实现硬编码',
      ip: '14.145.220.128',
      visitCount: 2,
      createdAt: '2024-09-12 19:57:11'
    },
    {
      id: 31596,
      title: 'Gin中的中实现',
      ip: '178.156.129.165',
      visitCount: 1,
      createdAt: '2024-09-12 19:33:08'
    },
    {
      id: 31595,
      title: 'Protobuf硬编码系列(一)',
      ip: '66.249.79.131',
      visitCount: 1,
      createdAt: '2024-09-12 18:37:46'
    },
    {
      id: 31594,
      title: 'OpenAI的ChatGPT人工智能',
      ip: '66.208.96.193',
      visitCount: 1,
      createdAt: '2024-09-12 17:12:16'
    },
    {
      id: 31593,
      title: 'MySQL数据库定时归档的几种Nginx日志切割',
      ip: '66.249.79.132',
      visitCount: 1,
      createdAt: '2024-09-12 11:07:46'
    },
    {
      id: 31592,
      title: 'Golang prometheus metrics',
      ip: '134.122.63.29',
      visitCount: 1,
      createdAt: '2024-09-12 10:43:16'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-900">访问列表</h2>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">文章标题</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">点击次数</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">创建时间</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visitors.map((visitor) => (
              <tr key={visitor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visitor.id}
                </td>
                <td className="px-6 py-4 text-sm text-blue-600">
                  <div className="max-w-md">
                    {visitor.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visitor.ip}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {visitor.visitCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {visitor.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        <button className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          ←
        </button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-slate-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          →
        </button>
      </div>
    </div>
  );
};

export default VisitorStatistics;