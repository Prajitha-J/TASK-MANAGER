
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, Bell, Shield, Briefcase, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: "low" | "medium" | "high" | "urgent";
  team: string;
}

const UrgentPage = () => {
  const [urgentProjects, setUrgentProjects] = useState<Project[]>([]);

  // Load urgent projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      
      // Convert string dates back to Date objects and filter urgent ones
      const formattedProjects = parsedProjects
        .map((project: any) => ({
          ...project,
          deadline: new Date(project.deadline)
        }))
        .filter((project: Project) => project.priority === 'urgent' || project.priority === 'high');
      
      setUrgentProjects(formattedProjects);
    }
  }, []);

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Urgent Tasks</h1>
        <p className="text-muted-foreground mt-1">
          High-priority items that need immediate attention
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Critical Projects
            </CardTitle>
            <CardDescription>Projects requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            {urgentProjects.length > 0 ? (
              <div className="space-y-4">
                {urgentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-start space-x-4 p-4 bg-card/50 rounded-md hover-scale"
                  >
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-md bg-red-500/10 text-red-500">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{project.title}</h4>
                        <Badge
                          className="bg-red-500 text-white text-xs font-normal"
                        >
                          {project.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(project.deadline).toLocaleDateString()}
                        </div>
                        {project.team && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Users className="mr-1 h-3 w-3" />
                            {project.team}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-10 text-muted-foreground">
                No urgent projects at the moment. Urgent projects from the Projects page will appear here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UrgentPage;
