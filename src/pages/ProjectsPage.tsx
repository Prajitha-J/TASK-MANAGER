
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ClipboardList, Clock, Info, Calendar, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProjectsPage = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Project Deadlines</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track your project deadlines
        </p>
      </header>

      <Alert className="mb-6 bg-blue-500/10 border-blue-500/20">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertTitle>Coming Soon</AlertTitle>
        <AlertDescription>
          We're currently developing this feature. Soon you'll be able to manage your projects and track important deadlines.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-blue-500" />
              Active Projects
            </CardTitle>
            <CardDescription>Manage your current projects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Keep track of all your active projects and their progress in one place.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-red-500" />
              Deadline Tracker
            </CardTitle>
            <CardDescription>Never miss important deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Get notifications for upcoming deadlines and prioritize your tasks accordingly.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-amber-500" />
              Project Timeline
            </CardTitle>
            <CardDescription>Visualize project schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              See all your project milestones and deadlines on an interactive timeline.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-green-500" />
              Team Assignments
            </CardTitle>
            <CardDescription>Manage team responsibilities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Assign tasks to team members and track individual contributions to projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectsPage;
