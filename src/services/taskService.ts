
import { connectToDatabase, Task } from '../lib/mongodb';

export interface TaskData {
  id?: string;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done" | "goal";
  priority: "low" | "medium" | "high";
  createdAt?: Date;
}

// Initialize the database connection
const initDB = async () => {
  try {
    await connectToDatabase();
    return true;
  } catch (error) {
    console.error('Failed to initialize database', error);
    return false;
  }
};

// Get all tasks for a user
export const getTasks = async (userId: string): Promise<TaskData[]> => {
  try {
    await initDB();
    
    // Use toArray() to convert the cursor to an array of documents
    const tasksQuery = Task.find({ userId }).sort({ createdAt: -1 });
    const tasks = await tasksQuery.lean();
    
    return tasks.map(task => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt,
    }));
  } catch (error) {
    console.error('Failed to fetch tasks', error);
    return [];
  }
};

// Create a new task
export const createTask = async (userId: string, taskData: TaskData): Promise<TaskData | null> => {
  try {
    await initDB();
    // Create a new task document and save it
    const taskDoc = new Task({
      userId,
      ...taskData,
    });
    
    const newTask = await taskDoc.save();
    
    return {
      id: newTask._id.toString(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      createdAt: newTask.createdAt,
    };
  } catch (error) {
    console.error('Failed to create task', error);
    return null;
  }
};

// Update a task
export const updateTask = async (taskId: string, taskData: Partial<TaskData>): Promise<boolean> => {
  try {
    await initDB();
    // Use lean() to get a plain JavaScript object
    const updateQuery = Task.findByIdAndUpdate(taskId, taskData);
    const result = await updateQuery.lean();
    return !!result; // Convert to boolean
  } catch (error) {
    console.error('Failed to update task', error);
    return false;
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    await initDB();
    // Use lean() to get a plain JavaScript object
    const deleteQuery = Task.findByIdAndDelete(taskId);
    const result = await deleteQuery.lean();
    return !!result; // Convert to boolean
  } catch (error) {
    console.error('Failed to delete task', error);
    return false;
  }
};
