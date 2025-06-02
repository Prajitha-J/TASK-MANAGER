
import React, { useEffect, useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import GoalForm from "../components/tasks/GoalForm";
import TaskTabs from "../components/tasks/TaskTabs";
import { useTasks } from "../hooks/useTasks";
import { TaskData } from "../services/taskService";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { migrateTasksToMongoDB } from "../utils/migrateToMongoDB";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Database, Share2 } from "lucide-react";

const ToDoPage = () => {
  const [showMigrationDialog, setShowMigrationDialog] = useState(false);
  const { tasks, isLoading, addTask, updateTaskStatus, removeTask, shareTask } = useTasks();
  const { currentUser } = useAuth();
  
  // Check if migration is needed
  useEffect(() => {
    if (!currentUser) return;
    
    const migrationDone = localStorage.getItem(`migration-done-${currentUser.uid}`);
    if (!migrationDone) {
      setShowMigrationDialog(true);
    }
  }, [currentUser]);

  const handleAddTask = (task: TaskData) => {
    addTask(task);
  };

  const handleAddGoal = (task: TaskData) => {
    // The GoalForm component already sets status to "goal"
    addTask(task);
  };
  
  const handleMigrateData = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to migrate data");
      return;
    }
    
    try {
      toast.info("Starting migration to MongoDB...");
      await migrateTasksToMongoDB(currentUser.uid);
      toast.success("Data successfully migrated to MongoDB!");
      localStorage.setItem(`migration-done-${currentUser.uid}`, "true");
      setShowMigrationDialog(false);
    } catch (error) {
      console.error("Migration failed:", error);
      toast.error("Failed to migrate data to MongoDB");
    }
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
        <div className="flex gap-4">
          <TaskForm onAddTask={handleAddTask} />
          <GoalForm onAddGoal={handleAddGoal} />
        </div>
        
        <Button variant="outline" onClick={() => setShowMigrationDialog(true)}>
          <Database className="mr-2 h-4 w-4" />
          Migrate to MongoDB
        </Button>
      </div>

      <TaskTabs 
        tasks={tasks}
        isLoading={isLoading}
        onStatusChange={updateTaskStatus}
        onDelete={removeTask}
      />
      
      {/* Migration Dialog */}
      <Dialog open={showMigrationDialog} onOpenChange={setShowMigrationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Migrate Your Data to MongoDB</DialogTitle>
            <DialogDescription>
              Your tasks are currently stored locally. Would you like to migrate them to MongoDB for secure cloud storage and collaboration features?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-2">Benefits of MongoDB storage:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Access your tasks from any device</li>
              <li>Safely backed up in the cloud</li>
              <li>Share tasks with team members</li>
              <li>Never lose your data if your browser storage is cleared</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMigrationDialog(false)}>
              Later
            </Button>
            <Button onClick={handleMigrateData}>
              <Database className="mr-2 h-4 w-4" />
              Migrate Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToDoPage;
