import { createApi } from '@reduxjs/toolkit/query/react';

import { UserEntity } from '../openapi';
import { getBaseQuery } from './utils';
import { setUser } from '@/store/userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: getBaseQuery('users'),
  endpoints: (builder) => ({
    getUser: builder.query<UserEntity, null>({
      query: () => `/getUser`,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          console.log(_args);
          const { data } = await queryFulfilled;
          dispatch(
            setUser({
              authenticated: true,
              data: {
                id: data.id,
                email: data.email,
                role: data.role,
                name: data.name,
                emailVerified: data.emailVerified,
                refreshToken: data.refreshToken,
                accessToken: localStorage.getItem('accessToken') || '',
              },
            }),
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getUserById: builder.query<UserEntity, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetUserByIdQuery, useGetUserQuery } = userApi;
