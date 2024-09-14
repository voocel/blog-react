import React from 'react';
import { Card, Statistic } from 'antd';
import { StatisticProps } from 'antd/es/statistic/Statistic';

interface StatCardProps extends Omit<StatisticProps, 'title'> {
  title: React.ReactNode;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, ...rest }) => (
  <Card>
    <Statistic
      title={
        <span>
          {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
          {title}
        </span>
      }
      value={value}
      {...rest}
    />
  </Card>
);

export default StatCard;
