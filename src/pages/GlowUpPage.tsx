
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Star, Sparkles, Camera, TrendingUp, Calendar, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const GlowUpPage = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Glow Up</h1>
        <p className="text-muted-foreground mt-1">
          Track your personal transformation journey
        </p>
      </header>

      <Alert className="mb-6 bg-blue-500/10 border-blue-500/20">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertTitle>Coming Soon</AlertTitle>
        <AlertDescription>
          We're currently developing this feature. Soon you'll be able to document and track your personal transformation journey.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="mr-2 h-5 w-5 text-purple-500" />
              Progress Photos
            </CardTitle>
            <CardDescription>Document your transformation visually</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Upload and organize photos to see your transformation over time.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              Milestone Tracking
            </CardTitle>
            <CardDescription>Record important achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Set and track personal milestones on your glow up journey.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-effect md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-500" />
              Transformation Timeline
            </CardTitle>
            <CardDescription>View your journey on a timeline</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-6 text-muted-foreground">
              Visualize your entire transformation journey on an interactive timeline.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlowUpPage;
