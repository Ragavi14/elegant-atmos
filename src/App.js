import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ElegantAtmos from "./components/ElegantAtmos";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ThankYou from './components/ThankYou';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  /* =========================
     CHECK ADMIN SESSION
  ========================= */
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("isAdmin");
    if (adminLoggedIn === "true") {
      setIsAdmin(true);
    }
  }, []);

  /* =========================
     LOGIN HANDLER
  ========================= */
  const handleLogin = () => {
    localStorage.setItem("isAdmin", "true");
    setIsAdmin(true);
  };

  /* =========================
     LOGOUT HANDLER
  ========================= */
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* LANDING PAGE */}
        <Route path="/" element={<ElegantAtmos />} />

        {/* THANK YOU PAGE (Moved securely inside the Routes wrapper) */}
        <Route path="/thank-you" element={<ThankYou />} />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <AdminLogin isAdmin={isAdmin} setIsAdmin={handleLogin} />
            )
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            isAdmin ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}