export interface UserState {
  authenticated: boolean;
  data: {
    id: string;
    email: string;
    role: string;
    name: string;
    accessToken: string;
    refreshToken: string;
    emailVerified: boolean;
  };
}
