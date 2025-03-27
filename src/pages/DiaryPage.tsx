
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock, Save, Calendar, Plus, Edit, Trash2, KeyRound, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
}

const DiaryPage = () => {
  const { userData } = useAuth();
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasSetupPassword, setHasSetupPassword] = useState(false);
  const [showSetupPassword, setShowSetupPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  
  // In a real app, this would be securely stored and validated against a database
  const [diaryPassword, setDiaryPassword] = useState("");
  
  // Check local storage for diary password on component mount
  useEffect(() => {
    const storedPassword = localStorage.getItem('diaryPassword');
    if (storedPassword) {
      setDiaryPassword(storedPassword);
      setHasSetupPassword(true);
    } else {
      setShowSetupPassword(true);
    }
  }, []);
  
  const handlePasswordSetup = () => {
    if (!passwordValue) {
      toast.error("Password cannot be empty");
      return;
    }
    
    if (passwordValue !== confirmPasswordValue) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Save password to local storage (in a real app, this would be securely stored)
    localStorage.setItem('diaryPassword', passwordValue);
    setDiaryPassword(passwordValue);
    setHasSetupPassword(true);
    setShowSetupPassword(false);
    toast.success("Password set successfully");
  };
  
  const handleUnlock = () => {
    if (password === diaryPassword) {
      setIsLocked(false);
      toast.success("Diary unlocked successfully");
      
      // Simulate fetching diary entries from database
      const storedEntries = localStorage.getItem('diaryEntries');
      if (storedEntries) {
        setDiaryEntries(JSON.parse(storedEntries));
      } else {
        const sampleEntries: DiaryEntry[] = [
          {
            id: "1",
            title: "First Day of Work",
            content: "Today was my first day at the new job. I was nervous but everyone was so welcoming.",
            date: "2023-10-15"
          },
          {
            id: "2",
            title: "Weekend Plans",
            content: "Planning to go hiking this weekend if the weather is good.",
            date: "2023-10-18"
          }
        ];
        
        setDiaryEntries(sampleEntries);
      }
    } else {
      toast.error("Incorrect password");
    }
  };
  
  const handleLock = () => {
    setIsLocked(true);
    setPassword("");
    setSelectedEntry(null);
    toast.success("Diary locked successfully");
  };
  
  const handleSaveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    
    let updatedEntries;
    
    if (isEditing && selectedEntry) {
      // Update existing entry
      updatedEntries = diaryEntries.map(entry => 
        entry.id === selectedEntry.id 
          ? { 
              ...entry, 
              title: newEntry.title, 
              content: newEntry.content 
            } 
          : entry
      );
      
      setDiaryEntries(updatedEntries);
      toast.success("Entry updated successfully");
    } else {
      // Create new entry
      const entry: DiaryEntry = {
        id: Date.now().toString(),
        title: newEntry.title,
        content: newEntry.content,
        date: new Date().toISOString().split('T')[0]
      };
      
      updatedEntries = [entry, ...diaryEntries];
      setDiaryEntries(updatedEntries);
      toast.success("Entry saved successfully");
    }
    
    // Save to local storage
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
    
    setNewEntry({ title: "", content: "" });
    setSelectedEntry(null);
    setIsEditing(false);
  };
  
  const handleDeleteEntry = (id: string) => {
    const updatedEntries = diaryEntries.filter(entry => entry.id !== id);
    setDiaryEntries(updatedEntries);
    
    // Save to local storage
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
    
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
      setNewEntry({ title: "", content: "" });
      setIsEditing(false);
    }
    
    toast.success("Entry deleted successfully");
  };
  
  const handleEditEntry = (entry: DiaryEntry) => {
    setSelectedEntry(entry);
    setNewEntry({
      title: entry.title,
      content: entry.content
    });
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setSelectedEntry(null);
    setNewEntry({ title: "", content: "" });
    setIsEditing(false);
  };
  
  const handleResetPassword = () => {
    setShowSetupPassword(true);
    setHasSetupPassword(false);
    setPasswordValue("");
    setConfirmPasswordValue("");
    setIsLocked(true);
  };

  // If password setup is needed
  if (showSetupPassword) {
    return (
      <div className="container mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Personal Diary</h1>
          <p className="text-muted-foreground mt-1">
            Keep your private thoughts secure
          </p>
        </header>
        
        <Card className="glass-effect max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <KeyRound className="mr-2 h-6 w-6 text-primary" />
              {hasSetupPassword ? "Change Password" : "Setup Diary Password"}
            </CardTitle>
            <CardDescription>
              {hasSetupPassword 
                ? "Create a new password for your diary" 
                : "Create a password to secure your private diary"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter a new password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPasswordValue}
                  onChange={(e) => setConfirmPasswordValue(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {hasSetupPassword && (
              <Button variant="outline" onClick={() => setShowSetupPassword(false)}>
                Cancel
              </Button>
            )}
            <Button 
              className="button-effect" 
              onClick={handlePasswordSetup}
              disabled={!passwordValue || !confirmPasswordValue}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {hasSetupPassword ? "Update Password" : "Set Password"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Regular diary view (locked or unlocked)
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Personal Diary</h1>
        <p className="text-muted-foreground mt-1">
          Keep your private thoughts secure
        </p>
      </header>

      {isLocked ? (
        <Card className="glass-effect max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-6 w-6 text-primary" />
              Unlock Your Diary
            </CardTitle>
            <CardDescription>
              Enter your password to access your private diary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your diary password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button 
                className="w-full button-effect" 
                onClick={handleUnlock}
                disabled={!password}
              >
                <Unlock className="mr-2 h-4 w-4" />
                Unlock Diary
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="ghost" 
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Diary Entries</CardTitle>
                <CardDescription>Your personal journal entries</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-y-auto">
                {diaryEntries.length > 0 ? (
                  <div className="space-y-2">
                    {diaryEntries.map(entry => (
                      <div 
                        key={entry.id}
                        className={`p-3 rounded-md cursor-pointer hover:bg-accent ${
                          selectedEntry?.id === entry.id ? "bg-accent" : "bg-card"
                        }`}
                        onClick={() => handleEditEntry(entry)}
                      >
                        <h3 className="font-medium">{entry.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {entry.date}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No diary entries yet
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedEntry(null);
                    setNewEntry({ title: "", content: "" });
                    setIsEditing(false);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Entry
                </Button>
              </CardFooter>
            </Card>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleLock}
              >
                <Lock className="mr-2 h-4 w-4" />
                Lock Diary
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground"
                onClick={handleResetPassword}
              >
                <KeyRound className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </div>
          </div>
          
          <Card className="glass-effect md:col-span-2">
            <CardHeader>
              <CardTitle>
                {isEditing ? "Edit Entry" : "New Entry"}
              </CardTitle>
              <CardDescription>
                {isEditing 
                  ? "Update your diary entry" 
                  : "Write about your day, thoughts, or feelings"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Entry title"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your thoughts here..."
                    className="min-h-[200px]"
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {isEditing && (
                <Button 
                  variant="destructive"
                  onClick={() => selectedEntry && handleDeleteEntry(selectedEntry.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              )}
              
              <div className="flex gap-2 ml-auto">
                {isEditing && (
                  <Button 
                    variant="outline" 
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                )}
                
                <Button onClick={handleSaveEntry}>
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? "Update" : "Save"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DiaryPage;
