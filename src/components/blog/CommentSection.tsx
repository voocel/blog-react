import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List, Comment as AntComment, Avatar } from 'antd';
import { getArticleComments, createComment } from '../../services/comments';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/CommentSection.module.css';
import { Comment } from '../../types/comment';

const { TextArea } = Input;

interface CommentSectionProps {
  articleId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const fetchedComments = await getArticleComments(articleId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleSubmit = async (values: { content: string }) => {
    if (!user) return;
    setSubmitting(true);
    try {
      const newComment = await createComment(articleId, {
        content: values.content,
        userId: user.id,
        author: user.username,
        createdAt: new Date().toISOString(),
      });
      setComments([newComment, ...comments]);
      form.resetFields();
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.commentSection}>
      <h2>评论</h2>
      {user ? (
        <Form className={styles.commentForm} form={form} onFinish={handleSubmit}>
          <Form.Item name="content" rules={[{ required: true, message: '请输入评论内容' }]}>
            <TextArea rows={4} placeholder="写下你的评论..." />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={submitting} type="primary">
              提交评论
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>请登录后发表评论</p>
      )}
      <List
        className={styles.commentList}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => (
          <li className={styles.commentItem}>
            <AntComment
              author={<span className={styles.commentAuthor}>{comment.author}</span>}
              avatar={<Avatar src={comment.avatar} alt={comment.author} />}
              content={<p className={styles.commentContent}>{comment.content}</p>}
              datetime={<span className={styles.commentDate}>{new Date(comment.createdAt).toLocaleString()}</span>}
            />
          </li>
        )}
      />
    </div>
  );
};

export default CommentSection;
