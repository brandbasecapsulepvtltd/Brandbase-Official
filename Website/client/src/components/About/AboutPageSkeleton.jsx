'use client';

export default function AboutPageSkeleton() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-24 pb-20" aria-label="Loading about page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded mb-8" />
        <div className="h-14 w-3/4 max-w-2xl bg-gray-200 dark:bg-zinc-800 rounded mx-auto mb-4" />
        <div className="h-8 w-1/2 max-w-xl bg-gray-200 dark:bg-zinc-800 rounded mx-auto mb-12" />
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-5/6" />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-4/6" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-100 dark:bg-zinc-900 rounded-xl" />
          ))}
        </div>
      </div>
    </main>
  );
}
