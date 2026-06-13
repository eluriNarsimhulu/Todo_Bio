'use client';

import { useState, useRef } from 'react';
import { useTaskStore } from '@/store/taskStore';
import type { Priority } from '@/types/task';

export default function TaskForm() {
  const addTask = useTaskStore((s) => s.addTask);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority | ''>('');
  const [error, setError] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    setError('');
    if (!title.trim() && !priority) {
      setError('Please enter a title and select a priority.');
      return;
    }
    if (!title.trim()) {
      setError('Task title cannot be empty.');
      titleRef.current?.focus();
      return;
    }
    if (!priority) {
      setError('Please select a priority.');
      return;
    }
    addTask(title.trim(), priority);
    setTitle('');
    setPriority('');
    titleRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 mb-4">
      <div className="flex gap-3 flex-wrap items-end">
        <div className="flex flex-col gap-1 flex-[2] min-w-[160px]">
          <label htmlFor="task-title" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Task title
          </label>
          <input
            ref={titleRef}
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(''); }}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            maxLength={120}
            className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 transition"
          />
        </div>
        <div className="flex flex-col gap-1 min-w-[120px]">
          <label htmlFor="task-priority" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Priority
          </label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => { setPriority(e.target.value as Priority | ''); setError(''); }}
            className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 transition"
          >
            <option value="">Select…</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="h-10 px-5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:opacity-80 active:scale-95 transition whitespace-nowrap"
        >
          + Add task
        </button>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
