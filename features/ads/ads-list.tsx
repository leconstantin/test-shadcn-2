import Image from 'next/image';
import { PageContainer } from '@/components/custom/page-container';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { allAds } from '@/config/app';

export default function AdsList() {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allAds.map((ad) => (
          <AspectRatio key={ad.companyName} ratio={16 / 9}>
            <Image
              alt={ad.companyName}
              className="aspect-video w-full rounded-sm object-cover transition-all duration-300 hover:scale-105"
              height={500}
              priority
              src={ad.cover}
              width={500}
            />
          </AspectRatio>
        ))}
        {allAds.map((ad) => (
          <AspectRatio key={ad.companyName} ratio={16 / 9}>
            <Image
              alt={ad.companyName}
              className="aspect-video w-full rounded-sm object-cover transition-all duration-300 hover:scale-105"
              height={500}
              priority
              src={ad.cover}
              width={500}
            />
          </AspectRatio>
        ))}
        {allAds.map((ad) => (
          <AspectRatio key={ad.companyName} ratio={16 / 9}>
            <Image
              alt={ad.companyName}
              className="aspect-video w-full rounded-sm object-cover transition-all duration-300 hover:scale-105"
              height={500}
              priority
              src={ad.cover}
              width={500}
            />
          </AspectRatio>
        ))}
      </div>
    </PageContainer>
  );
}
