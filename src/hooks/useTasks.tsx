
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask, TaskData } from '../services/taskService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export const useTasks = () => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const userId = currentUser?.uid || 'anonymous';

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', userId],
    queryFn: () => getTasks(userId),
    enabled: !!userId,
  });

  const createTaskMutation = useMutation({
    mutationFn: (newTask: TaskData) => createTask(userId, newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
      toast.success('Task created successfully');
    },
    onError: (error: any) => {
      console.error('Failed to create task', error);
      toast.error('Failed to create task');
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, taskData }: { taskId: string, taskData: Partial<TaskData> }) => 
      updateTask(taskId, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
      toast.success('Task updated successfully');
    },
    onError: (error: any) => {
      console.error('Failed to update task', error);
      toast.error('Failed to update task');
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
      toast.success('Task deleted successfully');
    },
    onError: (error: any) => {
      console.error('Failed to delete task', error);
      toast.error('Failed to delete task');
    }
  });

  const addTask = (task: TaskData) => {
    createTaskMutation.mutate(task);
  };

  const updateTaskStatus = (taskId: string, status: "todo" | "inProgress" | "done" | "goal") => {
    updateTaskMutation.mutate({ taskId, taskData: { status } });
  };

  const removeTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
    updateTaskStatus,
    removeTask
  };
};
