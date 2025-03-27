
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book, Plus, BookOpen, CircleX, Check, BookX } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

interface Subject {
  id: string;
  name: string;
  status: "incomplete" | "in-progress" | "completed";
  syllabusItems: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

const TermPage = () => {
  const { userData } = useAuth();
  
  const [newSubject, setNewSubject] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: "1",
      name: "Mathematics",
      status: "in-progress",
      syllabusItems: [
        { id: "1-1", title: "Algebra", completed: true },
        { id: "1-2", title: "Calculus", completed: false },
        { id: "1-3", title: "Statistics", completed: false }
      ]
    },
    {
      id: "2",
      name: "Computer Science",
      status: "incomplete",
      syllabusItems: [
        { id: "2-1", title: "Data Structures", completed: false },
        { id: "2-2", title: "Algorithms", completed: false }
      ]
    }
  ]);
  
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [newSyllabusItem, setNewSyllabusItem] = useState("");
  
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim()) return;
    
    const subject: Subject = {
      id: Date.now().toString(),
      name: newSubject,
      status: "incomplete",
      syllabusItems: []
    };
    
    setSubjects(prev => [...prev, subject]);
    setNewSubject("");
    toast.success("Subject added successfully");
  };
  
  const handleAddSyllabusItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !newSyllabusItem.trim()) return;
    
    const item = {
      id: Date.now().toString(),
      title: newSyllabusItem,
      completed: false
    };
    
    setSubjects(subjects.map(subject => 
      subject.id === selectedSubject.id 
        ? { ...subject, syllabusItems: [...subject.syllabusItems, item] }
        : subject
    ));
    
    setSelectedSubject({
      ...selectedSubject,
      syllabusItems: [...selectedSubject.syllabusItems, item]
    });
    
    setNewSyllabusItem("");
    toast.success("Syllabus item added successfully");
  };
  
  const toggleSyllabusItem = (itemId: string) => {
    if (!selectedSubject) return;
    
    const updatedItems = selectedSubject.syllabusItems.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    
    const updatedSubject = { ...selectedSubject, syllabusItems: updatedItems };
    
    // Calculate status based on syllabus items
    let status: "incomplete" | "in-progress" | "completed" = "incomplete";
    const completedCount = updatedItems.filter(item => item.completed).length;
    
    if (completedCount === updatedItems.length && updatedItems.length > 0) {
      status = "completed";
    } else if (completedCount > 0) {
      status = "in-progress";
    }
    
    updatedSubject.status = status;
    
    setSelectedSubject(updatedSubject);
    setSubjects(subjects.map(subject => 
      subject.id === selectedSubject.id ? updatedSubject : subject
    ));
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <BookOpen className="h-5 w-5 text-yellow-500" />;
      default:
        return <BookX className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">This Term</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subjects and track syllabus progress
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect md:col-span-1">
          <CardHeader>
            <CardTitle>Subjects</CardTitle>
            <CardDescription>Add and manage your subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddSubject} className="flex gap-2">
              <Input
                placeholder="New subject name"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <Button type="submit" size="icon" aria-label="Add subject">
                <Plus className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="space-y-2 mt-4">
              {subjects.map(subject => (
                <Button
                  key={subject.id}
                  variant={selectedSubject?.id === subject.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedSubject(subject)}
                >
                  <div className="flex items-center w-full">
                    <Book className="mr-2 h-4 w-4" />
                    <span className="flex-1 text-left">{subject.name}</span>
                    {getStatusIcon(subject.status)}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedSubject ? `${selectedSubject.name} Syllabus` : "Select a Subject"}
            </CardTitle>
            <CardDescription>
              {selectedSubject 
                ? "Track your progress through the syllabus" 
                : "Choose a subject from the list to view its syllabus"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedSubject ? (
              <div className="space-y-4">
                <form onSubmit={handleAddSyllabusItem} className="flex gap-2">
                  <Input
                    placeholder="Add syllabus item"
                    value={newSyllabusItem}
                    onChange={(e) => setNewSyllabusItem(e.target.value)}
                  />
                  <Button type="submit" size="icon" aria-label="Add syllabus item">
                    <Plus className="h-4 w-4" />
                  </Button>
                </form>
                
                <div className="space-y-2 mt-4">
                  {selectedSubject.syllabusItems.length > 0 ? (
                    selectedSubject.syllabusItems.map(item => (
                      <div 
                        key={item.id}
                        className={`flex items-center justify-between p-3 rounded-md ${
                          item.completed ? "bg-green-500/10" : "bg-accent"
                        }`}
                      >
                        <span className={item.completed ? "line-through opacity-70" : ""}>
                          {item.title}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleSyllabusItem(item.id)}
                        >
                          {item.completed ? (
                            <CircleX className="h-5 w-5" />
                          ) : (
                            <Check className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No syllabus items yet. Add some above.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-12">
                Select a subject from the left panel to view and manage its syllabus
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermPage;
