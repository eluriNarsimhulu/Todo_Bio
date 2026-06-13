'use client';

import { useTaskStore } from '@/store/taskStore';
import type { Filter, SortOption } from '@/types/task';

const FILTERS: Filter[] = ['All', 'Pending', 'Done'];

export default function FilterBar() {
  const activeFilter = useTaskStore((s) => s.activeFilter);
  const activeSort = useTaskStore((s) => s.activeSort);
  const searchQuery = useTaskStore((s) => s.searchQuery);
  const setFilter = useTaskStore((s) => s.setFilter);
  const setSort = useTaskStore((s) => s.setSort);
  const setSearch = useTaskStore((s) => s.setSearch);

  return (
    <div className="mb-4 space-y-3">
      {/* Search */}
      <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 h-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks…"
          aria-label="Search tasks"
          className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearch('')}
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter + Sort row */}
      <div className="flex gap-3 flex-wrap items-center">
        <div
          role="group"
          aria-label="Filter tasks"
          className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-1"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 h-7 rounded-lg text-xs font-medium transition ${
                activeFilter === f
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="sort-select" className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
            Sort by
          </label>
          <select
            id="sort-select"
            value={activeSort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-8 px-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 transition"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="priority-high">Priority: High → Low</option>
            <option value="priority-low">Priority: Low → High</option>
          </select>
        </div>
      </div>
    </div>
  );
}
