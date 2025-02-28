
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Task } from "@shared/schema";

interface TaskExportProps {
  tasks: Task[];
}

export function TaskExport({ tasks }: TaskExportProps) {
  const { toast } = useToast();

  const exportCSV = () => {
    if (tasks.length === 0) {
      toast({ title: "No tasks to export", variant: "destructive" });
      return;
    }

    // Create CSV header
    const headers = ["ID", "Title", "Description", "Due Date", "Priority", "Status", "Project ID"];
    
    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...tasks.map(task => [
        task.id,
        `"${task.title.replace(/"/g, '""')}"`, // Escape quotes in CSV
        `"${task.description?.replace(/"/g, '""') || ''}"`,
        task.dueDate ? new Date(task.dueDate).toISOString() : "",
        task.priority,
        task.status,
        task.projectId || ""
      ].join(","))
    ].join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tasks_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({ title: "Tasks exported to CSV successfully" });
  };
  
  const exportJSON = () => {
    if (tasks.length === 0) {
      toast({ title: "No tasks to export", variant: "destructive" });
      return;
    }
    
    const jsonString = JSON.stringify(tasks, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tasks_export_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({ title: "Tasks exported to JSON successfully" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportCSV}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportJSON}>
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
