
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TaskData } from "../../services/taskService";
import { CheckSquare, Circle, Square, Target, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: TaskData;
  status: TaskData["status"];
  onStatusChange: (taskId: string, status: TaskData["status"]) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard = ({ task, status, onStatusChange, onDelete }: TaskCardProps) => {
  const getStatusIcon = (status: TaskData["status"]) => {
    switch (status) {
      case "todo":
        return <Square className="h-5 w-5 text-muted-foreground" />;
      case "inProgress":
        return <Circle className="h-5 w-5 text-blue-500" />;
      case "done":
        return <CheckSquare className="h-5 w-5 text-green-500" />;
      case "goal":
        return <Target className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
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

  const handleStatusClick = () => {
    if (!task.id) return;

    let nextStatus: TaskData["status"];
    
    if (status === "todo") {
      nextStatus = "inProgress";
    } else if (status === "inProgress") {
      nextStatus = "done";
    } else if (status === "done") {
      nextStatus = "todo";
    } else {
      // For "goal" status, it stays as "goal"
      nextStatus = "goal";
    }
    
    onStatusChange(task.id, nextStatus);
  };

  return (
    <div
      className="flex items-start space-x-3 p-3 bg-card/50 rounded-md hover-scale"
    >
      <button
        onClick={handleStatusClick}
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
          onClick={() => task.id && onDelete(task.id)}
          className="text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
