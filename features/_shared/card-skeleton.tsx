import { PageContainer } from '@/components/custom/page-container';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

export function MediaCardSkeleton() {
  return (
    <PageContainer className="py-8 pb-20 md:pb-16">
      <div className="flex flex-col gap-6 md:gap-10">
        <div className="grid grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-9">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              className="relative flex cursor-pointer flex-col gap-4 rounded-sm bg-background p-2"
              key={i}
            >
              <div className="relative overflow-hidden rounded-md ring ring-ring/10">
                <AspectRatio ratio={16 / 9}>
                  <Skeleton className="h-full w-full rounded-xl" />
                </AspectRatio>
              </div>
              <Skeleton className="h-4 w-2/3" />

              <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 font-medium text-sm">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export function ArticlesCardSkeleton() {
  return (
    <div className="w-full md:col-span-9">
      <div className="grid grid-cols-1 gap-x-3 gap-y-8 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            className="relative flex cursor-pointer flex-col gap-4 rounded-md bg-background p-2"
            key={i}
          >
            <div className="relative overflow-hidden rounded-md ring ring-ring/10">
              <AspectRatio ratio={16 / 9}>
                <Skeleton className="h-full w-full rounded-xl" />
              </AspectRatio>
            </div>
            <Skeleton className="h-4 w-2/3" />

            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 font-medium text-sm">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
