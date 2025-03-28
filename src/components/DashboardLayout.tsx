
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const DashboardLayout = () => {
  const { currentUser, userData } = useAuth();

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If profile not complete, redirect to profile
  if (!userData || userData.profileComplete !== true) {
    return <Navigate to="/profile" />;
  }

  // If mode not selected, redirect to mode selection
  if (!userData || !userData.mode) {
    return <Navigate to="/mode-selection" />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background p-6">
        <div className="section-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
