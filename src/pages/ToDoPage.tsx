
import React from "react";
import TaskForm from "../components/tasks/TaskForm";
import GoalForm from "../components/tasks/GoalForm";
import TaskTabs from "../components/tasks/TaskTabs";
import { useTasks } from "../hooks/useTasks";
import { TaskData } from "../services/taskService";

const ToDoPage = () => {
  const { tasks, isLoading, addTask, updateTaskStatus, removeTask } = useTasks();

  const handleAddTask = (task: TaskData) => {
    addTask(task);
  };

  const handleAddGoal = (task: TaskData) => {
    // The GoalForm component already sets status to "goal"
    addTask(task);
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
      </div>

      <TaskTabs 
        tasks={tasks}
        isLoading={isLoading}
        onStatusChange={updateTaskStatus}
        onDelete={removeTask}
      />
    </div>
  );
};

export default ToDoPage;
