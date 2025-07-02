import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import CreateDoubt from "../pages/CreateDoubt";
import EditDoubt from "../pages/EditDoubt";

import DoubtDetailPage from "../pages/DoubtsDeatailPage";
import StudentDoubtDetailPage from "../pages/StudentDoubtDetailPage";

const DoubtsRoutes = () => {
  const { user } = useAuth();

  const isStudent = user?.role === "student";
  const isMentor = user?.role === "mentor";

  return (
    <Routes>
      <Route
        path="create"
        element={isStudent ? <CreateDoubt /> : <Navigate to="/" />}
      />
      <Route
        path="edit/:id"
        element={isStudent ? <EditDoubt /> : <Navigate to="/" />}
      />


      <Route
        path="student/:id"
        element={isStudent ? <StudentDoubtDetailPage /> : <Navigate to="/" />}
      />
      <Route
        path="mentor/:id"
        element={isMentor ? <DoubtDetailPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default DoubtsRoutes;
