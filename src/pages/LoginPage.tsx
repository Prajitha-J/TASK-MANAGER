
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Lock, LogIn, Chrome, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLoginMode) {
        await signIn(email, password);
        toast.success("Logged in successfully");
      } else {
        await signUp(email, password);
        toast.success("Account created successfully");
      }
      navigate("/profile");
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Logged in with Google successfully");
      navigate("/profile");
    } catch (error: any) {
      toast.error(error.message || "Google authentication failed");
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
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-dark-textPrimary" />
          ) : (
            <Moon className="h-5 w-5 text-light-textPrimary" />
          )}
        </Button>
      </div>
      
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border p-6 shadow-sm">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              {isLoginMode 
                ? "Enter your credentials to access your account" 
                : "Fill in your details to create a new account"}
            </p>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-light-textSecondary dark:text-dark-icon" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10 bg-light-input dark:bg-dark-input border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-textPrimary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-light-textSecondary dark:text-dark-icon" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10 bg-light-input dark:bg-dark-input border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-textPrimary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-light-primaryAccent dark:bg-dark-primaryAccent hover:bg-light-secondaryAccent dark:hover:bg-dark-secondaryAccent text-white"
              disabled={loading}
            >
              <LogIn className="mr-2 h-4 w-4" />
              {isLoginMode ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-light-border dark:border-dark-divider" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-light-card dark:bg-dark-card px-2 text-light-textSecondary dark:text-dark-placeholder">OR CONTINUE WITH</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="w-full border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-googleText 
                       bg-light-card dark:bg-dark-googleButton hover:bg-light-input dark:hover:bg-dark-googleHover"
            onClick={handleGoogleAuth}
            disabled={loading}
          >
            <Chrome className="mr-2 h-4 w-4 text-light-textSecondary dark:text-dark-googleText" />
            Google
          </Button>
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              className="text-sm text-light-primaryAccent dark:text-dark-placeholder hover:text-light-secondaryAccent dark:hover:text-dark-textSecondary"
              onClick={() => setIsLoginMode(!isLoginMode)}
            >
              {isLoginMode
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
