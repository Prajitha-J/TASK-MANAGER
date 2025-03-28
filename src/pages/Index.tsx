
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { currentUser, userData, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    // If not logged in, redirect to login
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    // If profile is not complete, redirect to profile page
    if (!userData || userData.profileComplete !== true) {
      navigate("/profile");
      return;
    }
    
    // If mode is not selected, redirect to mode selection
    if (!userData || !userData.mode) {
      navigate("/mode-selection");
      return;
    }
    
    // Otherwise, redirect to dashboard
    navigate("/dashboard");
    
  }, [currentUser, userData, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse">Loading...</div>
    </div>
  );
};

export default Index;
