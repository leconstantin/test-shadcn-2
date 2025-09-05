import { Suspense } from 'react';
import { PageContainer } from '@/components/custom/page-container';
import { ArticlesCardSkeleton } from '@/features/_shared/card-skeleton';
import { ArticleCategorySkeleton } from '@/features/_shared/category-skeleton';
import { AdsList } from '@/features/home/ads-list';
import ArticleLists from '@/features/home/article-lists';
import ArticlesCategories from '@/features/home/articles-categories';
import { TopImagesAds } from '@/features/home/top-images';
import { TopTextAds } from '@/features/home/top-texts';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = (await searchParams) as { category: string };
  return (
    <>
      <TopTextAds />
      <TopImagesAds />
      <Suspense fallback={<ArticleCategorySkeleton />}>
        <ArticlesCategories filterCategory={category} />
      </Suspense>
      <PageContainer className="relative py-8 pb-10 md:py-6 md:pb-20">
        <div className="relative grid w-full grid-cols-1 gap-8 md:grid-cols-12 md:gap-0">
          <Suspense fallback={<ArticlesCardSkeleton />}>
            <ArticleLists category={category} />
          </Suspense>
          <AdsList />
        </div>
      </PageContainer>
    </>
  );
}
