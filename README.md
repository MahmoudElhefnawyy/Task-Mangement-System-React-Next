
# Task Management System

A professional, modern, and fully-functional task management system built with React, Express, and PostgreSQL.

## Features

- **Dashboard** with task statistics and completion rates
- **Task Management** with priority levels and status tracking
- **Project Organization** for grouping related tasks
- **Task Templates** for quick task creation
- **Responsive Design** that works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Query for server state

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-management-system.git
   cd task-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables (database connection, etc.)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

The application is built with a monorepo structure:

- `client/` - Frontend React application
- `server/` - Backend Express API
- `shared/` - Shared TypeScript types and utilities

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Projects

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `PATCH /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

## Deployment

The application can be deployed on Replit:

1. Push your changes to GitHub
2. Configure the deployment settings
3. Deploy your application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
