
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Activity, Repeat } from "lucide-react";

const HabitsPage = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Habits Stacking</h1>
        <p className="text-muted-foreground mt-1">
          Build and maintain positive habits
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Your Habits</CardTitle>
            <CardDescription>Track your daily and weekly habits</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-10 text-muted-foreground">
              This feature is coming soon. Build and track your positive habits here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HabitsPage;
