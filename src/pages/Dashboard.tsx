
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, CheckCircle2, Clock, ClipboardList, AlertTriangle } from "lucide-react";
import { useTasks } from "../hooks/useTasks";

const Dashboard = () => {
  const { userData } = useAuth();
  const { tasks } = useTasks();
  const navigate = useNavigate();
  
  // Format the mode for display
  const formatMode = (mode: string | undefined) => {
    if (!mode) return "";
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  };

  // Count tasks by status
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "done").length;
  const upcomingTasks = tasks.filter(task => task.status === "todo" || task.status === "inProgress").length;
  
  // Calculate urgent tasks (high priority tasks)
  const urgentTasks = tasks.filter(task => task.priority === "high").length;

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Welcome, {userData?.name}</h1>
        <p className="text-muted-foreground mt-1">
          {formatMode(userData?.mode)} Dashboard
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card 
          className="hover-scale glass-effect cursor-pointer"
          onClick={() => navigate('/to-do')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <CardDescription>Total tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalTasks > 0 ? totalTasks : "Nil"}</div>
              <ClipboardList className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="hover-scale glass-effect cursor-pointer"
          onClick={() => navigate('/to-do')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CardDescription>Finished tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{completedTasks > 0 ? completedTasks : "Nil"}</div>
              <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="hover-scale glass-effect cursor-pointer"
          onClick={() => navigate('/deadlines')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <CardDescription>Due in 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{upcomingTasks > 0 ? upcomingTasks : "Nil"}</div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="hover-scale glass-effect cursor-pointer"
          onClick={() => navigate('/events')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
            <CardDescription>Upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">Nil</div>
              <CalendarDays className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {userData?.mode === 'employee' && (
          <Card 
            className="hover-scale glass-effect cursor-pointer"
            onClick={() => navigate('/urgent')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Urgent</CardTitle>
              <CardDescription>High priority</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{urgentTasks > 0 ? urgentTasks : "Nil"}</div>
                <AlertTriangle className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Recent Notes</CardTitle>
            <CardDescription>Your latest notes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Your recent notes will appear here
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Your upcoming deadlines will appear here
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
