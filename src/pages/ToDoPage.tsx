
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckSquare, Circle, Plus, PlusCircle, Square, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTasks } from "../hooks/useTasks";
import { TaskData } from "../services/taskService";
import { toast } from "sonner";

const ToDoPage = () => {
  const { tasks, isLoading, addTask, updateTaskStatus, removeTask } = useTasks();
  const [newTask, setNewTask] = useState<Omit<TaskData, "id" | "createdAt">>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTask = () => {
    if (newTask.title.trim() === "") {
      toast.error("Task title cannot be empty");
      return;
    }

    addTask(newTask);
    setNewTask({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
    });
    setIsDialogOpen(false);
  };

  const getPriorityColor = (priority: TaskData["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
      case "low":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: TaskData["status"]) => {
    switch (status) {
      case "todo":
        return <Square className="h-5 w-5 text-muted-foreground" />;
      case "inProgress":
        return <Circle className="h-5 w-5 text-blue-500" />;
      case "done":
        return <CheckSquare className="h-5 w-5 text-green-500" />;
      case "goal":
        return <PlusCircle className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const filterTasksByStatus = (status: TaskData["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  const renderTaskList = (status: TaskData["status"]) => {
    const filteredTasks = filterTasksByStatus(status);

    if (isLoading) {
      return (
        <div className="text-center p-6">
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      );
    }

    if (filteredTasks.length === 0) {
      return (
        <div className="text-center p-6">
          <p className="text-muted-foreground">No tasks</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start space-x-3 p-3 bg-card/50 rounded-md hover-scale"
          >
            <button
              onClick={() => {
                const nextStatus =
                  status === "todo"
                    ? "inProgress"
                    : status === "inProgress"
                    ? "done"
                    : status === "done"
                    ? "todo"
                    : "inProgress";
                
                if (task.id) {
                  updateTaskStatus(task.id, nextStatus);
                }
              }}
              className="mt-1"
            >
              {getStatusIcon(status)}
            </button>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{task.title}</h4>
              {task.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Badge
                className={`${getPriorityColor(task.priority)} text-xs font-normal`}
              >
                {task.priority}
              </Badge>
              <button
                onClick={() => task.id && removeTask(task.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">To-Do List</h1>
        <p className="text-muted-foreground mt-1">
          Organize and manage your tasks
        </p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="button-effect">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task to keep track of your work.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Task description"
                  rows={3}
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newTask.status}
                    onValueChange={(value: any) =>
                      setNewTask({ ...newTask, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="inProgress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                      <SelectItem value="goal">Goal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: any) =>
                      setNewTask({ ...newTask, priority: value })
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
            </div>
            <DialogFooter>
              <Button onClick={handleAddTask}>Add Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="todo" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="todo" className="relative">
            To Do
            {filterTasksByStatus("todo").length > 0 && (
              <Badge className="ml-2 absolute -top-2 -right-2">
                {filterTasksByStatus("todo").length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="inProgress">
            In Progress
            {filterTasksByStatus("inProgress").length > 0 && (
              <Badge className="ml-2 absolute -top-2 -right-2">
                {filterTasksByStatus("inProgress").length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="done">
            Done
            {filterTasksByStatus("done").length > 0 && (
              <Badge className="ml-2 absolute -top-2 -right-2">
                {filterTasksByStatus("done").length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="goals">
            Goals
            {filterTasksByStatus("goal").length > 0 && (
              <Badge className="ml-2 absolute -top-2 -right-2">
                {filterTasksByStatus("goal").length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <Card className="glass-effect">
          <CardHeader className="pb-3">
            <CardTitle>Task List</CardTitle>
            <CardDescription>Manage your tasks and goals</CardDescription>
            <Separator className="mt-4" />
          </CardHeader>
          <CardContent>
            <TabsContent value="todo" className="mt-0">
              {renderTaskList("todo")}
            </TabsContent>
            <TabsContent value="inProgress" className="mt-0">
              {renderTaskList("inProgress")}
            </TabsContent>
            <TabsContent value="done" className="mt-0">
              {renderTaskList("done")}
            </TabsContent>
            <TabsContent value="goals" className="mt-0">
              {renderTaskList("goal")}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default ToDoPage;
