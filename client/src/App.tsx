import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Tasks from "@/pages/Tasks";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

function Router() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleNewTask = async (data: any) => {
    try {
      await apiRequest("POST", "/api/tasks", data);
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({ title: "Task created successfully" });
      setDialogOpen(false);
      navigate("/tasks");
    } catch (error) {
      toast({ 
        title: "Failed to create task", 
        variant: "destructive" 
      });
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar onNewTask={() => setDialogOpen(true)} />
      <main className="flex-1 overflow-auto">
        <div className="p-4 flex justify-end">
          <ThemeToggle />
        </div>
        <div className="px-6">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <TaskForm
              onSubmit={handleNewTask}
              onCancel={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;