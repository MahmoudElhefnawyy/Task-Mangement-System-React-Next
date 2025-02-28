import { type Task, TaskPriority, TaskStatus } from "@shared/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const priorityColors = {
  [TaskPriority.LOW]: "bg-green-500",
  [TaskPriority.MEDIUM]: "bg-yellow-500",
  [TaskPriority.HIGH]: "bg-red-500",
};

const statusColors = {
  [TaskStatus.TODO]: "bg-gray-500",
  [TaskStatus.IN_PROGRESS]: "bg-blue-500",
  [TaskStatus.COMPLETED]: "bg-green-500",
};

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="font-semibold">{task.title}</h3>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={() => onEdit(task)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-destructive"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="secondary" className={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
          <Badge variant="secondary" className={statusColors[task.status]}>
            {task.status}
          </Badge>
          {task.dueDate && (
            <span className="text-xs text-muted-foreground">
              Due {formatDistance(new Date(task.dueDate), new Date(), { addSuffix: true })}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
