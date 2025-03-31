
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Target } from "lucide-react";
import { TaskData } from "../../services/taskService";
import { toast } from "sonner";

interface GoalFormProps {
  onAddGoal: (goal: TaskData) => void;
}

const GoalForm = ({ onAddGoal }: GoalFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newGoal, setNewGoal] = useState<Omit<TaskData, "id" | "createdAt">>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  const handleAddGoal = () => {
    if (newGoal.title.trim() === "") {
      toast.error("Goal title cannot be empty");
      return;
    }

    // Set status to "goal" for goal items
    onAddGoal({
      ...newGoal,
      status: "goal"
    });
    
    setNewGoal({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="button-effect" variant="secondary">
          <Target className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
          <DialogDescription>
            Create a new goal to track your progress.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="goal-title">Goal Title</Label>
            <Input
              id="goal-title"
              placeholder="Goal title"
              value={newGoal.title}
              onChange={(e) =>
                setNewGoal({ ...newGoal, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goal-description">Description (optional)</Label>
            <Textarea
              id="goal-description"
              placeholder="Goal description"
              rows={3}
              value={newGoal.description}
              onChange={(e) =>
                setNewGoal({ ...newGoal, description: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={newGoal.priority}
              onValueChange={(value: "low" | "medium" | "high") =>
                setNewGoal({ ...newGoal, priority: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddGoal}>Add Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GoalForm;
