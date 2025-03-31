
export interface TaskData {
  id?: string;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done" | "goal";
  priority: "low" | "medium" | "high";
  createdAt?: Date;
}

// Get all tasks for a user from localStorage
export const getTasks = async (userId: string): Promise<TaskData[]> => {
  try {
    const tasksString = localStorage.getItem(`tasks-${userId}`);
    if (!tasksString) return [];
    
    const tasks = JSON.parse(tasksString);
    return tasks.map((task: any) => ({
      ...task,
      createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
    }));
  } catch (error) {
    console.error('Failed to fetch tasks', error);
    return [];
  }
};

// Create a new task and save to localStorage
export const createTask = async (userId: string, taskData: TaskData): Promise<TaskData | null> => {
  try {
    const tasks = await getTasks(userId);
    
    const newTask = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    
    const updatedTasks = [newTask, ...tasks];
    localStorage.setItem(`tasks-${userId}`, JSON.stringify(updatedTasks));
    
    return newTask;
  } catch (error) {
    console.error('Failed to create task', error);
    return null;
  }
};

// Update a task in localStorage
export const updateTask = async (taskId: string, taskData: Partial<TaskData>): Promise<boolean> => {
  try {
    // Since we don't know which user this belongs to, we need to check all user tasks
    // This is inefficient but works for our purpose
    const localStorageKeys = Object.keys(localStorage);
    const taskKeys = localStorageKeys.filter(key => key.startsWith('tasks-'));
    
    for (const key of taskKeys) {
      const userId = key.replace('tasks-', '');
      const tasks = await getTasks(userId);
      
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex] = {
          ...tasks[taskIndex],
          ...taskData,
        };
        
        localStorage.setItem(key, JSON.stringify(tasks));
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Failed to update task', error);
    return false;
  }
};

// Delete a task from localStorage
export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    // Since we don't know which user this belongs to, we need to check all user tasks
    const localStorageKeys = Object.keys(localStorage);
    const taskKeys = localStorageKeys.filter(key => key.startsWith('tasks-'));
    
    for (const key of taskKeys) {
      const tasks = await getTasks(key.replace('tasks-', ''));
      
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      if (filteredTasks.length !== tasks.length) {
        localStorage.setItem(key, JSON.stringify(filteredTasks));
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Failed to delete task', error);
    return false;
  }
};
