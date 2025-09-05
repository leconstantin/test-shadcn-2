import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MediaCardSkeleton } from '@/features/_shared/card-skeleton';
import CategoryLarge from '@/features/_shared/category-lg';
import { CategorySkeleton } from '@/features/_shared/category-skeleton';
import PodCastList from '@/features/podcast/podcast-list';

export const metadata: Metadata = {
  title: 'Podcast',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = (await searchParams) as { category: string };
  return (
    <>
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryLarge filterCategory={category} type="podcast" />
      </Suspense>
      <Suspense fallback={<MediaCardSkeleton />}>
        <PodCastList category={category} />
      </Suspense>
    </>
  );
}
