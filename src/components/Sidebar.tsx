
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, ChevronRight, BookOpen, Calendar, CheckSquare,
  Clock, Trophy, UserPlus, Book, Briefcase, AlertTriangle, 
  FileText, Target, Lightbulb, Heart, Lock, Sun, Moon, LogOut
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isCollapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={`w-full justify-start ${
          isActive ? "bg-accent text-accent-foreground" : ""
        } hover:bg-accent hover:text-accent-foreground`}
      >
        {icon}
        {!isCollapsed && <span className="ml-2">{label}</span>}
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userData, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Define navigation items based on user mode
  const getNavItems = () => {
    const commonItems = [
      { to: "/dashboard", icon: <FileText size={20} />, label: "Notes" },
      { to: "/to-do", icon: <CheckSquare size={20} />, label: "To-Do List" },
      { to: "/events", icon: <Calendar size={20} />, label: "Event Reminders" },
      { to: "/collab", icon: <UserPlus size={20} />, label: "Collaboration" },
      { to: "/achievements", icon: <Trophy size={20} />, label: "Achievements" },
    ];

    switch (userData?.mode) {
      case "student":
        return [
          ...commonItems,
          { to: "/term", icon: <Book size={20} />, label: "This Term" },
          { to: "/deadlines", icon: <Clock size={20} />, label: "Deadlines" },
          { to: "/academic", icon: <BookOpen size={20} />, label: "Beyond Academic" },
        ];
      case "employee":
        return [
          ...commonItems,
          { to: "/projects", icon: <Briefcase size={20} />, label: "Project Deadlines" },
          { to: "/urgent", icon: <AlertTriangle size={20} />, label: "Urgent" },
        ];
      case "personal":
        return [
          ...commonItems,
          { to: "/goals", icon: <Target size={20} />, label: "Goals" },
          { to: "/habits", icon: <Lightbulb size={20} />, label: "Habits Stacking" },
          { to: "/glow-up", icon: <Heart size={20} />, label: "Glow Up" },
          { to: "/diary", icon: <Lock size={20} />, label: "Personal Diary" },
        ];
      default:
        return commonItems;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div
      className={`sidebar transition-all duration-300 ease-in-out h-screen overflow-auto flex flex-col border-r border-border bg-sidebar ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && (
          <h2 className="font-semibold text-xl">Task Manager</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex-1 py-4 overflow-auto">
        <div className="space-y-1 px-2">
          {getNavItems().map((item, index) => (
            <NavItem
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
      
      <div className="p-4 mt-auto space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          {!isCollapsed && (
            <span className="ml-2">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
