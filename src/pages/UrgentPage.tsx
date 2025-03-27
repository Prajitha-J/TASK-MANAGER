
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, AlertCircle } from "lucide-react";

const UrgentPage = () => {
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
            <CardTitle>Urgent Tasks</CardTitle>
            <CardDescription>Tasks that require immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-10 text-muted-foreground">
              This feature is coming soon. Track and manage your urgent tasks here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UrgentPage;
