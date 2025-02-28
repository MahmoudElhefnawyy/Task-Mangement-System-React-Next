import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color").notNull().default("#6366f1"), // Default indigo color
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  priority: text("priority").notNull(),
  status: text("status").notNull().default("todo"),
  tags: text("tags").array(),
  projectId: integer("project_id").references(() => projects.id),
});

export const TaskPriority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export const TaskStatus = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
} as const;

export const insertProjectSchema = createInsertSchema(projects)
  .omit({ id: true });

export const insertTaskSchema = createInsertSchema(tasks)
  .omit({ id: true })
  .extend({
    priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH]),
    status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]),
    tags: z.array(z.string()).optional(),
    dueDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
    projectId: z.number().optional(),
  });

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;