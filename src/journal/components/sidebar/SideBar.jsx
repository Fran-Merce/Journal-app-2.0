import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../store/sidebar/sidebarSlice';
import { SideBarItem } from './SideBarItem';

export const SideBar = ({ drawerWidth = 280 }) => {
  const dispatch = useDispatch();
  const { notes } = useSelector(state => state.journal);
  const { open } = useSelector(state => state.sidebar);

  return (
    <Box
      component='aside'
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        position: `${open ? 'relative' : 'absolute'}`,
        left: '0',
        top: '0',
      }}
    >
      <Drawer
        variant='persistent'
        open={open}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6' component='p' noWrap>
            Mis Notas 📜
          </Typography>
          <IconButton onClick={() => dispatch(toggleSidebar())}>
            <Typography variant='h6' component='p' noWrap>
              x
            </Typography>
          </IconButton>
        </Toolbar>
        <Divider variant='fullWidth' />
        <List>
          {notes.map(
            note =>
              note.title.trim().length > 0 && (
                <SideBarItem key={note.id} note={note} />
              )
          )}
        </List>
      </Drawer>
    </Box>
  );
};
