import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import UserManagement from '../pages/admin/UserManagement';
import ArticleManagement from '../pages/admin/ArticleManagement';
import CommentManagement from '../pages/admin/CommentManagement';
import FileManagement from '../pages/admin/FileManagement';
import TagManagement from '../pages/admin/TagManagement';
import CategoryManagement from '../pages/admin/CategoryManagement';
import LinkManagement from '../pages/admin/LinkManagement';
import SystemSettings from '../pages/admin/SystemSettings';
import CreateUser from '../pages/admin/CreateUser';
import ArticleForm from '../pages/admin/ArticleForm';
import CreateTag from '../pages/admin/CreateTag'; 
import CreateLink from '../pages/admin/CreateLink';
import CreateCategory from '../pages/admin/CreateCategory';

export const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="users" element={<UserManagement />} />
    <Route path="users/create" element={<CreateUser />} />
    <Route path="articles" element={<ArticleManagement />} />
    <Route path="articles/create" element={<ArticleForm />} />
    <Route path="articles/edit/:id" element={<ArticleForm />} />
    <Route path="comments" element={<CommentManagement />} />
    <Route path="files" element={<FileManagement />} />
    <Route path="tags" element={<TagManagement />} />
    <Route path="tags/create" element={<CreateTag />} />
    <Route path="categories" element={<CategoryManagement />} />
    <Route path="categories/create" element={<CreateCategory />} />
    <Route path="links" element={<LinkManagement />} />
    <Route path="links/create" element={<CreateLink />} />
    <Route path="settings" element={<SystemSettings />} />
  </Route>
);
