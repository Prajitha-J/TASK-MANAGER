import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CheckCircle2, Clock, ClipboardList, AlertTriangle, Calendar as CalendarIcon } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
}

const Dashboard = () => {
  const { userData } = useAuth();
  const { tasks } = useTasks();
  const navigate = useNavigate();
  const [urgentProjects, setUrgentProjects] = useState<any[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      
      const formattedProjects = parsedProjects
        .map((project: any) => ({
          ...project,
          deadline: new Date(project.deadline)
        }))
        .filter((project: any) => project.priority === 'urgent' || project.priority === 'high');
      
      setUrgentProjects(formattedProjects);
    }
    
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      
      const formattedEvents = parsedEvents.map((event: any) => ({
        ...event,
        date: new Date(event.date)
      }));
      
      setEvents(formattedEvents);
    }
  }, []);
  
  const formatMode = (mode: string | undefined) => {
    if (!mode) return "";
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "done").length;
  const upcomingTasks = tasks.filter(task => task.status === "todo" || task.status === "inProgress").length;
  
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
              <div className="text-2xl font-bold">{events.length > 0 ? events.length : "Nil"}</div>
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
                <div className="text-2xl font-bold">{urgentProjects.length > 0 ? urgentProjects.length : "Nil"}</div>
                <AlertTriangle className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted grid grid-cols-3 rounded-xl p-1 mb-6">
          <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
          <TabsTrigger value="upcoming" className="rounded-lg">Upcoming</TabsTrigger>
          <TabsTrigger value="urgent" className="rounded-lg">Urgent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
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
                {events.length > 0 ? (
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center p-2 hover:bg-accent/10 rounded-md">
                        <div className="mr-2 text-primary">
                          <CalendarIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()} {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Your upcoming deadlines will appear here
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-0">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks and events due soon</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingTasks > 0 || events.length > 0 ? (
                <div className="space-y-4">
                  {tasks.filter(task => task.status === "todo" || task.status === "inProgress")
                    .slice(0, 5)
                    .map((task) => (
                      <div key={task.id} className="flex items-center p-2 hover:bg-accent/10 rounded-md">
                        <div className="mr-2 text-primary">
                          <ClipboardList className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{task.title}</h4>
                          <div className="flex items-center mt-1">
                            <Badge className="text-xs" variant={task.priority === "high" ? "destructive" : "outline"}>
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  
                  {events.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center p-2 hover:bg-accent/10 rounded-md">
                      <div className="mr-2 text-primary">
                        <CalendarIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No upcoming tasks or events
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="urgent" className="mt-0">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Urgent Items</CardTitle>
              <CardDescription>High priority tasks and projects</CardDescription>
            </CardHeader>
            <CardContent>
              {urgentTasks > 0 || urgentProjects.length > 0 ? (
                <div className="space-y-4">
                  {tasks.filter(task => task.priority === "high")
                    .map((task) => (
                      <div key={task.id} className="flex items-center p-2 hover:bg-accent/10 rounded-md">
                        <div className="mr-2 text-destructive">
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{task.title}</h4>
                          <p className="text-xs text-muted-foreground">Task</p>
                        </div>
                      </div>
                    ))}
                  
                  {userData?.mode === 'employee' && urgentProjects.map((project) => (
                    <div key={project.id} className="flex items-center p-2 hover:bg-accent/10 rounded-md">
                      <div className="mr-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{project.title}</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">Project</p>
                          <Badge variant="outline" className="text-xs">
                            {project.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No urgent tasks or projects
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
