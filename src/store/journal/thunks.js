import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";

import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startNewNote = () => async (dispatch, getState) => {
  dispatch(savingNewNote(true));

  const { uid } = getState().auth;
  const newNote = {
    title: "",
    body: "",
    date: new Date().getTime(),
    imageUrls: [],
  };

  try {
    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  } catch (error) {
    error;
  }
};

export const startLoadingNotes = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const notes = await loadNotes(uid);
  dispatch(setNotes(notes));
};

export const startSaveNote = () => async (dispatch, getState) => {
  dispatch(setSaving());

  const { uid } = getState().auth;
  const { activeNote } = getState().journal;

  const noteToFireStore = { ...activeNote };
  delete noteToFireStore.id;
  noteToFireStore;
  const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
  await setDoc(docRef, noteToFireStore, { merge: true });
  await setDoc(docRef, noteToFireStore, { merge: true });
  dispatch(updateNote(activeNote));
};

export const startUploadingFiles = (files = []) => {
  return async dispatch => {
    dispatch(setSaving());

    const filesPromises = Object.values(files).map(file => fileUpload(file));
    const filesUrl = await Promise.all(filesPromises).then(files =>
      files.map(file => file.url)
    );
    filesUrl;
    dispatch(setPhotosToActiveNote(filesUrl));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(activeNote.id));
  };
};
