import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { getVisits } from '../../services/visits';
import { Visit } from '../../types/visit';
import styles from '../../styles/VisitList.module.css';
import { TablePaginationConfig } from 'antd/es/table';

const VisitList: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchVisits();
  }, [pagination.current, pagination.pageSize]);

  const fetchVisits = async () => {
    setLoading(true);
    try {
      const { data, total } = await getVisits(pagination.current || 1, pagination.pageSize || 10);
      setVisits(data);
      setPagination(prev => ({ ...prev, total }));
    } catch (error) {
      message.error('获取访问记录失败');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '文章标题',
      dataIndex: 'articleTitle',
      key: 'articleTitle',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '点击次数',
      dataIndex: 'clickCount',
      key: 'clickCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div className={styles.visitList}>
      <h1>访问列表</h1>
      <Table
        columns={columns}
        dataSource={visits}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={(newPagination: TablePaginationConfig) => {
          setPagination({
            current: newPagination.current || 1,
            pageSize: newPagination.pageSize || 10,
            total: pagination.total, // 保持总数不变，因为它通常来自服务器响应
          });
        }}
      />
    </div>
  );
};

export default VisitList;
