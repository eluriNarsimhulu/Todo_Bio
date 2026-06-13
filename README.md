# Task Manager

A lightweight task management application built with Next.js, TypeScript, Zustand, and Tailwind CSS.

## Features

- **Add tasks** with a title and priority (Low / Medium / High)
- **Toggle status** between Pending and Done
- **Filter tasks** by All / Pending / Done
- **Search** tasks by keyword
- **Sort** by newest, oldest, or priority
- **Delete** tasks
- **Task stats** — live count of total, pending, and done
- **Persistent storage** — all data survives page refresh via localStorage
- **Dark mode** — follows system preference
- **Responsive** — works on desktop and mobile

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| State | Zustand with `persist` middleware |
| Styling | Tailwind CSS |
| Persistence | localStorage (via Zustand persist) |

## Project Structure

```
task-manager/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Main page
│   └── globals.css         # Base styles
├── components/
│   ├── TaskForm.tsx        # Task creation form
│   ├── FilterBar.tsx       # Search, filter, and sort controls
│   ├── TaskList.tsx        # Renders the filtered task list
│   ├── TaskCard.tsx        # Individual task card
│   └── TaskStats.tsx       # Summary count cards
├── store/
│   └── taskStore.ts        # Zustand store (addTask, toggleDone, setFilter…)
├── types/
│   └── task.ts             # Task, Filter, Priority, SortOption types
└── utils/
    └── filters.ts          # filterAndSortTasks, getTaskCounts
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo at [vercel.com](https://vercel.com).
