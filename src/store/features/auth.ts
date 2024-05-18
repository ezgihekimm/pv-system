import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DecodedToken = {
  API_TIME: number;
  customer_id: string;
  name: string;
  surname: string;
  turID?: string;
  uid: string;
  username: string;
};

type User = {
  token?: string;
  user?: DecodedToken;
};

const initialState = {
  token: undefined,
  decodedToken: undefined,
} as User;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => initialState,
    signIn: (state, action: PayloadAction<User>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { signIn, logOut } = auth.actions;
export default auth.reducer;
