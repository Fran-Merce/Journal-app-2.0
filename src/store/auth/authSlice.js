import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
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
      state.status = "authenticated";
      state.errorMessage = null;
    },
    loguot: (state, { payload }) => {
      state.status = "not-authenticated";
      state.errorMessage = payload.errorMessage;
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
    },
    checkingCredentials: state => {
      state.status = "checking-credentials";
    },
  },
});
export const { login, loguot, checkingCredentials } = authSlice.actions;
