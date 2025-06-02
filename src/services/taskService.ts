
export interface TaskData {
  id?: string;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done" | "goal";
  priority: "low" | "medium" | "high";
  createdAt?: Date;
  userId: string;
  teamId?: string;
}

// Get all tasks for a user from localStorage
export const getTasks = async (userId: string): Promise<TaskData[]> => {
  try {
    const tasksKey = `tasks-${userId}`;
    const tasksJson = localStorage.getItem(tasksKey);
    
    if (!tasksJson) {
      return [];
    }
    
    return JSON.parse(tasksJson).map((task: any) => ({
      ...task,
      createdAt: task.createdAt ? new Date(task.createdAt) : new Date()
    }));
  } catch (error) {
    console.error('Failed to fetch tasks', error);
    return [];
  }
};

// Create a new task in localStorage
export const createTask = async (userId: string, taskData: TaskData): Promise<TaskData | null> => {
  try {
    const tasksKey = `tasks-${userId}`;
    const tasksJson = localStorage.getItem(tasksKey);
    const tasks = tasksJson ? JSON.parse(tasksJson) : [];
    
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      createdAt: new Date()
    };
    
    tasks.unshift(newTask);
    localStorage.setItem(tasksKey, JSON.stringify(tasks));
    
    return newTask;
  } catch (error) {
    console.error('Failed to create task', error);
    return null;
  }
};

// Update a task in localStorage
export const updateTask = async (taskId: string, taskData: Partial<TaskData>): Promise<boolean> => {
  try {
    const userId = taskData.userId || localStorage.getItem('currentUserId');
    if (!userId) return false;
    
    const tasksKey = `tasks-${userId}`;
    const tasksJson = localStorage.getItem(tasksKey);
    
    if (!tasksJson) {
      return false;
    }
    
    const tasks = JSON.parse(tasksJson);
    const taskIndex = tasks.findIndex((task: TaskData) => task.id === taskId);
    
    if (taskIndex === -1) {
      return false;
    }
    
    tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
    localStorage.setItem(tasksKey, JSON.stringify(tasks));
    
    return true;
  } catch (error) {
    console.error('Failed to update task', error);
    return false;
  }
};

// Delete a task from localStorage
export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    const userId = localStorage.getItem('currentUserId');
    if (!userId) return false;
    
    const tasksKey = `tasks-${userId}`;
    const tasksJson = localStorage.getItem(tasksKey);
    
    if (!tasksJson) {
      return false;
    }
    
    const tasks = JSON.parse(tasksJson);
    const updatedTasks = tasks.filter((task: TaskData) => task.id !== taskId);
    
    localStorage.setItem(tasksKey, JSON.stringify(updatedTasks));
    
    return true;
  } catch (error) {
    console.error('Failed to delete task', error);
    return false;
  }
};

// Get shared tasks for a team from localStorage
export const getTeamTasks = async (teamId: string): Promise<TaskData[]> => {
  try {
    // Collect all tasks from localStorage
    const allTasks: TaskData[] = [];
    
    // Loop through all localStorage items
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith('tasks-')) {
        const tasksJson = localStorage.getItem(key);
        if (tasksJson) {
          const tasks: TaskData[] = JSON.parse(tasksJson);
          const teamTasks = tasks.filter(task => task.teamId === teamId);
          allTasks.push(...teamTasks);
        }
      }
    }
    
    return allTasks.map(task => ({
      ...task,
      createdAt: task.createdAt ? new Date(task.createdAt) : new Date()
    }));
  } catch (error) {
    console.error('Failed to fetch team tasks', error);
    return [];
  }
};

// Add a task to a team collaboration
export const shareTaskWithTeam = async (taskId: string, teamId: string): Promise<boolean> => {
  try {
    const userId = localStorage.getItem('currentUserId');
    if (!userId) return false;
    
    const tasksKey = `tasks-${userId}`;
    const tasksJson = localStorage.getItem(tasksKey);
    
    if (!tasksJson) {
      return false;
    }
    
    const tasks = JSON.parse(tasksJson);
    const taskIndex = tasks.findIndex((task: TaskData) => task.id === taskId);
    
    if (taskIndex === -1) {
      return false;
    }
    
    tasks[taskIndex].teamId = teamId;
    localStorage.setItem(tasksKey, JSON.stringify(tasks));
    
    return true;
  } catch (error) {
    console.error('Failed to share task with team', error);
    return false;
  }
};
