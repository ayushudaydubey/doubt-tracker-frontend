import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import MentorLogin from "../pages/MentorLogin";
import StudentRegister from "../pages/StudentRegister";
import MentorRegister from "../pages/MentorRegister";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/student-login" element={<Login />} />
      <Route path="/register-student" element={<StudentRegister />} />
      <Route path="/mentor-login" element={<MentorLogin />} />
      <Route
        path="/register-mentor"
        element={user?.role === "admin" ? <MentorRegister /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default AuthRoutes;
