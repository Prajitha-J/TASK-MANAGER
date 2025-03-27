
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Flag, TrendingUp, Info, Award, Calendar } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const GoalsPage = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Goals</h1>
        <p className="text-muted-foreground mt-1">
          Set and track your personal and professional goals
        </p>
      </header>

      <Alert className="mb-6 bg-blue-500/10 border-blue-500/20">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertTitle>Coming Soon</AlertTitle>
        <AlertDescription>
          We're currently developing this feature. Soon you'll be able to set, track, and achieve your personal and professional goals.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-red-500" />
              Goal Setting
            </CardTitle>
            <CardDescription>Define your objectives clearly</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Create SMART goals with specific metrics and timeframes for achievement.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              Progress Tracking
            </CardTitle>
            <CardDescription>Monitor your journey to success</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Track your advancement with visual progress indicators and milestone achievements.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-amber-500" />
              Achievements
            </CardTitle>
            <CardDescription>Celebrate your successes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Document and celebrate your achieved goals to stay motivated.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-500" />
              Goal Timeline
            </CardTitle>
            <CardDescription>Plan your path to achievement</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Visualize your goals on a timeline with clear deadlines and milestones.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalsPage;
