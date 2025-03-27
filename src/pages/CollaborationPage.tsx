
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { UserPlus, User } from "lucide-react";

const CollaborationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const { userData } = useAuth();

  const handleAddCollaborator = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }
    
    // In a real app, you would validate the password and send a request to the server
    // For now we'll just simulate success
    setCollaborators(prev => [...prev, username]);
    toast.success(`Collaboration request sent to ${username}`);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Collaboration</h1>
        <p className="text-muted-foreground mt-1">Manage your team collaborations</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Add Collaborator</CardTitle>
            <CardDescription>Send a collaboration request to another user</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCollaborator} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Enter collaborator's username"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="auth-password">Your Password</Label>
                <Input
                  id="auth-password"
                  type="password"
                  placeholder="Enter your password to authenticate"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full button-effect">
                <UserPlus className="mr-2 h-4 w-4" />
                Send Collaboration Request
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Active Collaborators</CardTitle>
            <CardDescription>People you are currently collaborating with</CardDescription>
          </CardHeader>
          <CardContent>
            {collaborators.length > 0 ? (
              <ul className="space-y-2">
                {collaborators.map((name, index) => (
                  <li key={index} className="flex items-center gap-2 p-3 rounded-md bg-accent">
                    <User className="h-5 w-5" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                You don't have any active collaborators yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollaborationPage;
