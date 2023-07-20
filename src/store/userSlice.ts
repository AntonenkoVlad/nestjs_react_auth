import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    authenticated: false,
    data: {},
  } as UserState,
  reducers: {
    setUser(state: UserState, { payload: { data } }: PayloadAction<UserState>) {
      state.authenticated = true;
      state.data = {
        id: data.id,
        role: data.role,
        email: data.email,
        name: data.name,
        refreshToken: data.refreshToken,
        accessToken: '123',
        emailVerified: data.emailVerified,
      };
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
