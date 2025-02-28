import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ListTodo,
  Settings,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Sidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { href: "/", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/tasks", icon: ListTodo, label: "Tasks" },
    { href: "/settings", icon: Settings, label: "Settings" },
    { href: "/help", icon: HelpCircle, label: "Help" },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-sidebar border-r flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold">Tasks</h1>}
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

      <nav className="flex-1">
        {links.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}>
            <a
              className={cn(
                "flex items-center gap-4 px-4 py-2 hover:bg-sidebar-accent transition-colors",
                location === href && "bg-sidebar-accent",
                collapsed && "justify-center"
              )}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{label}</span>}
            </a>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <ThemeToggle />
      </div>
    </div>
  );
}
