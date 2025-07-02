import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";


import { useAuth } from "../context/AuthContext";
import DashBoardRoutes from "./DashBoardRoutes";
import AuthRoutes from "./AuthRoutes";
import DoubtsRoutes from "./DoubtsRoutes";
import About from "../pages/About";

const MainRoutes = () => {
  const { loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/doubts/*" element={<DoubtsRoutes />} />
      <Route path="/dashboard/*" element={<DashBoardRoutes />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default MainRoutes;
