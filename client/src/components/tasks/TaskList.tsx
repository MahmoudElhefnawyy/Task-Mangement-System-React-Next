import { useState } from "react";
import { type Task } from "@shared/schema";
import { TaskCard } from "./TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { Search } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onCreateTask: (data: any) => void;
  onUpdateTask: (id: number, data: any) => void;
  onDeleteTask: (id: number) => void;
}

export function TaskList({
  tasks,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
}: TaskListProps) {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, data);
    } else {
      onCreateTask(data);
    }
    setDialogOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setDialogOpen(true)}>New Task</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={onDeleteTask}
          />
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit" : "Create"} Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            task={editingTask}
            onSubmit={handleSubmit}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
