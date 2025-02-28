import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

function Router() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 flex justify-end">
          <ThemeToggle />
        </div>
        <div className="px-6">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </div>
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