import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../../store/journal';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import {
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { textFormatterLenght } from '../../../helpers';
import Swal from 'sweetalert2';

export const SideBarItem = ({ note }) => {
  const dispatch = useDispatch();
  const { activeNote } = useSelector(state => state.journal);
  const { body, title } = note;

  const newTitle = useMemo(() => textFormatterLenght(title, 20), [title]);
  const newBody = useMemo(() => textFormatterLenght(body, 64), [body]);

  const setActive = () => {
    if (activeNote?.id === note?.id) return;
    if (activeNote?.title.trim().length === 0) {
      Swal.fire('Tienes una nota sin guardar', '', 'warning');
      return;
    }
    dispatch(setActiveNote(note));
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={setActive}>
          <ClassOutlinedIcon
            sx={{
              color: `${activeNote?.id === note?.id ? '#fdb760' : '#000'}`,
              mr: 3,
            }}
          />

          <Grid container direction='column'>
            <ListItemText
              primary={newTitle}
              primaryTypographyProps={{ fontSize: '1.1rem' }}
            />
            <ListItemText secondary={newBody} sx={{ overflowWrap: 'anywhere' }} />
          </Grid>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};
