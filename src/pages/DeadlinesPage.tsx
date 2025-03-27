
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, AlertCircle } from "lucide-react";

const DeadlinesPage = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Deadlines</h1>
        <p className="text-muted-foreground mt-1">
          Track important deadlines and due dates
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Your most urgent deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-10 text-muted-foreground">
              This feature is coming soon. Track and manage your important deadlines here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeadlinesPage;
