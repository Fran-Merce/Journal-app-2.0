import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      const { uid, email, displayName, photoURL } = payload;
      return {
        ...state,
        status: 'authenticated',
        uid,
        email,
        displayName,
        photoURL,
        errorMessage: null,
      };
    },
    logout: (state, { payload }) => ({
      ...state,
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: payload?.errorMessage || null,
    }),

    checkingCredentials: state => ({
      ...state,
      status: 'checking',
      errorMessage: null,
    }),
  },
});
export const { login, logout, checkingCredentials } = authSlice.actions;
