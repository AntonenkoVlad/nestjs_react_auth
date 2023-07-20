import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import AppHeader from './AppHeader';

const Container: FC = () => {
  const { data: userData } = useSelector((state: RootState) => state.user);

  if (!userData) return null;

  return (
    <>
      <AppHeader userId={userData.id} userName={userData.name} />
      <Outlet />
    </>
  );
};

export default Container;
