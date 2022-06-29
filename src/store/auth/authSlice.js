import { createSlice } from '@reduxjs/toolkit';

// !SE PUEDE MUTAR EL ESTADO DIRECTAMENTE YA QUE REDUX TOOLKIT POR DETRAS NOS ESTA GENERANDO UN NUEVO ESTADO
// !NO SE CONSIDERA UNA MALA PRACTICA MUTAR EL ESTADO DIRECTAMENTE GRACIAS AL REDUX TOOL KIT

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
      state.uid = uid;
      state.email = email;
      state.displayName = displayName;
      state.photoURL = photoURL;
      state.status = 'authenticated';
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.errorMessage = payload?.errorMessage;
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
    },
    checkingCredentials: state => {
      state.status = 'checking';
      state.errorMessage = null;
    },
  },
});
export const { login, logout, checkingCredentials } = authSlice.actions;
