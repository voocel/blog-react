import React from 'react';
import { Form, Input, Button } from 'antd'; // 假设你使用 Ant Design
import { User } from '../../types/user'; // 导入 User 类型，如果你有定义的话

interface UserFormProps {
  initialValues?: User;
  onSubmit: (values: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: User) => {
    onSubmit(values);
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      {/* 添加其他表单项，如密码、角色等 */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
