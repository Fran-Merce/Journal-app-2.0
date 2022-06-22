import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../components/auth/routes/AuthRoutes";
import { JournalRoutes } from "../components/journal/routes/JournalRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  );
};
