import React from "react";
import { IconButton } from "@mui/material";
import JournalLayout from "../layout/JournalLayout";
import { NothingSelectedView, NoteView } from "../views";
import { AddOutlined } from "@mui/icons-material";
export const JournalPage = () => {
  return (
    <JournalLayout>
      <NothingSelectedView />
      {/* <NoteView /> */}
      <IconButton
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
        <AddOutlined />
      </IconButton>
    </JournalLayout>
  );
};
