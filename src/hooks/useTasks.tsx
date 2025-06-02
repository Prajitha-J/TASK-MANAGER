
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask, getTeamTasks, shareTaskWithTeam, TaskData } from '../services/taskService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export const useTasks = (teamId?: string) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const userId = currentUser?.uid || 'anonymous';

  // If teamId is provided, fetch team tasks, otherwise fetch user tasks
  const queryKey = teamId ? ['tasks', 'team', teamId] : ['tasks', userId];
  const fetchFunction = teamId ? () => getTeamTasks(teamId) : () => getTasks(userId);

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    enabled: teamId ? !!teamId : !!userId,
  });

  const createTaskMutation = useMutation({
    mutationFn: (newTask: TaskData) => createTask(userId, newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
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
      queryClient.invalidateQueries({ queryKey: queryKey });
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
      queryClient.invalidateQueries({ queryKey: queryKey });
      toast.success('Task deleted successfully');
    },
    onError: (error: any) => {
      console.error('Failed to delete task', error);
      toast.error('Failed to delete task');
    }
  });

  const shareTaskMutation = useMutation({
    mutationFn: ({ taskId, teamId }: { taskId: string, teamId: string }) => 
      shareTaskWithTeam(taskId, teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      toast.success('Task shared with team successfully');
    },
    onError: (error: any) => {
      console.error('Failed to share task with team', error);
      toast.error('Failed to share task with team');
    }
  });

  const addTask = (task: TaskData) => {
    createTaskMutation.mutate({
      ...task,
      userId,
      teamId: teamId || undefined
    });
  };

  const updateTaskStatus = (taskId: string, status: "todo" | "inProgress" | "done" | "goal") => {
    updateTaskMutation.mutate({ taskId, taskData: { status } });
  };

  const removeTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
  };

  const shareTask = (taskId: string, teamId: string) => {
    shareTaskMutation.mutate({ taskId, teamId });
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
    updateTaskStatus,
    removeTask,
    shareTask
  };
};
