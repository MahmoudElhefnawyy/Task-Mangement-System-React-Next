import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTaskSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/tasks", async (_req, res) => {
    const tasks = await storage.getTasks();
    res.json(tasks);
  });

  app.post("/api/tasks", async (req, res) => {
    const result = insertTaskSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid task data" });
    }
    const task = await storage.createTask(result.data);
    res.status(201).json(task);
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }
    const task = await storage.getTask(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const result = insertTaskSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid task data" });
    }
    const updatedTask = await storage.updateTask(id, result.data);
    res.json(updatedTask);
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }
    await storage.deleteTask(id);
    res.status(204).send();
  });

  return createServer(app);
}
