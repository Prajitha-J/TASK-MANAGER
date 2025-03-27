
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, TrendingUp, Flag, CheckCircle2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  date?: string;
}

const AchievementsPage = () => {
  const { userData } = useAuth();
  
  // Sample achievements - in a real app, these would be fetched from the backend
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Getting Started",
      description: "Complete your profile setup",
      icon: <CheckCircle2 className="h-10 w-10 text-green-500" />,
      earned: true,
      date: "2023-10-15"
    },
    {
      id: "2",
      title: "Task Master",
      description: "Complete 10 tasks",
      icon: <Star className="h-10 w-10 text-yellow-500" />,
      earned: false
    },
    {
      id: "3",
      title: "Deadline Champion",
      description: "Meet 5 deadlines on time",
      icon: <Flag className="h-10 w-10 text-blue-500" />,
      earned: false
    },
    {
      id: "4",
      title: "Productivity Guru",
      description: "Use the app for 7 consecutive days",
      icon: <TrendingUp className="h-10 w-10 text-purple-500" />,
      earned: false
    }
  ];

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground mt-1">
          Track your progress and earn badges
        </p>
      </header>

      <div className="mb-8">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-6 w-6 text-primary" />
              Your Achievement Stats
            </CardTitle>
            <CardDescription>Track your progress and earned badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-accent rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">{achievements.filter(a => a.earned).length}</p>
                <p className="text-sm text-muted-foreground">Achievements Earned</p>
              </div>
              <div className="bg-accent rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">{achievements.length}</p>
                <p className="text-sm text-muted-foreground">Total Achievements</p>
              </div>
              <div className="bg-accent rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">
                  {Math.round((achievements.filter(a => a.earned).length / achievements.length) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`hover-scale ${achievement.earned ? "glass-effect" : "opacity-50"}`}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-2">
                {achievement.icon}
              </div>
              <CardTitle>{achievement.title}</CardTitle>
              <CardDescription>{achievement.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {achievement.earned ? (
                <p className="text-green-500 font-medium">
                  Earned on {achievement.date}
                </p>
              ) : (
                <p className="text-muted-foreground">Not yet earned</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
