import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';

import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import SignUpPage from './pages/auth/SignUpPage';
import LoginPage from './pages/auth/LoginPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/404';

import Container from './components/Container';

const Routes: React.FC = () => {
  return (
    <ReactRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route path="/" element={<Container />}>
        <Route path="/" element={<MainPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </ReactRoutes>
  );
};

export default Routes;
