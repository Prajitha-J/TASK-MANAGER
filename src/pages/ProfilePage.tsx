
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, CalendarDays, Phone, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData, updateUserProfile, currentUser } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    // Pre-fill form if data exists
    if (userData) {
      if (userData.name) setName(userData.name);
      if (userData.phone) setPhone(userData.phone);
      if (userData.dob) setDob(userData.dob);
      
      // Only redirect if profile is already complete AND we're not already on the profile page
      if (userData.profileComplete && window.location.pathname !== "/profile") {
        navigate("/mode-selection");
      }
    }
  }, [userData, navigate, currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile({
        name,
        phone,
        dob,
        profileComplete: true
      });
      toast.success("Profile updated successfully");
      navigate("/mode-selection");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-light-background dark:bg-dark-background">
      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-primary/20"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border p-6 shadow-sm">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
              Complete Your Profile
            </h1>
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              Please provide your personal information
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-light-textPrimary dark:text-dark-textPrimary">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-light-textSecondary dark:text-dark-textSecondary" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="pl-10 bg-light-input dark:bg-dark-input border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-textPrimary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-light-textPrimary dark:text-dark-textPrimary">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-light-textSecondary dark:text-dark-textSecondary" />
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  className="pl-10 bg-light-input dark:bg-dark-input border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-textPrimary"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="dob" className="text-light-textPrimary dark:text-dark-textPrimary">Date of Birth</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-3 h-5 w-5 text-light-textSecondary dark:text-dark-textSecondary" />
                <Input
                  id="dob"
                  type="date"
                  className="pl-10 bg-light-input dark:bg-dark-input border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-textPrimary"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-light-primaryAccent dark:bg-dark-primaryAccent hover:bg-light-secondaryAccent dark:hover:bg-dark-secondaryAccent text-white"
              disabled={loading}
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
