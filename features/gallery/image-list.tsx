import { BlurFade } from '@/components/custom/blur-fade';
import { PageContainer } from '@/components/custom/page-container';
import { getImages, getImagesByCategory } from '@/data/images';
import { ImageCard } from '@/features/gallery/image-card';

export default async function GalleryList({ category }: { category: string }) {
  const images = category
    ? await getImagesByCategory(category)
    : await getImages();
  if (!images.length) {
    return null;
  }
  return (
    <PageContainer className="py-8 pb-20 md:pb-16">
      <div className="flex flex-col gap-6 md:gap-10">
        <div className="grid grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-9">
          {images.map((img, index) => (
            <BlurFade delay={0.25 + index * 0.05} inView key={img.title}>
              <ImageCard {...img} />
            </BlurFade>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
