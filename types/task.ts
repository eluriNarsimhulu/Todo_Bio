export type Priority = 'Low' | 'Medium' | 'High';
export type Filter = 'All' | 'Pending' | 'Done';
export type SortOption = 'newest' | 'oldest' | 'priority-high' | 'priority-low';

export interface Task {
  id: number;
  title: string;
  priority: Priority;
  done: boolean;
  createdAt: number;
}

export interface TaskStore {
  tasks: Task[];
  activeFilter: Filter;
  activeSort: SortOption;
  searchQuery: string;
  addTask: (title: string, priority: Priority) => void;
  toggleDone: (id: number) => void;
  deleteTask: (id: number) => void;
  setFilter: (filter: Filter) => void;
  setSort: (sort: SortOption) => void;
  setSearch: (query: string) => void;
}
