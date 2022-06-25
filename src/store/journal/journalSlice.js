import { createSlice } from "@reduxjs/toolkit";

// !SE PUEDE MUTAR EL ESTADO DIRECTAMENTE YA QUE REDUX TOOLKIT POR DETRAS NOS ESTA GENERANDO UN NUEVO ESTADO
// !NO SE CONSIDERA UNA MALA PRACTICA MUTAR EL ESTADO DIRECTAMENTE GRACIAS AL REDUX TOOL KIT

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
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
    },
    savingNewNote: state => {
      state.isSaving = true;
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: state => {
      state.isSaving = true;
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map(note =>
        note.id === payload.id ? (note = { ...payload }) : note
      );
    },
    deleteNoteById: (state, action) => {},
  },
});
export const { reducer } = journalSlice.actions;

export const {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} = journalSlice.actions;
