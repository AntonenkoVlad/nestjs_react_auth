import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from './services/api/user';

import { isFetchBaseQueryError } from '@/services/api/utils';
import { RootState } from '@/store';

type Props = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { data: userData } = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem('accessToken');

  const { data, error } = useGetUserQuery(null, { skip: !token });

  React.useEffect(() => {
    if (data) {
      navigate('/');
    }

    if (isFetchBaseQueryError(error) && error.statusCode === 401) {
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  }, [data, userData, navigate, error]);

  return <>{children}</>;
};

export default AuthWrapper;
