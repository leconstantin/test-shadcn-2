import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MediaCardSkeleton } from '@/features/_shared/card-skeleton';
import CategoryLarge from '@/features/_shared/category-lg';
import { CategorySkeleton } from '@/features/_shared/category-skeleton';
import { VideoList } from '@/features/tv/video-list';

export const metadata: Metadata = {
  title: 'Videos',
};

export default async function TvPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = (await searchParams) as { category: string };
  return (
    <>
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryLarge filterCategory={category} type="tv" />
      </Suspense>
      <Suspense fallback={<MediaCardSkeleton />}>
        <VideoList category={category} />
      </Suspense>
    </>
  );
}
