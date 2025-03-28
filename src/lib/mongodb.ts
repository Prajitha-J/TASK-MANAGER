
import mongoose from 'mongoose';

// MongoDB connection string - replace with your actual connection string
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/taskmanager';

// This function connects to MongoDB
export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

// Define the Task schema
const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["todo", "inProgress", "done", "goal"],
    default: "todo",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create or get the Task model - Fixed to handle model registration properly
export const Task = (() => {
  // Check if the model is already registered
  try {
    return mongoose.model('Task');
  } catch (error) {
    // Model not registered yet, so register it
    return mongoose.model('Task', taskSchema);
  }
})();
