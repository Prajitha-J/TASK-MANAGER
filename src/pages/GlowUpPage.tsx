
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Star, Sparkles, Camera, TrendingUp, Calendar, Plus, Trash2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Milestone {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: string;
  photoUrl?: string;
}

const GlowUpPage = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState<Omit<Milestone, "id">>({
    title: "",
    description: "",
    date: new Date(),
    category: "fitness",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Load milestones from localStorage on component mount
  useEffect(() => {
    const savedMilestones = localStorage.getItem('glowUpMilestones');
    if (savedMilestones) {
      const parsedMilestones = JSON.parse(savedMilestones);
      
      // Convert string dates back to Date objects
      const formattedMilestones = parsedMilestones.map((milestone: any) => ({
        ...milestone,
        date: new Date(milestone.date)
      }));
      
      setMilestones(formattedMilestones);
    }
  }, []);

  // Save milestones to localStorage whenever milestones change
  useEffect(() => {
    localStorage.setItem('glowUpMilestones', JSON.stringify(milestones));
  }, [milestones]);

  const addMilestone = () => {
    if (newMilestone.title.trim() === "") {
      toast.error("Milestone title cannot be empty");
      return;
    }

    const milestone: Milestone = {
      id: Date.now().toString(),
      ...newMilestone,
      photoUrl: selectedPhoto || undefined,
    };

    setMilestones([...milestones, milestone]);
    setNewMilestone({
      title: "",
      description: "",
      date: new Date(),
      category: "fitness",
    });
    setSelectedPhoto(null);
    setIsDialogOpen(false);
    toast.success("Milestone added successfully");
  };

  const deleteMilestone = (id: string) => {
    setMilestones(milestones.filter((milestone) => milestone.id !== id));
    toast.success("Milestone deleted successfully");
  };

  // Handle file upload (simulate for now with placeholder)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, we would upload the file to storage
    // Here we'll just set a placeholder URL
    setSelectedPhoto("https://placehold.co/400x300/purple/white?text=Glow+Up+Photo");
    toast.success("Photo uploaded");
  };

  // Sort milestones by date (newest first)
  const sortedMilestones = [...milestones].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Glow Up</h1>
        <p className="text-muted-foreground mt-1">
          Track your personal transformation journey
        </p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="button-effect">
              <Plus className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Milestone</DialogTitle>
              <DialogDescription>
                Document a milestone in your transformation journey.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Milestone Title</Label>
                <Input
                  id="title"
                  placeholder="Milestone title"
                  value={newMilestone.title}
                  onChange={(e) =>
                    setNewMilestone({ ...newMilestone, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your milestone"
                  rows={3}
                  value={newMilestone.description}
                  onChange={(e) =>
                    setNewMilestone({ ...newMilestone, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newMilestone.category}
                  onValueChange={(value: string) =>
                    setNewMilestone({ ...newMilestone, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                    <SelectItem value="skincare">Skincare</SelectItem>
                    <SelectItem value="style">Style</SelectItem>
                    <SelectItem value="confidence">Confidence</SelectItem>
                    <SelectItem value="skill">New Skill</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newMilestone.date.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setNewMilestone({ 
                      ...newMilestone, 
                      date: new Date(e.target.value) 
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Photo (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('photo')?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
                {selectedPhoto && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Photo uploaded successfully
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addMilestone}>Add Milestone</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sortedMilestones.length > 0 ? (
          sortedMilestones.map((milestone) => (
            <Card key={milestone.id} className="glass-effect hover-scale">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-pink-500" />
                      <CardTitle>{milestone.title}</CardTitle>
                      <Badge>{milestone.category}</Badge>
                    </div>
                    <CardDescription className="mt-1">
                      {milestone.date.toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <button
                    onClick={() => deleteMilestone(milestone.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{milestone.description}</p>
                {milestone.photoUrl && (
                  <div className="mt-4">
                    <img 
                      src={milestone.photoUrl} 
                      alt={milestone.title} 
                      className="w-full h-auto rounded-md object-cover" 
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>No Milestones Yet</CardTitle>
              <CardDescription>Start documenting your transformation journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-muted-foreground">
                Click the "Add Milestone" button to record your first transformation milestone.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GlowUpPage;
