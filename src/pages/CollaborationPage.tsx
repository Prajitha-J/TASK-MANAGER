
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { Users, UserPlus, User, Share2, MessageSquare, Link, File } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createTeam, addTeamMember, getUserTeams } from "../lib/mongodb";
import { useTasks } from "../hooks/useTasks";
import TaskTabs from "../components/tasks/TaskTabs";

interface Team {
  id: string;
  name: string;
  description?: string;
  members: Array<{
    userId: string;
    email: string;
    role: "owner" | "member";
  }>;
  userRole: "owner" | "member";
}

const CollaborationPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const { userData, currentUser } = useAuth();
  
  // Use the useTasks hook with the selected team ID
  const { tasks, isLoading, addTask, updateTaskStatus, removeTask } = useTasks(selectedTeam || undefined);

  // Load user's teams
  useEffect(() => {
    if (!currentUser?.uid) return;

    const loadTeams = async () => {
      try {
        const userTeams = await getUserTeams(currentUser.uid);
        setTeams(userTeams);
        
        // Select the first team by default if available
        if (userTeams.length > 0 && !selectedTeam) {
          setSelectedTeam(userTeams[0].id);
        }
      } catch (error) {
        console.error("Failed to load teams:", error);
        toast.error("Failed to load your teams");
      }
    };

    loadTeams();
  }, [currentUser?.uid]);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || !userData) {
      toast.error("You must be logged in to create a team");
      return;
    }
    
    if (!newTeamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }
    
    try {
      const teamId = await createTeam({
        name: newTeamName,
        description: newTeamDescription,
        ownerId: currentUser.uid,
        ownerEmail: currentUser.email || userData.email
      });
      
      toast.success(`Team "${newTeamName}" created`);
      
      // Reload teams
      const userTeams = await getUserTeams(currentUser.uid);
      setTeams(userTeams);
      setSelectedTeam(teamId);
      
      // Reset form
      setNewTeamName("");
      setNewTeamDescription("");
      
    } catch (error) {
      console.error("Failed to create team:", error);
      toast.error("Failed to create team");
    }
  };

  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTeam) {
      toast.error("Please select a team first");
      return;
    }
    
    if (!collaboratorEmail.trim()) {
      toast.error("Please enter a collaborator email");
      return;
    }
    
    // In a real app, you would need to look up the user by email first
    // For now, we'll assume they exist and we know their userId
    // This is a placeholder and would need to be implemented properly
    try {
      // This is where you would typically first lookup the user by email
      // Then get their userId
      const mockUserId = `user_${Math.random().toString(36).substring(2, 9)}`;
      
      await addTeamMember(selectedTeam, {
        userId: mockUserId,
        email: collaboratorEmail
      });
      
      toast.success(`Collaboration invitation sent to ${collaboratorEmail}`);
      setCollaboratorEmail("");
      
      // Reload teams to show the new member
      if (currentUser) {
        const userTeams = await getUserTeams(currentUser.uid);
        setTeams(userTeams);
      }
    } catch (error) {
      console.error("Failed to add collaborator:", error);
      toast.error("Failed to add collaborator");
    }
  };

  const selectedTeamData = teams.find(team => team.id === selectedTeam);

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Collaboration</h1>
        <p className="text-muted-foreground mt-1">Manage your team collaborations</p>
      </header>

      <Tabs defaultValue="teams" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="tasks">Shared Tasks</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        
        <TabsContent value="teams">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Create New Team</CardTitle>
                <CardDescription>Start collaborating with others</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateTeam} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input
                      id="team-name"
                      placeholder="Enter a name for your team"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="team-description">Description (Optional)</Label>
                    <Textarea
                      id="team-description"
                      placeholder="Describe what this team is working on"
                      value={newTeamDescription}
                      onChange={(e) => setNewTeamDescription(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full button-effect">
                    <Users className="mr-2 h-4 w-4" />
                    Create Team
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Your Teams</CardTitle>
                <CardDescription>Select a team to manage</CardDescription>
              </CardHeader>
              <CardContent>
                {teams.length > 0 ? (
                  <ul className="space-y-2">
                    {teams.map((team) => (
                      <li 
                        key={team.id} 
                        className={`flex items-center gap-2 p-3 rounded-md cursor-pointer hover-scale ${
                          selectedTeam === team.id ? 'bg-primary/20' : 'bg-accent'
                        }`}
                        onClick={() => setSelectedTeam(team.id)}
                      >
                        <Users className="h-5 w-5" />
                        <div>
                          <p className="font-medium">{team.name}</p>
                          {team.description && (
                            <p className="text-xs text-muted-foreground">{team.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    You don't have any teams yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>
                {selectedTeamData ? `${selectedTeamData.name} - Tasks` : 'Team Tasks'}
              </CardTitle>
              <CardDescription>
                {selectedTeamData 
                  ? `Collaborate on tasks with your team members`
                  : 'Select a team to view shared tasks'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedTeam ? (
                <TaskTabs 
                  tasks={tasks}
                  isLoading={isLoading}
                  onStatusChange={updateTaskStatus}
                  onDelete={removeTask}
                />
              ) : (
                <div className="text-center py-10">
                  <Users className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Select a team to view and manage shared tasks
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="members">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Add Collaborator</CardTitle>
                <CardDescription>Invite someone to your team</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddCollaborator} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-select">Select Team</Label>
                    <select 
                      id="team-select" 
                      className="w-full p-2 border rounded-md bg-background"
                      value={selectedTeam || ""}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      required
                    >
                      <option value="">Select a team</option>
                      {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="collaborator-email">Collaborator Email</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="collaborator-email"
                        type="email"
                        placeholder="Enter collaborator's email"
                        className="pl-10"
                        value={collaboratorEmail}
                        onChange={(e) => setCollaboratorEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full button-effect"
                    disabled={!selectedTeam}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Send Invitation
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  {selectedTeamData 
                    ? `People in ${selectedTeamData.name}`
                    : 'Select a team to view members'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedTeamData && selectedTeamData.members ? (
                  <ul className="space-y-2">
                    {selectedTeamData.members.map((member, index) => (
                      <li key={index} className="flex items-center justify-between gap-2 p-3 rounded-md bg-accent">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          <span>{member.email}</span>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {member.role}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    {selectedTeam 
                      ? "No members in this team yet" 
                      : "Select a team to view members"}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollaborationPage;
