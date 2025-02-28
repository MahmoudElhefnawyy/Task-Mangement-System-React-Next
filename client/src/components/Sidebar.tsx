import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ListTodo,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  UserCircle,
} from "lucide-react";

interface SidebarProps {
  onNewTask?: () => void;
}

export function Sidebar({ onNewTask }: SidebarProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { href: "/tasks", icon: ListTodo, label: "Tasks" },
    { href: "/", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/settings", icon: Settings, label: "Settings" },
    { href: "/profile", icon: UserCircle, label: "Profile" },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-sidebar border-r flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && <h1 className="text-xl font-bold">Task Manager</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto")}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="p-2">
        <Button
          className={cn(
            "w-full justify-start gap-2",
            collapsed && "justify-center p-2"
          )}
          onClick={onNewTask}
        >
          <Plus className="h-5 w-5" />
          {!collapsed && <span>New Task</span>}
        </Button>
      </div>

      <nav className="flex-1 pt-2">
        {links.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}>
            <a
              className={cn(
                "flex items-center gap-4 px-4 py-2 hover:bg-sidebar-accent transition-colors",
                location === href && "bg-sidebar-accent font-medium",
                collapsed && "justify-center"
              )}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{label}</span>}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
}