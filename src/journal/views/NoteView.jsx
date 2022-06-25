import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect, useMemo } from "react";
import { dateFormatted } from "../../helpers";
import { setActiveNote, startSaveNote, updateNote } from "../../store/journal";

export const NoteView = () => {
  const dispatch = useDispatch();
  const { activeNote } = useSelector(state => state.journal);
  const { title, body, date, onInputChange, formState } = useForm(activeNote);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const dateString = useMemo(() => {
    return dateFormatted(new Date(date));
  }, [date]);

  const onSaveNote = () => {
    dispatch(startSaveNote(activeNote));
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{ mb: 1, p: 3 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}{" "}
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" onClick={onSaveNote}>
          <SaveOutlined sx={{ fontSize: 35, mr: 1 }} />
          Guardar
        </Button>
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
          minRows={5}
          value={body}
          name="body"
          onChange={onInputChange}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
