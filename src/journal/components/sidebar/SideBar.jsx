import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 280 }) => {
  const { displayName } = useSelector(state => state.auth);
  const { notes } = useSelector(state => state.journal);

  return (
    <Box
      component="aside"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="p"
            noWrap
            sx={{ textTransform: "capitalize" }}
          >
            {displayName}
          </Typography>
        </Toolbar>
        <Divider variant="fullWidth" />
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
