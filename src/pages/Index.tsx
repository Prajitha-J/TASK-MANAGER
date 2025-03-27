
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { currentUser, userData, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!currentUser) {
      navigate("/login");
    } else if (!userData?.profileComplete) {
      navigate("/profile");
    } else if (!userData?.mode) {
      navigate("/mode-selection");
    } else {
      navigate("/dashboard");
    }
  }, [currentUser, userData, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse">Loading...</div>
    </div>
  );
};

export default Index;
