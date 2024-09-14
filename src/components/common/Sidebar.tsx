import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';

const Sidebar: React.FC = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<FileTextOutlined />}>
        <Link to="/articles">文章列表</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        <Link to="/about">关于我们</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
