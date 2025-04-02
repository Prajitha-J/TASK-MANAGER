
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
          <CardHeader className="space-y-1 text-center bg-gradient-to-r from-primary/90 to-primary/70 pb-6">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              {isLoginMode ? "TASK MANAGER" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-white/80">
              {isLoginMode
                ? "Enter your credentials to access your account"
                : "Fill in your details to create a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6 bg-white">
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-primary" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10 border-primary/30 focus:border-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-primary" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10 border-primary/30 focus:border-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full button-effect bg-primary hover:bg-primary/90 text-white" 
                disabled={loading}
              >
                <LogIn className="mr-2 h-4 w-4" />
                {isLoginMode ? "Sign In" : "Sign Up"}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full button-effect border-primary/30 hover:bg-primary/10"
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center bg-white pb-6">
            <Button
              variant="link"
              className="text-sm text-primary hover:text-primary/80"
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
