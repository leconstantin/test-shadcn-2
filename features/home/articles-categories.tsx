import Link from 'next/link';
import { PageContainer } from '@/components/custom/page-container';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { getArticlesCategories } from '@/data/categories';
import ControlsArticle from '@/features/home/article-controls';
import NextBtn from '@/features/home/next-button';
import { cn } from '@/lib/utils';
export default async function ArticlesCategories({
  filterCategory = 'all',
}: {
  filterCategory: string;
}) {
  const newsCategories = await getArticlesCategories();
  return (
    <PageContainer>
      <div className="borde-grid relative flex flex-col gap-6 border-grid border-b pb-2 md:flex-row md:items-center md:justify-between">
        <Carousel
          className="flex w-full max-w-3xl items-center"
          opts={{
            align: 'start',
            loop: true,
            slidesToScroll: 3,
          }}
        >
          <div className="relative w-full overflow-hidden p-2">
            <CarouselContent className="-ml-4 mr-2 md:mr-4">
              {newsCategories.map((cat, index) => (
                <CarouselItem
                  className={cn(
                    'basis-1/3 py-1 pl-4 md:basis-1/4 lg:basis-1/6',
                    index === 0 && 'pl-4 '
                  )}
                  key={cat.id}
                >
                  <CategoryBtn
                    active={filterCategory === cat.title.toLowerCase()}
                    link={cat.title.toLowerCase()}
                    name={cat.title}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {newsCategories.length > 3 && <NextBtn className="top-1 right-0" />}
          </div>
        </Carousel>
        <ControlsArticle />
      </div>
    </PageContainer>
  );
}

export function CategoryBtn({
  name,
  link,
  className,
  active,
}: {
  name: string;
  link: string;
  className?: string;
  active: boolean;
}) {
  return (
    <Button
      asChild
      className={cn('h-full w-full px-2', className)}
      variant={active ? 'default' : 'secondary'}
    >
      <Link href={`/?category=${link}`} scroll={false}>
        <span>{name}</span>
      </Link>
    </Button>
  );
}
