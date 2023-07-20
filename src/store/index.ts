import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/api/auth';
import userSlice from './userSlice';
import { userApi } from '@/services/api/user';

export const store = configureStore({
  reducer: {
    user: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authApi.middleware,
    userApi.middleware,
  ],
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
