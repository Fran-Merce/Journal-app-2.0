import { SaveOutlined, UploadOutlined, DeleteOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useNotes } from '../../hooks/useNotes';
import { ImageGallery } from '../components';

export const NoteView = () => {
  const {
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
  } = useNotes();

  return (
    <Grid
      container
      sx={{ mb: 1, p: 3 }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid container justifyContent='space-between' display>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}{' '}
        </Typography>
        <Grid item display='flex' alignItems='center' justifyContent='end'>
          <Grid item>
            <input
              type='file'
              multiple
              onChange={onFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <IconButton
              disabled={isSaving}
              color='primary'
              onClick={() => fileInputRef.current.click()}
            >
              <UploadOutlined />
            </IconButton>
          </Grid>
          <Grid item>
            <Button disabled={isSaving} color='primary' onClick={onSaveNote}>
              <SaveOutlined sx={{ fontSize: 35, mr: 1 }} />
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 2 }}>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingresa un titulo'
          label='Titulo'
          sx={{ mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='Que paso hoy?'
          minRows={8}
          value={body}
          name='body'
          onChange={onInputChange}
        />

        <Grid container justifyContent='end'>
          <Button onClick={onDeleteNote} sx={{ mt: 2 }} color='error'>
            <DeleteOutlined />
            Borrar
          </Button>
        </Grid>
      </Grid>
      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  );
};
