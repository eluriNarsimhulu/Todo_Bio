import TaskForm from '@/components/TaskForm';
import FilterBar from '@/components/FilterBar';
import TaskList from '@/components/TaskList';
import TaskStats from '@/components/TaskStats';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Task Manager
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Stay organised. Get things done.
          </p>
        </div>

        <TaskStats />
        <TaskForm />
        <FilterBar />
        <TaskList />
      </div>
    </main>
  );
}
