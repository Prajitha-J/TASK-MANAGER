
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Activity, Bell, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const HabitsPage = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Habits Stacking</h1>
        <p className="text-muted-foreground mt-1">
          Build and maintain positive habits
        </p>
      </header>

      <Alert className="mb-6 bg-blue-500/10 border-blue-500/20">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertTitle>Coming Soon</AlertTitle>
        <AlertDescription>
          We're currently working on this feature. You'll be able to create, track and analyze your daily habits.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              Daily Habits
            </CardTitle>
            <CardDescription>Track your daily habits and routines</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Create a list of daily habits and mark them complete to build streaks and consistency.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-green-500" />
              Habit Analytics
            </CardTitle>
            <CardDescription>See your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              View detailed analytics about your habits, including streaks, completion rates, and trends.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-red-500" />
              Habit Reminders
            </CardTitle>
            <CardDescription>Never miss a habit with timely reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Set up personalized reminders for your habits to help you stay on track and build consistency.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HabitsPage;
