
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Star, Sparkles } from "lucide-react";

const GlowUpPage = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Glow Up</h1>
        <p className="text-muted-foreground mt-1">
          Track your personal transformation journey
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Your Journey</CardTitle>
            <CardDescription>Track your personal improvement goals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-10 text-muted-foreground">
              This feature is coming soon. Document your personal transformation journey here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlowUpPage;
