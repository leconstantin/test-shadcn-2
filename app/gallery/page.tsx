import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageProgressbar } from '@/components/custom/page-progressbar';
import { MediaCardSkeleton } from '@/features/_shared/card-skeleton';
import CategoryLarge from '@/features/_shared/category-lg';
import { CategorySkeleton } from '@/features/_shared/category-skeleton';
import GalleryList from '@/features/gallery/image-list';

export const metadata: Metadata = {
  title: 'Gallery',
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = (await searchParams) as { category: string };
  return (
    <>
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryLarge filterCategory={category} type="gallery" />
      </Suspense>
      <Suspense fallback={<MediaCardSkeleton />}>
        <GalleryList category={category} />
      </Suspense>
      <PageProgressbar />
    </>
  );
}
