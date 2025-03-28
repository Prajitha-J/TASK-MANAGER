
import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

const DashboardLayout = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Log authentication state for debugging
    console.log("Auth state:", { currentUser, userData });
    
    if (!currentUser) {
      toast.error("Please log in to access the dashboard");
    } else if (!userData || userData.profileComplete !== true) {
      toast.info("Please complete your profile");
    } else if (!userData || !userData.mode) {
      toast.info("Please select your preferred mode");
    }
  }, [currentUser, userData]);

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
