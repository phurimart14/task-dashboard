import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskFormData } from '../types/task';
import { mockTasks } from '../data/mockTasks';

export type Theme = 'light' | 'dark';

interface TaskStore {
  // Task state
  tasks: Task[];
  globalSearch: string;
  theme: Theme;

  // Task actions
  addTask: (data: TaskFormData) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setGlobalSearch: (query: string) => void;

  // Theme action
  toggleTheme: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: mockTasks,
      globalSearch: '',
      // ตรวจสอบ system preference ตอนเริ่ม
      theme: typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',

      addTask: (data) =>
        set((state) => ({
          tasks: [...state.tasks, { ...data, id: `task-${Date.now()}` }],
        })),

      updateTask: (id, data) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...data } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      setGlobalSearch: (query) => set({ globalSearch: query }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'task-storage',
      // เพิ่ม theme ใน partialize
      partialize: (state) => ({
        tasks: state.tasks,
        theme: state.theme,
      }),
    }
  )
);