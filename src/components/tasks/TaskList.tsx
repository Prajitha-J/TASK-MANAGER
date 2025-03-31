
import React from "react";
import { TaskData } from "../../services/taskService";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: TaskData[];
  status: TaskData["status"];
  isLoading: boolean;
  onStatusChange: (taskId: string, status: TaskData["status"]) => void;
  onDelete: (taskId: string) => void;
}

const TaskList = ({
  tasks,
  status,
  isLoading,
  onStatusChange,
  onDelete
}: TaskListProps) => {
  if (isLoading) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">No tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          status={status}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
