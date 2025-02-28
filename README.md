
# Task Management System

A powerful, feature-rich task management application built with React, Express, TypeScript, and PostgreSQL, designed to help individuals and teams organize work efficiently.

## Features

- ✅ **Task Dashboard**: View task statistics, completion rates, and upcoming deadlines at a glance.

- 📋 **Task Management**: Create, update, and delete tasks with priority levels and status tracking.

- 📂 **Project Organization**: Group related tasks into projects for better organization.

- 🔄 **Task Status Tracking**: Track progress with custom statuses (To Do, In Progress, Completed).

- ⏱️ **Task Prioritization**: Set priority levels for tasks (High, Medium, Low).

- 🎨 **Modern UI**: Beautiful and intuitive interface built with Shadcn UI components.

- 🌙 **Dark/Light Theme**: Switch between dark and light themes for a personalized experience.

- 📱 **Mobile-Responsive Design**: Fully responsive design for seamless use on all devices.

- 🔍 **Task Filtering & Search**: Find tasks quickly with powerful filtering capabilities.

- 📊 **Progress Visualization**: Visual representation of task completion with progress bars.

## Tech Stack

### Frontend
- **Framework**: React with TypeScript
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form

### Backend
- **Server**: Express.js & Node.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **API**: RESTful API endpoints

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MahmoudElhefnawyy/Task-Mangement-System-React-Next.git
   cd Task-Mangement-System-React-Next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/task_management
   
   # Server Configuration
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application:
   Visit http://0.0.0.0:5000 in your browser.

## Development

The application is built with a monorepo structure:

```
├── client/            # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   ├── pages/       # Application pages
│   │   └── styles/      # Styling utilities
├── server/            # Backend Express API
│   ├── db.ts          # Database connection
│   ├── index.ts       # Server entry point
│   ├── routes.ts      # API routes
│   └── storage.ts     # Data storage utilities
├── shared/            # Shared TypeScript types
│   └── schema.ts      # Database schema
```

## API Endpoints

### Tasks
- `GET /api/tasks` - Retrieve all tasks
- `GET /api/tasks/:id` - Retrieve a specific task
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

### Projects
- `GET /api/projects` - Retrieve all projects
- `GET /api/projects/:id` - Retrieve a specific project with its tasks
- `POST /api/projects` - Create a new project
- `PATCH /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

## Deployment

Build the application:
```bash
npm run build
```

The built files will be ready for deployment. When using Replit, you can simply use the built-in deployment features to publish your application.

## Key Features in Detail

- **Dashboard**: The dashboard provides an at-a-glance view of all tasks, their status, and completion rates.
- **Task Management**: Create detailed tasks with descriptions, deadlines, priorities, and statuses.
- **Project Organization**: Group related tasks into projects for better organization and team collaboration.
- **Progress Tracking**: Visual indicators show task completion progress across projects.
- **Modern UI**: Built with Shadcn UI components for a clean, modern interface.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes:
   ```bash
   git commit -am 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/my-feature
   ```
5. Create a Pull Request

## License

This project is licensed under the MIT License.

