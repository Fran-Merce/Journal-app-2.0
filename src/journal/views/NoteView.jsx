import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
export const NoteView = () => {
  return (
    <Grid container justifyContent="space-between" sx={{ mb: 1, p: 3 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          28 de agosto, 2023{" "}
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary">
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
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que paso hoy?"
          minRows={5}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
