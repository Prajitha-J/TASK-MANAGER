
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BookOpen, Briefcase, Home, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const ModeSelectionPage = () => {
  const { updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background p-4">
      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-light-primaryAccent/20 dark:hover:bg-dark-primaryAccent/20"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      <div className="container max-w-4xl section-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8 text-light-textPrimary dark:text-dark-textPrimary">Choose Your Experience</h1>
        <p className="text-center text-light-textSecondary dark:text-dark-textSecondary mb-12">
          Select the mode that best fits your needs for task management
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-scale border-light-border dark:border-dark-border border shadow-task-card dark:shadow-none">
            <CardHeader className="pb-2 bg-gradient-to-b from-light-card to-light-background dark:from-dark-card dark:to-dark-background">
              <div className="w-full flex justify-center mb-2">
                <div className="p-3 rounded-full bg-light-primaryAccent/20 dark:bg-dark-primaryAccent/20">
                  <BookOpen className="h-10 w-10 text-light-primaryAccent dark:text-dark-primaryAccent" />
                </div>
              </div>
              <CardTitle className="text-center text-light-textPrimary dark:text-dark-textPrimary">Student</CardTitle>
              <CardDescription className="text-center text-light-textSecondary dark:text-dark-textSecondary">
                Optimize your academic workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm">
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <span className="mr-2 text-light-primaryAccent dark:text-dark-primaryAccent">•</span> 
                  <span className="text-light-textPrimary dark:text-dark-textPrimary">Track assignments & deadlines</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-light-primaryAccent dark:text-dark-primaryAccent">•</span> 
                  <span className="text-light-textPrimary dark:text-dark-textPrimary">Organize study notes</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-light-primaryAccent dark:text-dark-primaryAccent">•</span> 
                  <span className="text-light-textPrimary dark:text-dark-textPrimary">Monitor academic progress</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full button-effect bg-light-primaryAccent dark:bg-dark-primaryAccent hover:bg-light-secondaryAccent dark:hover:bg-dark-secondaryAccent text-white" 
                onClick={() => handleModeSelection("student")}
              >
                Select Student Mode
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover-scale border-light-border dark:border-dark-border border shadow-task-card dark:shadow-none">
            <CardHeader className="pb-2 bg-gradient-to-b from-light-card to-light-background dark:from-dark-card dark:to-dark-background">
              <div className="w-full flex justify-center mb-2">
                <div className="p-3 rounded-full bg-light-primaryAccent/20 dark:bg-dark-primaryAccent/20">
                  <Briefcase className="h-10 w-10 text-light-primaryAccent dark:text-dark-primaryAccent" />
                </div>
              </div>
              <CardTitle className="text-center text-light-textPrimary dark:text-dark-textPrimary">Employee</CardTitle>
              <CardDescription className="text-center text-light-textSecondary dark:text-dark-textSecondary">
                Streamline your work projects
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm">
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <span className="mr-2 text-light-primaryAccent dark:text-dark-primaryAccent">•</span> 
                  <span className="text-light-textPrimary dark:text-dark-textPrimary">Manage project deadlines</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-light-primaryAccent dark:text-dark-primaryAccent">•</span> 
                  <span className="text-light-textPrimary dark:text-dark-textPrimary">Prioritize urgent tasks</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-light-primaryAccent dark:text-dark-primaryAccent">•</span> 
                  <span className="text-light-textPrimary dark:text-dark-textPrimary">Collaborate with team members</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full button-effect bg-light-primaryAccent dark:bg-dark-primaryAccent hover:bg-light-secondaryAccent dark:hover:bg-dark-secondaryAccent text-white" 
                onClick={() => handleModeSelection("employee")}
              >
                Select Employee Mode
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover-scale border-light-border dark:border-dark-border border shadow-task-card dark:shadow-none">
            <CardHeader className="pb-2 bg-gradient-to-b from-light-card to-light-background dark:from-dark-card dark:to-dark-background">
              <div className="w-full flex justify-center mb-2">
                <div className="p-3 rounded-full bg-light-primaryAccent/20 dark:bg-dark-primaryAccent/20">
                  <Home className="h-10 w-10 text-light-primaryAccent dark:text-dark-primaryAccent" />
                </div>
              </div>
              <CardTitle className="text-center text-light-textPrimary dark:text-dark-textPrimary">Personal</CardTitle>
              <CardDescription className="text-center text-light-textSecondary dark:text-dark-textSecondary">
                Organize your personal life
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm">
              <ul className="space-y-2 mb-6 text-left">
                <li className="flex items-center">
                  <span className="mr-2 text-light-primaryAccent dark:text-dark-primaryAccent">•</span> 
                  <span className="text-light-textPrimary dark:text-dark-textPrimary">Track personal goals</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-light-primaryAccent dark:text-dark-primaryAccent">•</span> 
                  <span className="text-light-textPrimary dark:text-dark-textPrimary">Manage daily habits</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-light-primaryAccent dark:text-dark-primaryAccent">•</span> 
                  <span className="text-light-textPrimary dark:text-dark-textPrimary">Keep personal notes & diary</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full button-effect bg-light-primaryAccent dark:bg-dark-primaryAccent hover:bg-light-secondaryAccent dark:hover:bg-dark-secondaryAccent text-white" 
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
