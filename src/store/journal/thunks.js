import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startNewNote = () => async (dispatch, getState) => {
  dispatch(savingNewNote(true));

  const { uid } = getState().auth;
  const newNote = {
    title: "lorrem ipsum",
    body: "Consectetur esse quis sunt laboris qui pariatur Lore,",
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
    console.log(error);
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

  const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
  await setDoc(docRef, noteToFireStore, { merge: true });

  dispatch(updateNote(activeNote));
};
