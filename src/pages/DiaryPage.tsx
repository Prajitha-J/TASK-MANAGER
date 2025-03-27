
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock, Save, Calendar, Plus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

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
  
  // In a real app, this would be securely stored and validated against a database
  const correctPassword = "password123";
  
  const handleUnlock = () => {
    if (password === correctPassword) {
      setIsLocked(false);
      toast.success("Diary unlocked successfully");
      
      // Simulate fetching diary entries from database
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
    
    if (isEditing && selectedEntry) {
      // Update existing entry
      const updatedEntries = diaryEntries.map(entry => 
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
      
      setDiaryEntries([entry, ...diaryEntries]);
      toast.success("Entry saved successfully");
    }
    
    setNewEntry({ title: "", content: "" });
    setSelectedEntry(null);
    setIsEditing(false);
  };
  
  const handleDeleteEntry = (id: string) => {
    setDiaryEntries(diaryEntries.filter(entry => entry.id !== id));
    
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
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleLock}
            >
              <Lock className="mr-2 h-4 w-4" />
              Lock Diary
            </Button>
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
