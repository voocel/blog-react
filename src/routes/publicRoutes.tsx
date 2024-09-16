import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/blog/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

export const publicRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
];
