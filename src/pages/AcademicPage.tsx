
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Award, GraduationCap, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  name: string;
  type: string;
  level: string;
  date: string;
}

const AcademicPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newActivity, setNewActivity] = useState<Omit<Activity, 'id'>>({
    name: "",
    type: "",
    level: "",
    date: new Date().toISOString().split('T')[0]
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Load saved activities from localStorage
    const savedActivities = localStorage.getItem('extracurricular');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, []);

  const saveActivities = (updatedActivities: Activity[]) => {
    localStorage.setItem('extracurricular', JSON.stringify(updatedActivities));
    setActivities(updatedActivities);
  };

  const handleAddActivity = () => {
    if (!newActivity.name || !newActivity.type || !newActivity.level) {
      toast.error("Please fill in all required fields");
      return;
    }

    const activity: Activity = {
      ...newActivity,
      id: Date.now().toString()
    };

    const updatedActivities = [...activities, activity];
    saveActivities(updatedActivities);
    
    setNewActivity({
      name: "",
      type: "",
      level: "",
      date: new Date().toISOString().split('T')[0]
    });
    
    setIsDialogOpen(false);
    toast.success("Activity added successfully");
  };

  const handleDeleteActivity = (id: string) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    saveActivities(updatedActivities);
    toast.success("Activity deleted");
  };

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Beyond Academic</h1>
        <p className="text-muted-foreground mt-1">
          Track extracurricular activities and personal development
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-effect">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Extracurricular Activities</CardTitle>
              <CardDescription>Track your activities beyond academics</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Activity
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Extracurricular Activity</DialogTitle>
                  <DialogDescription>
                    Fill in the details for your extracurricular activity
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="activity-name">Activity Name</Label>
                    <Input
                      id="activity-name"
                      placeholder="e.g. Chess Club, Debate Team"
                      value={newActivity.name}
                      onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="activity-type">Activity Type</Label>
                    <Select 
                      value={newActivity.type} 
                      onValueChange={(value) => setNewActivity({...newActivity, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="clubs">Clubs</SelectItem>
                        <SelectItem value="volunteer">Volunteer Work</SelectItem>
                        <SelectItem value="competition">Competition</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="activity-level">Achievement Level</Label>
                    <Select 
                      value={newActivity.level} 
                      onValueChange={(value) => setNewActivity({...newActivity, level: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select achievement level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="participant">Participant</SelectItem>
                        <SelectItem value="school">School Level</SelectItem>
                        <SelectItem value="district">District Level</SelectItem>
                        <SelectItem value="state">State Level</SelectItem>
                        <SelectItem value="national">National Level</SelectItem>
                        <SelectItem value="international">International Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="activity-date">Date</Label>
                    <Input
                      id="activity-date"
                      type="date"
                      value={newActivity.date}
                      onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleAddActivity}>
                    Add Activity
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {activities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activities.map((activity) => (
                  <Card key={activity.id} className="hover-scale">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{activity.name}</CardTitle>
                          <CardDescription>
                            {new Date(activity.date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive" 
                          onClick={() => handleDeleteActivity(activity.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="capitalize">
                          {activity.type}
                        </Badge>
                        <Badge variant="secondary" className="capitalize">
                          {activity.level.replace(/([A-Z])/g, ' $1').trim()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                <p>No extracurricular activities added yet.</p>
                <p className="text-sm mt-2">Click "Add Activity" to track your extracurricular achievements</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcademicPage;
