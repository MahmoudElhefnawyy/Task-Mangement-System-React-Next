import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.ts'
import { Toaster } from './components/ui/toaster.tsx'
import { NotificationProvider } from './components/notifications/NotificationProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <App />
        <Toaster />
      </NotificationProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)