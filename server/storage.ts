import { Task, type InsertTask, Project, type InsertProject } from "@shared/schema";

export interface IStorage {
  // Task operations
  getTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task>;
  deleteTask(id: number): Promise<void>;

  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  getTasksByProject(projectId: number): Promise<Task[]>;
}

export class MemStorage implements IStorage {
  private tasks: Map<number, Task>;
  private projects: Map<number, Project>;
  private currentTaskId: number;
  private currentProjectId: number;

  constructor() {
    this.tasks = new Map();
    this.projects = new Map();
    this.currentTaskId = 1;
    this.currentProjectId = 1;
  }

  // Task operations
  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.currentTaskId++;
    const task: Task = { ...insertTask, id };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, updates: Partial<InsertTask>): Promise<Task> {
    const task = await this.getTask(id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    const updatedTask = { ...task, ...updates };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    this.tasks.delete(id);
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project> {
    const project = await this.getProject(id);
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    const updatedProject = { ...project, ...updates };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    // Delete all tasks associated with this project
    const tasks = await this.getTasks();
    for (const task of tasks) {
      if (task.projectId === id) {
        await this.deleteTask(task.id);
      }
    }
    this.projects.delete(id);
  }

  async getTasksByProject(projectId: number): Promise<Task[]> {
    const tasks = await this.getTasks();
    return tasks.filter(task => task.projectId === projectId);
  }
}

export const storage = new MemStorage();