import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Navbar, SideBar } from "../components";
const drawerWidth = 280;
const JournalLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn animate__faster">
      <Navbar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} openDrawer={open} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default JournalLayout;
