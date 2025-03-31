
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ClipboardList, Clock, Calendar, Users, Plus, Trash2, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: "low" | "medium" | "high" | "urgent";
  team: string;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    deadline: new Date(),
    priority: "medium",
    team: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      
      // Convert string dates back to Date objects
      const formattedProjects = parsedProjects.map((project: any) => ({
        ...project,
        deadline: new Date(project.deadline)
      }));
      
      setProjects(formattedProjects);
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (newProject.title.trim() === "") {
      toast.error("Project title cannot be empty");
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
    };

    setProjects([...projects, project]);
    setNewProject({
      title: "",
      description: "",
      deadline: new Date(),
      priority: "medium",
      team: "",
    });
    setIsDialogOpen(false);
    toast.success("Project added successfully");
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
    toast.success("Project deleted successfully");
  };

  // Sort projects by deadline (closest first)
  const sortedProjects = [...projects].sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
  
  // Get urgent projects for the UrgentPage
  const urgentProjects = sortedProjects.filter(project => project.priority === 'urgent');
  
  // Save urgent projects to localStorage
  useEffect(() => {
    localStorage.setItem('urgentProjects', JSON.stringify(urgentProjects));
  }, [urgentProjects]);

  const getPriorityColor = (priority: Project["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white";
      case "high":
        return "bg-amber-500 text-white";
      case "medium":
        return "bg-blue-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Project Deadlines</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track your project deadlines
        </p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="button-effect">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Create a new project with deadline.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="Project title"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Project description"
                  rows={3}
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Team Members</Label>
                <Input
                  id="team"
                  placeholder="Team members"
                  value={newProject.team}
                  onChange={(e) =>
                    setNewProject({ ...newProject, team: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newProject.deadline.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setNewProject({ 
                      ...newProject, 
                      deadline: new Date(e.target.value) 
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newProject.priority}
                  onValueChange={(value: any) =>
                    setNewProject({ ...newProject, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addProject}>Add Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>Your active projects and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            {sortedProjects.length > 0 ? (
              <div className="space-y-4">
                {sortedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-start space-x-4 p-4 bg-card/50 rounded-md hover-scale"
                  >
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{project.title}</h4>
                        <Badge
                          className={`${getPriorityColor(project.priority)} text-xs font-normal`}
                        >
                          {project.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {project.deadline.toLocaleDateString()}
                        </div>
                        {project.team && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Users className="mr-1 h-3 w-3" />
                            {project.team}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-10 text-muted-foreground">
                No projects added yet. Click "Add Project" to create your first project.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectsPage;
