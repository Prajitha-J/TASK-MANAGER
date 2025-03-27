
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Flag, TrendingUp } from "lucide-react";

const GoalsPage = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Goals</h1>
        <p className="text-muted-foreground mt-1">
          Set and track your personal and professional goals
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Your Goals</CardTitle>
            <CardDescription>Track your short and long term goals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-10 text-muted-foreground">
              This feature is coming soon. Set and track your personal and professional goals here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalsPage;
