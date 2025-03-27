
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BookOpen, Briefcase, Home } from "lucide-react";

const ModeSelectionPage = () => {
  const { updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleModeSelection = async (mode: "student" | "employee" | "personal") => {
    try {
      await updateUserProfile({ mode });
      toast.success(`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode selected`);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to select mode");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="container max-w-4xl section-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8">Choose Your Experience</h1>
        <p className="text-center text-muted-foreground mb-12">
          Select the mode that best fits your needs for task management
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-scale glass-effect">
            <CardHeader className="pb-2">
              <div className="w-full flex justify-center mb-2">
                <div className="p-3 rounded-full bg-primary/20">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">Student</CardTitle>
              <CardDescription className="text-center">
                Optimize your academic workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm">
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <span className="mr-2">•</span> Track assignments & deadlines
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Organize study notes
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Monitor academic progress
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full button-effect" 
                onClick={() => handleModeSelection("student")}
              >
                Select Student Mode
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover-scale glass-effect">
            <CardHeader className="pb-2">
              <div className="w-full flex justify-center mb-2">
                <div className="p-3 rounded-full bg-primary/20">
                  <Briefcase className="h-10 w-10 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">Employee</CardTitle>
              <CardDescription className="text-center">
                Streamline your work projects
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm">
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <span className="mr-2">•</span> Manage project deadlines
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Prioritize urgent tasks
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Collaborate with team members
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full button-effect" 
                onClick={() => handleModeSelection("employee")}
              >
                Select Employee Mode
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover-scale glass-effect">
            <CardHeader className="pb-2">
              <div className="w-full flex justify-center mb-2">
                <div className="p-3 rounded-full bg-primary/20">
                  <Home className="h-10 w-10 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">Personal</CardTitle>
              <CardDescription className="text-center">
                Organize your personal life
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm">
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <span className="mr-2">•</span> Track personal goals
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Manage daily habits
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Keep personal notes & diary
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full button-effect" 
                onClick={() => handleModeSelection("personal")}
              >
                Select Personal Mode
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModeSelectionPage;
