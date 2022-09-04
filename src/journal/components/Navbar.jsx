import { MenuOutlined, LogoutOutlined } from '@mui/icons-material';
import {
  AppBar,
  capitalize,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth';
import { toggleSidebar } from '../../store/sidebar/sidebarSlice';

export const Navbar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const { displayName } = useSelector(state => state.auth);

  const onLogout = () => dispatch(startLogout());

  return (
    <AppBar    >
      <Toolbar

      >
        <IconButton
          onClick={() => dispatch(toggleSidebar())}
          color='inherit'
        >
          <MenuOutlined />
        </IconButton>
        <Grid container   justifyContent='space-between' alignItems='center'>
          <Typography
            sx={{
              textTransform: 'capitalize',
            }}
            variant='h6'
          >{`Bienvenido ${displayName} 😎 `}</Typography>
          <IconButton color='error' onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
