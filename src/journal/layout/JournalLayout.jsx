import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Navbar, SideBar } from "../components";
const drawerWidth = 320;
const JournalLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Navbar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} openDrawer={open} />
      <Box
        alignItems="center"
        justifyContent="center"
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default JournalLayout;
