import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getBaseQuery = (endpoint: string) =>
  fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_ENDPOINT}/${endpoint}`,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('accessToken')}`,
      );

      return headers;
    },
  });

export const isFetchBaseQueryError = (
  error: unknown,
): error is { statusCode: number; data: { message: string } } => {
  return typeof error === 'object' && error != null && 'status' in error;
};

export const isErrorWithMessage = (
  error: any,
): error is { statusCode: number; data: { message: string } } => {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    'message' in error.data &&
    typeof (error as any).data.message === 'string'
  );
};
