'use client';

import { useTaskStore } from '@/store/taskStore';
import type { Task } from '@/types/task';

const PRIORITY_STYLES: Record<string, string> = {
  Low: 'bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
  Medium: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  High: 'bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200',
};

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const toggleDone = useTaskStore((s) => s.toggleDone);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  return (
    <div
      className={`group flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 transition hover:border-zinc-300 dark:hover:border-zinc-700 ${
        task.done ? 'opacity-60' : ''
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => toggleDone(task.id)}
        aria-label={task.done ? 'Mark as pending' : 'Mark as done'}
        className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
          task.done
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-zinc-300 dark:border-zinc-600 hover:border-emerald-400'
        }`}
      >
        {task.done && (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Task info */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${
            task.done
              ? 'line-through text-zinc-400 dark:text-zinc-500'
              : 'text-zinc-900 dark:text-zinc-100'
          }`}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority]}`}
          >
            {task.priority}
          </span>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
            {task.done ? 'Done' : 'Pending'}
          </span>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={() => deleteTask(task.id)}
        aria-label="Delete task"
        className="shrink-0 opacity-0 group-hover:opacity-100 w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
