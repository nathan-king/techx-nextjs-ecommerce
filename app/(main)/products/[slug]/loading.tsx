"use client";

export default function ProductLoading() {
  return (
    <div className="grid w-full items-start gap-8 lg:grid-cols-2 xl:grid-cols-[1.3fr,0.7fr]">
      <div className="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-sm">
        <div className="h-6 w-24 rounded-full bg-muted animate-pulse" />
        <div className="aspect-square rounded-xl bg-muted animate-pulse" />
        <div className="grid gap-3 rounded-xl border bg-card/60 p-4 text-sm shadow-sm sm:grid-cols-2">
          <div className="h-4 w-32 rounded-full bg-muted animate-pulse" />
          <div className="h-4 w-40 rounded-full bg-muted animate-pulse" />
        </div>
      </div>
      <div className="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-6 w-16 rounded-full bg-muted animate-pulse" />
          <div className="h-6 w-16 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="h-10 w-3/4 rounded bg-muted animate-pulse" />
        <div className="h-4 w-full rounded bg-muted animate-pulse" />
        <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
        <div className="h-8 w-40 rounded bg-muted animate-pulse" />
        <div className="h-12 w-full rounded bg-muted animate-pulse" />
        <div className="h-12 w-full rounded bg-muted animate-pulse" />
      </div>
    </div>
  );
}
