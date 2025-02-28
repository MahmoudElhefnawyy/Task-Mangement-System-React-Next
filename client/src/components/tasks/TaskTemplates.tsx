
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskPriority, TaskStatus } from "@shared/schema";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Save, Trash2 } from "lucide-react";

interface Template {
  id: string;
  name: string;
  task: {
    title: string;
    description: string;
    priority: string;
    status: string;
  };
}

interface TaskTemplatesProps {
  onApplyTemplate: (template: any) => void;
}

export function TaskTemplates({ onApplyTemplate }: TaskTemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>(() => {
    const saved = localStorage.getItem("taskTemplates");
    return saved ? JSON.parse(saved) : [
      {
        id: "default-1",
        name: "Bug Fix",
        task: {
          title: "Fix Bug",
          description: "Investigate and fix bug in the application",
          priority: TaskPriority.HIGH,
          status: TaskStatus.TODO,
        }
      },
      {
        id: "default-2",
        name: "Feature Development",
        task: {
          title: "Implement New Feature",
          description: "Design and implement the new feature",
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.TODO,
        }
      }
    ];
  });
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTemplate, setEditTemplate] = useState<Template | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState(TaskPriority.MEDIUM);
  
  const saveTemplates = (newTemplates: Template[]) => {
    localStorage.setItem("taskTemplates", JSON.stringify(newTemplates));
    setTemplates(newTemplates);
  };
  
  const handleSaveTemplate = () => {
    if (!templateName || !taskTitle) {
      toast({ title: "Template name and task title are required", variant: "destructive" });
      return;
    }
    
    const newTemplate: Template = {
      id: editTemplate?.id || Date.now().toString(),
      name: templateName,
      task: {
        title: taskTitle,
        description: taskDescription,
        priority: taskPriority,
        status: TaskStatus.TODO,
      }
    };
    
    let newTemplates: Template[];
    if (editTemplate) {
      newTemplates = templates.map(t => t.id === editTemplate.id ? newTemplate : t);
    } else {
      newTemplates = [...templates, newTemplate];
    }
    
    saveTemplates(newTemplates);
    setDialogOpen(false);
    resetForm();
    toast({ title: `Template ${editTemplate ? "updated" : "created"} successfully` });
  };
  
  const handleDeleteTemplate = (id: string) => {
    const newTemplates = templates.filter(t => t.id !== id);
    saveTemplates(newTemplates);
    toast({ title: "Template deleted" });
  };
  
  const handleEditTemplate = (template: Template) => {
    setEditTemplate(template);
    setTemplateName(template.name);
    setTaskTitle(template.task.title);
    setTaskDescription(template.task.description || "");
    setTaskPriority(template.task.priority as TaskPriority);
    setDialogOpen(true);
  };
  
  const resetForm = () => {
    setEditTemplate(null);
    setTemplateName("");
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority(TaskPriority.MEDIUM);
  };
  
  const handleApplyTemplate = (template: Template) => {
    onApplyTemplate(template.task);
    toast({ title: `Applied "${template.name}" template` });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Task Templates</h3>
        <Button onClick={() => {
          resetForm();
          setDialogOpen(true);
        }} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-md">{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm mb-2">{template.task.title}</div>
              <div className="flex justify-between mt-4">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => handleApplyTemplate(template)}
                >
                  Use Template
                </Button>
                <div className="space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEditTemplate(template)}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editTemplate ? "Edit" : "Create"} Task Template</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input 
                id="template-name"
                value={templateName} 
                onChange={(e) => setTemplateName(e.target.value)} 
                placeholder="e.g., Bug Fix Template"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input 
                id="task-title"
                value={taskTitle} 
                onChange={(e) => setTaskTitle(e.target.value)} 
                placeholder="e.g., Fix login bug"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-description">Task Description</Label>
              <Textarea 
                id="task-description"
                value={taskDescription} 
                onChange={(e) => setTaskDescription(e.target.value)} 
                placeholder="Describe the task..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-priority">Priority</Label>
              <select 
                id="task-priority"
                value={taskPriority} 
                onChange={(e) => setTaskPriority(e.target.value as TaskPriority)}
                className="w-full rounded-md border border-input px-3 py-2"
              >
                <option value={TaskPriority.LOW}>Low</option>
                <option value={TaskPriority.MEDIUM}>Medium</option>
                <option value={TaskPriority.HIGH}>High</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTemplate}>
                Save Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
