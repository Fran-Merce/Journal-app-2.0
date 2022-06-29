import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { dateFormatted } from '../helpers';
import { useForm } from './useForm';
import {
  localUpdateNote,
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from '../store/journal';

export const useNotes = () => {
  const dispatch = useDispatch();
  const { activeNote, messageSaved, isSaving } = useSelector(state => state.journal);
  const { title, body, date, onInputChange, formState } = useForm(activeNote);

  // effects

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, []);

  useEffect(() => {
    if (messageSaved !== null) Swal.fire('Nota Guardada', messageSaved, 'success');
  }, [messageSaved]);

  // Dispatch Functions

  const onDeleteNote = () => dispatch(startDeletingNote());
  const activeNoteOnBlur = () => {
    if (formState.title === '') return;
    dispatch(localUpdateNote(formState));
  };

  const onSaveNote = () => {
    if (formState.title.trim().length === 0)
      return Swal.fire('Error', 'El titulo es requerido', 'error');
    dispatch(setActiveNote(formState));
    dispatch(startSaveNote(activeNote));
  };

  const onFileChange = ({ target }) => {
    dispatch(setActiveNote(formState));
    dispatch(startUploadingFiles(target.files));
  };

  // date Formatted and button save ref
  const dateString = useMemo(() => dateFormatted(new Date(date)), [date]);
  const fileInputRef = useRef();

  return {
    onFileChange,
    onSaveNote,
    onDeleteNote,
    title,
    body,
    dateString,
    onInputChange,
    isSaving,
    activeNote,
    fileInputRef,
    activeNoteOnBlur,
  };
};
