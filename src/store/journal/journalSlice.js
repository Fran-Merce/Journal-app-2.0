import { createSlice } from '@reduxjs/toolkit';


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
    savingNewNote: state => ({
      ...state,
      isSaving: true,
    }),

    setNotes: (state, { payload }) => ({
      ...state,
      notes: payload,
    }),

    setSaving: state => ({
      ...state,
      isSaving: true,
      messageSaved: null,
    }),
    updateNote: (state, { payload }) => {
      const newNotes = state.notes.map(note =>
        note.id === payload.id ? (note = { ...payload }) : note
      );
      return {
        ...state,
        notes: newNotes,
        messageSaved: `${payload.title}, guardada correctamente`,
        isSaving: false,
      };
    },
    setPhotosToActiveNote: (state, { payload }) => ({
      ...state,
      activeNote: {
        ...state.activeNote,
        imageUrls: [...state.activeNote.imageUrls, ...payload],
      },
      isSaving: false,
    }),

    clearNotesLogout: state => ({
      ...state,
      notes: [],
      activeNote: null,
      messageSaved: null,
      isSaving: false,
    }),

    deleteNoteById: (state, { payload }) => {
      const newNotes = state.notes.filter(note => note.id !== payload);
      return {
        ...state,
        notes: newNotes,
        activeNote: null,
      };
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
