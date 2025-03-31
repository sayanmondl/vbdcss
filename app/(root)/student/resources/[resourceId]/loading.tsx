import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ResourceLoading() {
  return (
    <div className="pagemargin">
      <div className="mb-6">
        <Skeleton className="h-5 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-10 w-full" />

              <div className="h-px bg-muted w-full my-2" />

              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Skeleton className="h-10 w-3/4 mb-4" />

          <div className="bg-muted/40 p-4 rounded-md mb-6">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="mt-8">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-full mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-full mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
