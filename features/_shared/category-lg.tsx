import { PageContainer } from '@/components/custom/page-container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { allCategories } from '@/config/app';
import {
  getAudiosCategories,
  getImagesCategories,
  getVideosCategories,
} from '@/data/categories';
import { CategoryButton } from '@/features/_shared/category-btn';
import NextBtn from '@/features/home/next-button';
import type { TNewsCategory } from '@/types';
export default async function CategoryLarge({
  type,
  filterCategory = 'all',
}: {
  type: 'tv' | 'podcast' | 'gallery' | 'all';
  filterCategory: string;
}) {
  let categories: TNewsCategory[] = [];

  if (type === 'tv') {
    categories = await getVideosCategories();
  } else if (type === 'podcast') {
    categories = await getAudiosCategories();
  } else if (type === 'gallery') {
    categories = await getImagesCategories();
  } else {
    categories = allCategories.map((c) => ({
      id: c.title.toLowerCase(),
      title: c.title,
    }));
  }
  return (
    <PageContainer className="pt-8 md:pt-16">
      <div className="relative">
        <Carousel
          className="flex w-full max-w-5xl items-center lg:max-w-6xl"
          opts={{
            align: 'start',
            loop: true,
            slidesToScroll: 3,
          }}
        >
          <div className="relative flex w-full items-center overflow-hidden p-2">
            <CarouselContent className="-ml-1">
              {categories.map((category) => (
                <CarouselItem
                  className="w-fit basis-auto pl-2"
                  key={category.title}
                >
                  <CategoryButton
                    active={filterCategory === category.title.toLowerCase()}
                    className="rounded-sm"
                    link={category.title.toLowerCase()}
                    name={category.title}
                    type={type}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {categories.length > 3 && (
              <NextBtn className="-right-2 top-0 hidden md:block" />
            )}
          </div>
        </Carousel>
      </div>
    </PageContainer>
  );
}
