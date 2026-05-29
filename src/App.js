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
     LAZY LOAD FACEBOOK PIXEL
     (Fixes Mobile Performance)
  ========================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      // Setup base window tracking commands safely using rest parameters
      if (!window.fbq) {
        window.fbq = function (...args) {
          if (window.fbq.callMethod) {
            window.fbq.callMethod(...args);
          } else {
            window.fbq.queue.push(args);
          }
        };
        window._fbq = window.fbq;
        window.fbq.push = window.fbq;
        window.fbq.loaded = true;
        window.fbq.version = '2.0';
        window.fbq.queue = [];
      }

      // Inject the external script tag safely
      const scriptElement = document.createElement('script');
      scriptElement.async = true;
      scriptElement.src = 'https://connect.facebook.net/en_US/fbevents.js';
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(scriptElement, firstScript);
      } else {
        document.head.appendChild(scriptElement);
      }

      // Initialize with your live Pixel ID
      window.fbq('init', '1673726469900736'); 
      window.fbq('track', 'PageView');

      console.log("Facebook Pixel loaded cleanly after 3s delay.");
    }, 3000); 

    return () => clearTimeout(timer);
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