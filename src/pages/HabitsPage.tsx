
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Activity, Bell, CheckCircle2, Plus, Trash2, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Habit {
  id: string;
  name: string;
  category: string;
  frequency: "daily" | "weekly" | "monthly";
  streak: number;
  lastCompleted: string | null;
}

const HabitsPage = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState<Omit<Habit, "id" | "streak" | "lastCompleted">>({
    name: "",
    category: "health",
    frequency: "daily",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load habits from localStorage on component mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.name.trim() === "") {
      toast.error("Habit name cannot be empty");
      return;
    }

    const habit: Habit = {
      id: Date.now().toString(),
      ...newHabit,
      streak: 0,
      lastCompleted: null,
    };

    setHabits([...habits, habit]);
    setNewHabit({
      name: "",
      category: "health",
      frequency: "daily",
    });
    setIsDialogOpen(false);
    toast.success("Habit added successfully");
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
    toast.success("Habit deleted successfully");
  };

  const completeHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          // Check if already completed today
          if (habit.lastCompleted === today) {
            return habit;
          }
          
          return {
            ...habit,
            streak: habit.streak + 1,
            lastCompleted: today,
          };
        }
        return habit;
      })
    );
    toast.success("Habit marked as complete");
  };

  const isHabitCompletedToday = (habit: Habit) => {
    const today = new Date().toISOString().split('T')[0];
    return habit.lastCompleted === today;
  };

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Habits Stacking</h1>
        <p className="text-muted-foreground mt-1">
          Build and maintain positive habits
        </p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="button-effect">
              <Plus className="mr-2 h-4 w-4" />
              Add Habit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Habit</DialogTitle>
              <DialogDescription>
                Create a new habit to track consistently.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Habit Name</Label>
                <Input
                  id="name"
                  placeholder="Habit name"
                  value={newHabit.name}
                  onChange={(e) =>
                    setNewHabit({ ...newHabit, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newHabit.category}
                  onValueChange={(value: string) =>
                    setNewHabit({ ...newHabit, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="mindfulness">Mindfulness</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={newHabit.frequency}
                  onValueChange={(value: any) =>
                    setNewHabit({ ...newHabit, frequency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addHabit}>Add Habit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <Card key={habit.id} className="glass-effect hover-scale">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      <CardTitle className="text-xl">{habit.name}</CardTitle>
                    </div>
                    <CardDescription className="mt-1">
                      {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)} habit
                    </CardDescription>
                  </div>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge className="bg-blue-500">{habit.category}</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Activity className="h-4 w-4" />
                    <span>Streak: {habit.streak}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Button
                    variant={isHabitCompletedToday(habit) ? "secondary" : "default"}
                    size="sm"
                    onClick={() => completeHabit(habit.id)}
                    disabled={isHabitCompletedToday(habit)}
                    className="w-full"
                  >
                    {isHabitCompletedToday(habit) ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Completed Today
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="glass-effect md:col-span-2">
            <CardHeader>
              <CardTitle>No Habits Yet</CardTitle>
              <CardDescription>Start building positive habits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-muted-foreground">
                Click the "Add Habit" button to start tracking your daily, weekly, or monthly habits.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HabitsPage;
