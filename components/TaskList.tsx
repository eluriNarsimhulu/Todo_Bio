'use client';

import { useTaskStore } from '@/store/taskStore';
import { filterAndSortTasks } from '@/utils/filters';
import TaskCard from './TaskCard';

export default function TaskList() {
  const tasks = useTaskStore((s) => s.tasks);
  const activeFilter = useTaskStore((s) => s.activeFilter);
  const activeSort = useTaskStore((s) => s.activeSort);
  const searchQuery = useTaskStore((s) => s.searchQuery);

  const filtered = filterAndSortTasks(tasks, activeFilter, activeSort, searchQuery);

  if (!filtered.length) {
    const message =
      searchQuery
        ? 'No tasks match your search.'
        : activeFilter === 'Done'
        ? 'No completed tasks yet.'
        : activeFilter === 'Pending'
        ? 'All caught up — nothing pending!'
        : 'Add your first task above.';

    return (
      <div className="text-center py-16 text-zinc-400 dark:text-zinc-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <p className="text-sm">{message}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2" role="list" aria-live="polite">
      {filtered.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}
