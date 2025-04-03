
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="min-h-screen flex items-center justify-center p-4 login-container section-fade-in">
      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-opacity-20 transition-all duration-200"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      <div className="w-full max-w-md mx-auto animate-fade-in">
        <Card className="shadow-task-card dark:shadow-none border-opacity-40 dark:border-opacity-40 overflow-hidden">
          <CardHeader className="space-y-1 text-center notion-navbar pb-6">
            <CardTitle className="text-3xl font-bold tracking-tight text-light-textPrimary dark:text-dark-textPrimary">
              {isLoginMode ? "TASK MANAGER" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-light-textSecondary dark:text-dark-textSecondary">
              {isLoginMode
                ? "Enter your credentials to access your account"
                : "Fill in your details to create a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-light-primaryAccent dark:text-dark-primaryAccent" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10 bg-light-input dark:bg-dark-input border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-textPrimary placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-light-primaryAccent dark:text-dark-primaryAccent" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10 bg-light-input dark:bg-dark-input border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-textPrimary placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full button-effect bg-light-primaryAccent dark:bg-dark-primaryAccent hover:bg-light-secondaryAccent dark:hover:bg-dark-secondaryAccent text-white rounded-lg transition-all duration-200" 
                disabled={loading}
              >
                <LogIn className="mr-2 h-4 w-4" />
                {isLoginMode ? "Sign In" : "Sign Up"}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-light-border dark:border-dark-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-light-card dark:bg-dark-card px-2 text-light-textSecondary dark:text-dark-textSecondary">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full button-effect border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-textPrimary hover:bg-light-input dark:hover:bg-dark-input"
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button
              variant="link"
              className="text-sm text-light-primaryAccent dark:text-dark-primaryAccent hover:text-light-secondaryAccent dark:hover:text-dark-secondaryAccent"
              onClick={() => setIsLoginMode(!isLoginMode)}
            >
              {isLoginMode
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
