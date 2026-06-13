'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskStore, Priority, Filter, SortOption } from '@/types/task';

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      activeFilter: 'All',
      activeSort: 'newest',
      searchQuery: '',

      addTask: (title: string, priority: Priority) =>
        set((state) => ({
          tasks: [
            {
              id: Date.now(),
              title,
              priority,
              done: false,
              createdAt: Date.now(),
            },
            ...state.tasks,
          ],
        })),

      toggleDone: (id: number) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
          ),
        })),

      deleteTask: (id: number) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      setFilter: (filter: Filter) => set({ activeFilter: filter }),
      setSort: (sort: SortOption) => set({ activeSort: sort }),
      setSearch: (query: string) => set({ searchQuery: query }),
    }),
    {
      name: 'task-manager-storage',
      partialize: (state) => ({
        tasks: state.tasks,
        activeFilter: state.activeFilter,
        activeSort: state.activeSort,
      }),
    }
  )
);
