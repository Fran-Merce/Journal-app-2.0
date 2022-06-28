import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SaveOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { dateFormatted } from "../../helpers";
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal";
import Swal from "sweetalert2";

export const NoteView = () => {
  const dispatch = useDispatch();
  const { activeNote, messageSaved, isSaving } = useSelector(
    state => state.journal
  );
  const { title, body, date, onInputChange, formState } = useForm(activeNote);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, []);

  useEffect(() => {
    if (messageSaved !== null) {
      Swal.fire("Nota Guardada", messageSaved, "success");
    }
  }, [messageSaved]);

  const fileInputRef = useRef();

  const onSaveNote = () => {
    if (formState.title.trim().length === 0)
      return Swal.fire("Error", "El titulo es requerido", "error");

    dispatch(setActiveNote(formState));
    dispatch(startSaveNote(activeNote));
  };

  const dateString = useMemo(() => {
    return dateFormatted(new Date(date));
  }, [date]);

  const onFileChange = ({ target }) => {
    dispatch(setActiveNote(formState));
    dispatch(startUploadingFiles(target.files));
  };

  const onDeleteNote = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      container
      sx={{ mb: 1, p: 3 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid container justifyContent="space-between" display>
        <Typography fontSize={39} fontWeight="light">
          {dateString}{" "}
        </Typography>
        <Grid item display="flex" alignItems="center" justifyContent="end">
          <Grid item>
            <input
              type="file"
              multiple
              onChange={onFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <IconButton
              disabled={isSaving}
              color="primary"
              onClick={() => fileInputRef.current.click()}
            >
              <UploadOutlined />
            </IconButton>
          </Grid>
          <Grid item>
            <Button disabled={isSaving} color="primary" onClick={onSaveNote}>
              <SaveOutlined sx={{ fontSize: 35, mr: 1 }} />
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 2 }}>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingresa un titulo"
          label="Titulo"
          sx={{ mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que paso hoy?"
          minRows={8}
          value={body}
          name="body"
          onChange={onInputChange}
        />

        <Grid container justifyContent="end">
          <Button onClick={onDeleteNote} sx={{ mt: 2 }} color="error">
            <DeleteOutlined />
            Borrar
          </Button>
        </Grid>
      </Grid>
      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  );
};
