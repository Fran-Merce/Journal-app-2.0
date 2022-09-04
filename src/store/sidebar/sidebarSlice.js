import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    open: false,
  },
  reducers: {
    toggleSidebar: state => {
      state.open = !state.open;
    },
  },
});
export const { reducer } = sidebarSlice.actions;
export const { toggleSidebar } = sidebarSlice.actions;