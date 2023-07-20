import { createApi } from '@reduxjs/toolkit/query/react';

import { LoginDto, AuthEntity, ResetPasswordDto } from '../openapi';
import { getBaseQuery } from './utils';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: getBaseQuery('auth'),
  endpoints: (builder) => ({
    login: builder.mutation<AuthEntity, LoginDto>({
      query: (dto) => ({
        url: 'login',
        method: 'POST',
        body: dto,
      }),
    }),
    logout: builder.mutation<boolean, string>({
      query: (userId) => ({
        url: 'logout',
        method: 'POST',
        body: { userId },
      }),
    }),
    forgotPassword: builder.query<boolean, string>({
      query: (email) => `/forgot-password/${email}`,
    }),
    resetPassword: builder.mutation<boolean, ResetPasswordDto>({
      query: (dto) => ({
        url: 'reset-password',
        method: 'POST',
        body: { ...dto },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useLazyForgotPasswordQuery,
} = authApi;
