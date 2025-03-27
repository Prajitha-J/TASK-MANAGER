
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, Info, Bell, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const UrgentPage = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Urgent Tasks</h1>
        <p className="text-muted-foreground mt-1">
          High-priority items that need immediate attention
        </p>
      </header>

      <Alert className="mb-6 bg-blue-500/10 border-blue-500/20">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertTitle>Coming Soon</AlertTitle>
        <AlertDescription>
          We're currently developing this feature. Soon you'll be able to highlight and manage your most urgent tasks.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Critical Tasks
            </CardTitle>
            <CardDescription>Tasks requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Identify and prioritize tasks that need to be addressed right away.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-amber-500" />
              Time-Sensitive
            </CardTitle>
            <CardDescription>Tasks with approaching deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Monitor tasks with imminent deadlines that require prompt action.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-blue-500" />
              Urgent Notifications
            </CardTitle>
            <CardDescription>Stay informed of critical updates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Receive immediate notifications for urgent matters requiring your attention.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-green-500" />
              Incident Management
            </CardTitle>
            <CardDescription>Handle urgent issues effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Track and manage critical incidents with structured response workflows.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UrgentPage;
