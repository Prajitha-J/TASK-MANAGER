
import { connectToDatabase, Task } from '../lib/mongodb';

// Function to migrate tasks from localStorage to MongoDB
export async function migrateTasksToMongoDB(userId: string) {
  try {
    await connectToDatabase();
    
    // Get tasks from localStorage
    const tasksKey = `tasks-${userId}`;
    const tasksJson = localStorage.getItem(tasksKey);
    
    if (!tasksJson) {
      console.log('No tasks found in localStorage to migrate');
      return [];
    }
    
    const localTasks = JSON.parse(tasksJson);
    const migratedTasks = [];
    
    // For each task in localStorage, create a new document in MongoDB
    for (const task of localTasks) {
      const newTask = new Task({
        userId: userId,
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        createdAt: new Date(task.createdAt) || new Date()
      });
      
      const savedTask = await newTask.save();
      migratedTasks.push(savedTask);
    }
    
    // Optional: Clear the localStorage after successful migration
    // localStorage.removeItem(tasksKey);
    
    console.log(`Successfully migrated ${migratedTasks.length} tasks to MongoDB`);
    return migratedTasks;
  } catch (error) {
    console.error('Failed to migrate tasks to MongoDB', error);
    throw error;
  }
}
