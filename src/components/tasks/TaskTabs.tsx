
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TaskData } from "../../services/taskService";
import TaskList from "./TaskList";

interface TaskTabsProps {
  tasks: TaskData[];
  isLoading: boolean;
  onStatusChange: (taskId: string, status: TaskData["status"]) => void;
  onDelete: (taskId: string) => void;
}

const TaskTabs = ({ tasks, isLoading, onStatusChange, onDelete }: TaskTabsProps) => {
  const filterTasksByStatus = (status: TaskData["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <Tabs defaultValue="todo" className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="todo" className="relative">
          To Do
          {filterTasksByStatus("todo").length > 0 && (
            <Badge className="ml-2 absolute -top-2 -right-2">
              {filterTasksByStatus("todo").length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="inProgress">
          In Progress
          {filterTasksByStatus("inProgress").length > 0 && (
            <Badge className="ml-2 absolute -top-2 -right-2">
              {filterTasksByStatus("inProgress").length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="done">
          Done
          {filterTasksByStatus("done").length > 0 && (
            <Badge className="ml-2 absolute -top-2 -right-2">
              {filterTasksByStatus("done").length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="goals">
          Goals
          {filterTasksByStatus("goal").length > 0 && (
            <Badge className="ml-2 absolute -top-2 -right-2">
              {filterTasksByStatus("goal").length}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>

      <Card className="glass-effect">
        <CardHeader className="pb-3">
          <CardTitle>Task List</CardTitle>
          <CardDescription>Manage your tasks and goals</CardDescription>
          <Separator className="mt-4" />
        </CardHeader>
        <CardContent>
          <TabsContent value="todo" className="mt-0">
            <TaskList 
              tasks={filterTasksByStatus("todo")} 
              status="todo"
              isLoading={isLoading}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          </TabsContent>
          <TabsContent value="inProgress" className="mt-0">
            <TaskList 
              tasks={filterTasksByStatus("inProgress")} 
              status="inProgress"
              isLoading={isLoading}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          </TabsContent>
          <TabsContent value="done" className="mt-0">
            <TaskList 
              tasks={filterTasksByStatus("done")} 
              status="done"
              isLoading={isLoading}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          </TabsContent>
          <TabsContent value="goals" className="mt-0">
            <TaskList 
              tasks={filterTasksByStatus("goal")} 
              status="goal"
              isLoading={isLoading}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default TaskTabs;
