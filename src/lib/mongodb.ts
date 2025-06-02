
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

// Define the User schema
const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: String,
  profileComplete: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    enum: ["student", "employee", "personal"],
  },
  phone: String,
  dob: String,
  teams: [{
    teamId: String,
    name: String,
    role: {
      type: String,
      enum: ["owner", "member"],
      default: "member"
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
  teamId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the Team schema for collaboration
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  ownerId: {
    type: String,
    required: true,
  },
  members: [{
    userId: String,
    email: String,
    role: {
      type: String,
      enum: ["owner", "member"],
      default: "member"
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Define interfaces for TypeScript
export interface IUser {
  uid: string;
  email: string;
  name?: string;
  profileComplete: boolean;
  mode?: "student" | "employee" | "personal";
  phone?: string;
  dob?: string;
  teams?: Array<{
    teamId: string;
    name: string;
    role: "owner" | "member";
  }>;
  createdAt: Date;
}

export interface ITask {
  userId: string;
  title: string;
  description?: string;
  status: "todo" | "inProgress" | "done" | "goal";
  priority: "low" | "medium" | "high";
  teamId?: string;
  createdAt: Date;
}

export interface ITeam {
  name: string;
  description?: string;
  ownerId: string;
  members: Array<{
    userId: string;
    email: string;
    role: "owner" | "member";
    joinedAt: Date;
  }>;
  createdAt: Date;
}

// Create models safely
let User: mongoose.Model<IUser>;
if (mongoose.models && 'User' in mongoose.models) {
  User = mongoose.models.User as mongoose.Model<IUser>;
} else {
  User = mongoose.model<IUser>('User', userSchema);
}

let Task: mongoose.Model<ITask>;
if (mongoose.models && 'Task' in mongoose.models) {
  Task = mongoose.models.Task as mongoose.Model<ITask>;
} else {
  Task = mongoose.model<ITask>('Task', taskSchema);
}

let Team: mongoose.Model<ITeam>;
if (mongoose.models && 'Team' in mongoose.models) {
  Team = mongoose.models.Team as mongoose.Model<ITeam>;
} else {
  Team = mongoose.model<ITeam>('Team', teamSchema);
}

// Export the models
export { User, Task, Team };

// Function to save/update user data to MongoDB
export async function saveUserToMongoDB(userData: {
  uid: string;
  email: string;
  name?: string;
  profileComplete?: boolean;
  mode?: "student" | "employee" | "personal";
  phone?: string;
  dob?: string;
  teams?: Array<{
    teamId: string;
    name: string;
    role: "owner" | "member";
  }>;
}) {
  try {
    await connectToDatabase();
    
    // Try to find existing user first
    const existingUser = await User.findOne({ uid: userData.uid }).lean();
    
    if (existingUser) {
      // Update existing user
      await User.updateOne({ uid: userData.uid }, { $set: userData });
      console.log('User updated in MongoDB');
      return existingUser._id;
    } else {
      // Create new user
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      console.log('New user saved to MongoDB');
      return savedUser._id;
    }
  } catch (error) {
    console.error('Failed to save user to MongoDB', error);
    throw error;
  }
}

// Team management functions
export async function createTeam(teamData: {
  name: string;
  description?: string;
  ownerId: string;
  ownerEmail: string;
}) {
  try {
    await connectToDatabase();
    
    const newTeam = new Team({
      name: teamData.name,
      description: teamData.description || '',
      ownerId: teamData.ownerId,
      members: [{
        userId: teamData.ownerId,
        email: teamData.ownerEmail,
        role: 'owner',
        joinedAt: new Date()
      }]
    });
    
    const savedTeam = await newTeam.save();
    
    // Add team to the owner's user profile
    await User.updateOne(
      { uid: teamData.ownerId },
      { 
        $push: { 
          teams: {
            teamId: savedTeam._id.toString(),
            name: teamData.name,
            role: 'owner'
          }
        }
      }
    );
    
    return savedTeam._id.toString();
  } catch (error) {
    console.error('Failed to create team', error);
    throw error;
  }
}

export async function addTeamMember(teamId: string, memberData: {
  userId: string;
  email: string;
}) {
  try {
    await connectToDatabase();
    
    // Check if member already exists
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    
    const memberExists = team.members.some(m => m.userId === memberData.userId);
    if (memberExists) {
      return teamId; // Member already exists, nothing to do
    }
    
    // Add member to team
    await Team.updateOne(
      { _id: teamId },
      { 
        $push: { 
          members: {
            userId: memberData.userId,
            email: memberData.email,
            role: 'member',
            joinedAt: new Date()
          }
        }
      }
    );
    
    // Add team to user's profile
    await User.updateOne(
      { uid: memberData.userId },
      { 
        $push: { 
          teams: {
            teamId: teamId,
            name: team.name,
            role: 'member'
          }
        }
      }
    );
    
    return teamId;
  } catch (error) {
    console.error('Failed to add team member', error);
    throw error;
  }
}

export async function getUserTeams(userId: string) {
  try {
    await connectToDatabase();
    
    const user = await User.findOne({ uid: userId }).lean();
    
    if (!user || !user.teams) {
      return [];
    }
    
    const teamIds = user.teams.map(t => t.teamId);
    
    const teams = await Team.find({
      _id: { $in: teamIds }
    }).lean();
    
    return teams.map((team: any) => ({
      ...team,
      id: team._id.toString(),
      userRole: user.teams?.find(t => t.teamId === team._id.toString())?.role || 'member'
    }));
  } catch (error) {
    console.error('Failed to get user teams', error);
    return [];
  }
}
