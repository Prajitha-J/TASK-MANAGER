
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/40 to-background p-4">
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
      <div className="w-full max-w-md mx-auto section-fade-in">
        <Card className="border-primary/40 border overflow-hidden shadow-lg">
          <CardHeader className="space-y-1 bg-gradient-to-r from-primary/90 to-primary/70">
            <CardTitle className="text-3xl font-bold tracking-tight text-center text-white">Complete Your Profile</CardTitle>
            <CardDescription className="text-white/80 text-center">
              Please provide your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground/80 font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-primary" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="pl-10 border-primary/30 focus:border-primary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground/80 font-medium">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-primary" />
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    className="pl-10 border-primary/30 focus:border-primary"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-foreground/80 font-medium">Date of Birth</Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-3 h-5 w-5 text-primary" />
                  <Input
                    id="dob"
                    type="date"
                    className="pl-10 border-primary/30 focus:border-primary"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full button-effect bg-primary hover:bg-primary/90 text-white"
                disabled={loading}
              >
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
