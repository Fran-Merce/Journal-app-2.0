import React from "react";
import { CircularProgress, IconButton } from "@mui/material";
import JournalLayout from "../layout/JournalLayout";
import { NothingSelectedView, NoteView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { startNewNote } from "../../store/journal";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, activeNote: note } = useSelector(state => state.journal);
  const onClickNewNote = e => {
    e.preventDefault();
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {!!note ? <NoteView /> : <NothingSelectedView />}
      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: "#fff",
          backgroundColor: "error.main",
          "&:hover": { backgroundColor: "error.dark", opacity: 0.8 },
          position: "fixed",
          bottom: 50,
          right: 50,
          height: "100",
        }}
      >
        {isSaving ? <CircularProgress color="error" /> : <AddOutlined />}
      </IconButton>
    </JournalLayout>
  );
};
``;
