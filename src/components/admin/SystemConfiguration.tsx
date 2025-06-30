import React, { useState } from 'react';
import { Settings, Database, Code } from 'lucide-react';

interface SystemInfo {
  language: string;
  version: string;
  webServer: string;
  domain: string;
  ip: string;
  userAgent: string;
}

const SystemConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('system');
  
  const [systemInfo] = useState<SystemInfo>({
    language: 'PHP',
    version: '',
    webServer: 'nginx/1.13.0',
    domain: 'voocel.com',
    ip: '101.207.195.9',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
  });

  const menuItems = [
    {
      id: 'system',
      icon: Settings,
      title: '系统',
      description: '系统基本信息'
    },
    {
      id: 'php',
      icon: Code,
      title: 'PHP',
      description: 'PHP配置信息'
    },
    {
      id: 'database',
      icon: Database,
      title: '数据库',
      description: '数据库配置'
    }
  ];

  const renderSystemInfo = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">系统</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100">
          <div className="col-span-3 text-sm font-medium text-gray-700">
            语言
          </div>
          <div className="col-span-9 text-sm text-gray-900">
            {systemInfo.language}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100">
          <div className="col-span-3 text-sm font-medium text-gray-700">
            版
          </div>
          <div className="col-span-9 text-sm text-gray-900">
            {systemInfo.version}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100">
          <div className="col-span-3 text-sm font-medium text-gray-700">
            网站服务器
          </div>
          <div className="col-span-9 text-sm text-gray-900">
            {systemInfo.webServer}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100">
          <div className="col-span-3 text-sm font-medium text-gray-700">
            域名
          </div>
          <div className="col-span-9 text-sm text-gray-900">
            {systemInfo.domain}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100">
          <div className="col-span-3 text-sm font-medium text-gray-700">
            IP
          </div>
          <div className="col-span-9 text-sm text-gray-900">
            {systemInfo.ip}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-start py-3">
          <div className="col-span-3 text-sm font-medium text-gray-700 pt-1">
            User Agent
          </div>
          <div className="col-span-9 text-sm text-gray-900 break-all">
            {systemInfo.userAgent}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'system':
        return renderSystemInfo();
      case 'php':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">PHP配置</h3>
            <p className="text-gray-600">PHP配置信息将在这里显示</p>
          </div>
        );
      case 'database':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">数据库配置</h3>
            <p className="text-gray-600">数据库配置信息将在这里显示</p>
          </div>
        );
      default:
        return renderSystemInfo();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-900">系统设置</h2>
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-gray-100 text-gray-900 border-r-2 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{item.title}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SystemConfiguration;