import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../../store/journal";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { textFormatterLenght } from "../../../helpers";

export const SideBarItem = ({ note }) => {
  const dispatch = useDispatch();
  const { activeNote } = useSelector(state => state.journal);
  const { body, title } = note;

  const newTitle = useMemo(() => textFormatterLenght(title, 16), [title]);
  const newBody = useMemo(() => textFormatterLenght(body, 64), [body]);

  const setActive = () => {
    if (activeNote?.id === note?.id) return;
    dispatch(setActiveNote(note));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={setActive}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container direction="column">
          <ListItemText primary={newTitle} />
          <ListItemText secondary={newBody} sx={{ overflowWrap: "anywhere" }} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
