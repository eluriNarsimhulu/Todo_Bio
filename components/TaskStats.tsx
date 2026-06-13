'use client';

import { useTaskStore } from '@/store/taskStore';
import { getTaskCounts } from '@/utils/filters';

export default function TaskStats() {
  const tasks = useTaskStore((s) => s.tasks);
  const { total, done, pending } = getTaskCounts(tasks);

  if (total === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Total</p>
        <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{total}</p>
      </div>
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-4">
        <p className="text-xs text-amber-700 dark:text-amber-400 mb-1">Pending</p>
        <p className="text-2xl font-semibold text-amber-800 dark:text-amber-300">{pending}</p>
      </div>
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl p-4">
        <p className="text-xs text-emerald-700 dark:text-emerald-400 mb-1">Done</p>
        <p className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300">{done}</p>
      </div>
    </div>
  );
}
