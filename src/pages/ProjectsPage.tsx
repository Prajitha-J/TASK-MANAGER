
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ClipboardList, Clock } from "lucide-react";

const ProjectsPage = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Project Deadlines</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track your project deadlines
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Current Projects</CardTitle>
            <CardDescription>Track your active project deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-10 text-muted-foreground">
              This feature is coming soon. Track and manage your project deadlines here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectsPage;
