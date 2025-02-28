import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { type Task } from "@shared/schema";
import { TaskList } from "@/components/tasks/TaskList";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import { useEffect } from "react";

export default function Tasks() {
  const { toast } = useToast();
  const { checkDueDates } = useNotifications();

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });
  
  useEffect(() => {
    if (tasks.length > 0) {
      checkDueDates(tasks);
    }
  }, [tasks, checkDueDates]);

  const createTask = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/tasks", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({ title: "Task created successfully" });
    },
  });

  const updateTask = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest("PATCH", `/api/tasks/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({ title: "Task updated successfully" });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({ title: "Task deleted successfully" });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>
      <div className="bg-card rounded-lg p-6">
        <TaskList
          tasks={tasks}
          onCreateTask={(data) => createTask.mutate(data)}
          onUpdateTask={(id, data) => updateTask.mutate({ id, data })}
          onDeleteTask={(id) => deleteTask.mutate(id)}
        />
      </div>
    </div>
  );
}
