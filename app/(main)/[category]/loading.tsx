"use client";

function CardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border bg-card/70 p-3 shadow-sm">
      <div className="aspect-square rounded-lg bg-muted animate-pulse" />
      <div className="mt-3 h-4 w-3/4 rounded bg-muted animate-pulse" />
      <div className="mt-2 h-3 w-1/2 rounded bg-muted animate-pulse" />
      <div className="mt-4 h-4 w-24 rounded bg-muted animate-pulse" />
      <div className="mt-auto h-10 w-full rounded bg-muted animate-pulse" />
    </div>
  );
}

export default function CategoryLoading() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </div>
  );
}
