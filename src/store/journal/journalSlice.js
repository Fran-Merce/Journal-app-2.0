import { createSlice } from '@reduxjs/toolkit';

// !SE PUEDE MUTAR EL ESTADO DIRECTAMENTE YA QUE REDUX TOOLKIT POR DETRAS NOS ESTA GENERANDO UN NUEVO ESTADO
// !NO SE CONSIDERA UNA MALA PRACTICA MUTAR EL ESTADO DIRECTAMENTE GRACIAS AL REDUX TOOL KIT

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null,
  },
  reducers: {
    addNewEmptyNote: (state, { payload }) => {
      state.notes = [...state.notes, payload];
    },
    setActiveNote: (state, { payload }) => {
      state.activeNote = payload;
      state.isSaving = false;
      state.messageSaved = null;
    },
    savingNewNote: state => {
      state.isSaving = true;
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: state => {
      state.isSaving = true;
      state.messageSaved = null;
    },
    updateNote: (state, { payload }) => {
      state.notes = state.notes.map(note =>
        note.id === payload.id ? (note = { ...payload }) : note
      );
      state.messageSaved = `${payload.title}, guardada correctamente`;
      state.isSaving = false;
    },
    setPhotosToActiveNote: (state, { payload }) => {
      state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...payload];
      state.isSaving = false;
    },
    clearNotesLogout: state => {
      state.notes = [];
      state.activeNote = null;
      state.messageSaved = null;
      state.activeNote = null;
      state.isSaving = false;
    },
    deleteNoteById: (state, { payload }) => {
      state.notes = state.notes.filter(note => note.id !== payload);
      state.activeNote = null;
    },
  },
});
export const { reducer } = journalSlice.actions;

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
