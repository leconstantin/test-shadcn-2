import { PageContainer } from '@/components/custom/page-container';
import { Skeleton } from '@/components/ui/skeleton';

export function CategorySkeleton() {
  return (
    <PageContainer className="pt-8 md:pt-16">
      <div className="flex w-full max-w-5xl items-center lg:max-w-6xl">
        <div className="relative flex w-full items-center gap-2 overflow-hidden p-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton className="h-9 w-24 rounded-md md:w-28 lg:w-32" key={i} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export function ArticleCategorySkeleton() {
  return (
    <PageContainer className="pt-8 md:pt-16">
      <div className="borde-grid relative flex flex-col gap-6 border-grid border-b pb-2 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-3xl items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton className="h-9 w-24 rounded-md md:w-28 lg:w-32" key={i} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
