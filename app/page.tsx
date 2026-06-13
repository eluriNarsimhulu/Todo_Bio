'use client';

import dynamic from 'next/dynamic';
import TaskForm from '@/components/TaskForm';
import FilterBar from '@/components/FilterBar';
import TaskList from '@/components/TaskList';
import TaskStats from '@/components/TaskStats';

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Video background — fixed so it stays while scrolling */}
      <div className="fixed inset-0 z-0">
        <VideoPlayer />
        {/* Subtle dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Task manager content */}
      <main className="relative z-10 min-h-screen py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
              Task Manager
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Stay organised. Get things done.
            </p>
          </div>

          <TaskStats />
          <TaskForm />
          <FilterBar />
          <TaskList />
        </div>
      </main>
    </div>
  );
}