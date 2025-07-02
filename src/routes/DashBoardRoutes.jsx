import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from "../pages/StudentDashboard";
import MentorDashboard from "../pages/MentorDashboard";
import { useAuth } from "../context/AuthContext";

const DashBoardRoutes = () => {
  const { user } = useAuth();

  return (
  
    <Routes>
      <Route
        path="student"
        element={user?.role === "student" ? <StudentDashboard /> : <Navigate to="/auth/student-login" />}
      />
      <Route
        path="mentor"
        element={user?.role === "mentor" ? <MentorDashboard /> : <Navigate to="/auth/login-mentor" />}
      />
    </Routes>
  );
};

export default DashBoardRoutes;
