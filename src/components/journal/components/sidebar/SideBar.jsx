import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 280 }) => {
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
          <Typography variant="h6" component="p" noWrap>
            Fran Skykru
          </Typography>
        </Toolbar>
        <Divider variant="fullWidth" />
        <List>
          {["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio"].map(
            text => (
              <SideBarItem key={text} text={text} />
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
};
