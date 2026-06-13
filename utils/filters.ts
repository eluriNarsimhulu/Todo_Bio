import type { Task, Filter, SortOption } from '@/types/task';

const PRIORITY_ORDER: Record<string, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export function filterAndSortTasks(
  tasks: Task[],
  filter: Filter,
  sort: SortOption,
  search: string
): Task[] {
  let result = [...tasks];

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(q));
  }

  if (filter === 'Pending') result = result.filter((t) => !t.done);
  if (filter === 'Done') result = result.filter((t) => t.done);

  switch (sort) {
    case 'newest':
      result.sort((a, b) => b.createdAt - a.createdAt);
      break;
    case 'oldest':
      result.sort((a, b) => a.createdAt - b.createdAt);
      break;
    case 'priority-high':
      result.sort((a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]);
      break;
    case 'priority-low':
      result.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
      break;
  }

  return result;
}

export function getTaskCounts(tasks: Task[]) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pending = total - done;
  return { total, done, pending };
}
