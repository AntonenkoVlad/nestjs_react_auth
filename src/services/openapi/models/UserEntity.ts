/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserEntity = {
  id: string;
  name: string;
  email: string;
  refreshToken: string;
  role: UserEntity.role;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export namespace UserEntity {

  export enum role {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }


}

