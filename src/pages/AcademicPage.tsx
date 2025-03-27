
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Award, GraduationCap } from "lucide-react";

const AcademicPage = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Beyond Academic</h1>
        <p className="text-muted-foreground mt-1">
          Track extracurricular activities and personal development
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Extracurricular Activities</CardTitle>
            <CardDescription>Track your activities beyond academics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-10 text-muted-foreground">
              This feature is coming soon. Track and manage your extracurricular activities here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcademicPage;
