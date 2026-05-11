import { create } from 'zustand';
import type { Task, TaskFormData } from '../types/task';
import { mockTasks } from '../data/mockTasks';

interface TaskStore {
  // State
  tasks: Task[];
  globalSearch: string;

  // Actions
  addTask: (data: TaskFormData) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setGlobalSearch: (query: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  // Initial state
  tasks: mockTasks,
  globalSearch: '',

  // เพิ่ม task ใหม่
  addTask: (data) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...data,
          id: `task-${Date.now()}`, // gen id แบบง่าย
        },
      ],
    })),

  // แก้ไข task
  updateTask: (id, data) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...data } : task
      ),
    })),

  // ลบ task
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  // ตั้งค่า global search
  setGlobalSearch: (query) => set({ globalSearch: query }),
}));