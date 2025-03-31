import { Skeleton } from "@/components/ui/skeleton";

export function ResourcesSkeleton() {
  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-1">
            <Skeleton className="h-5 w-20 hidden md:block" />
            <Skeleton className="h-10 flex-1" />
          </div>
          <div className="flex gap-4">
            <div className="min-w-40 space-y-1 flex-1">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="min-w-40 space-y-1 flex-1">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
      </div>
    </>
  );
}
