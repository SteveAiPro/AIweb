export default function Loading() {
  return (
    <div className="min-h-[50vh] bg-slate-50">
      <div className="h-1 w-full overflow-hidden bg-cyan-100">
        <div className="h-full w-1/3 animate-pulse bg-cyan-500" />
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-4 h-10 w-2/3 max-w-md animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-100" />
          <div className="h-4 w-4/6 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
