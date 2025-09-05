import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { allCategories } from '@/config/app';
import { getAudiosCategories, getVideosCategories } from '@/data/categories';
import { CategoryButton } from '@/features/_shared/category-btn';
import type { TNewsCategory } from '@/types';
export default async function CategorySmall({
  type,
  filterCategory = 'all',
  slug,
}: {
  type: 'tv' | 'podcast' | 'all';
  filterCategory: string;
  slug: string;
}) {
  let categories: TNewsCategory[] = [];
  if (type === 'tv') {
    categories = await getVideosCategories();
  } else if (type === 'podcast') {
    categories = await getAudiosCategories();
  } else {
    categories = allCategories.map((c) => ({
      id: c.title.toLowerCase(),
      title: c.title,
    }));
  }
  return (
    <div className="relativ -ml-3 sticky top-14 z-10 bg-background">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          slidesToScroll: 3,
        }}
      >
        <div className="relative ml-2 flex w-full items-center overflow-hidden">
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
                  slug={slug}
                  type={type}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
}
