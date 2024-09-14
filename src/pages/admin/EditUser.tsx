import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Avatar } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../services/users';
import styles from '../../styles/EditUser.module.css';

const EditUser: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        message.error('无效的用户 ID');
        setLoading(false);
        return;
      }

      try {
        const userId = parseInt(id);
        if (isNaN(userId)) {
          message.error('无效的用户 ID');
          setLoading(false);
          return;
        }

        const user = await getUser(userId);
        form.setFieldsValue({
          username: user.username,
          email: user.email,
        });
        setAvatarUrl(user.avatarUrl);
        setLoading(false);
      } catch (error) {
        message.error('获取用户信息失败');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, form]);

  const onFinish = async (values: any) => {
    if (!id) {
      message.error('无效的用户 ID');
      return;
    }

    try {
      const userId = parseInt(id);
      if (isNaN(userId)) {
        message.error('无效的用户 ID');
        return;
      }

      await updateUser(userId, values);
      message.success('用户信息更新成功');
      navigate('/admin/users');
    } catch (error) {
      message.error('更新用户信息失败');
    }
  };

  return (
    <div className={styles.editUserContainer}>
      <h1>编辑用户</h1>
      <Avatar size={64} src={avatarUrl} />
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
