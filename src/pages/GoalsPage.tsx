
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Flag, TrendingUp, Award, Calendar, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  category: string;
  progress: number;
}

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Omit<Goal, "id">>({
    title: "",
    description: "",
    targetDate: new Date(),
    category: "personal",
    progress: 0,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('personalGoals');
    if (savedGoals) {
      const parsedGoals = JSON.parse(savedGoals);
      
      // Convert string dates back to Date objects
      const formattedGoals = parsedGoals.map((goal: any) => ({
        ...goal,
        targetDate: new Date(goal.targetDate)
      }));
      
      setGoals(formattedGoals);
    }
  }, []);

  // Save goals to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem('personalGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (newGoal.title.trim() === "") {
      toast.error("Goal title cannot be empty");
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal,
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: "",
      description: "",
      targetDate: new Date(),
      category: "personal",
      progress: 0,
    });
    setIsDialogOpen(false);
    toast.success("Goal added successfully");
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
    toast.success("Goal deleted successfully");
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, progress } : goal
      )
    );
    toast.success("Progress updated");
  };

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Goals</h1>
        <p className="text-muted-foreground mt-1">
          Set and track your personal and professional goals
        </p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="button-effect">
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
              <DialogDescription>
                Create a goal to track your progress.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="Goal title"
                  value={newGoal.title}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Goal description"
                  rows={3}
                  value={newGoal.description}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newGoal.category}
                  onValueChange={(value: string) =>
                    setNewGoal({ ...newGoal, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.targetDate.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setNewGoal({ 
                      ...newGoal, 
                      targetDate: new Date(e.target.value) 
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addGoal}>Add Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <Card key={goal.id} className="glass-effect hover-scale">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-500" />
                      <CardTitle>{goal.title}</CardTitle>
                      <Badge>{goal.category}</Badge>
                    </div>
                    <CardDescription className="mt-1">
                      Target: {goal.targetDate.toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{goal.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex justify-between gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateGoalProgress(goal.id, Math.max(0, goal.progress - 10))}
                      disabled={goal.progress <= 0}
                    >
                      -10%
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateGoalProgress(goal.id, Math.min(100, goal.progress + 10))}
                      disabled={goal.progress >= 100}
                    >
                      +10%
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateGoalProgress(goal.id, 0)}
                    >
                      Reset
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateGoalProgress(goal.id, 100)}
                    >
                      Complete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>No Goals Yet</CardTitle>
              <CardDescription>Start creating goals to track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-muted-foreground">
                Click the "Add Goal" button to create your first goal and start tracking your progress.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
