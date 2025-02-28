import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTaskSchema, insertProjectSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Task routes
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

  // Project routes
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }
    const project = await storage.getProject(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  app.get("/api/projects/:id/tasks", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }
    const tasks = await storage.getTasksByProject(id);
    res.json(tasks);
  });

  app.post("/api/projects", async (req, res) => {
    const result = insertProjectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid project data" });
    }
    const project = await storage.createProject(result.data);
    res.status(201).json(project);
  });

  app.patch("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }
    const project = await storage.getProject(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const result = insertProjectSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid project data" });
    }
    const updatedProject = await storage.updateProject(id, result.data);
    res.json(updatedProject);
  });

  app.delete("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }
    await storage.deleteProject(id);
    res.status(204).send();
  });

  return createServer(app);
}