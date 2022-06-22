import { TurnedInNot } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  Grid,
  ListItemText,
} from "@mui/material";
import React from "react";

export const SideBarItem = ({ text }) => {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={text} />
          <ListItemText secondary={"lorem gsagsa gsagsag sagsagsaolpdpoaks "} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
