/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEntity } from './UserEntity';

export type AuthEntity = {
  user: UserEntity;
  accessToken: string;
  refreshToken: string;
};

