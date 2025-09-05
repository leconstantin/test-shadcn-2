import Image from 'next/image';
import { InfiniteSlider } from '@/components/custom/infinite-slider';
import { PageContainer } from '@/components/custom/page-container';

const topImages = [
  {
    imageUrl:
      'https://3u39ha98bi.ufs.sh/f/CoX6DXpfh7iacncK2x7FKIX2wE9MgWLrjDpBtsld5b8QoUnm',
    title: 'F1 ad',
  },
  {
    imageUrl:
      'https://3u39ha98bi.ufs.sh/f/CoX6DXpfh7iaCU0C1vpfh7iarRGDeIE0ybxgWnV8O5PL1tQp',
    title: 'Billboard ads',
  },
  {
    imageUrl:
      'https://3u39ha98bi.ufs.sh/f/CoX6DXpfh7iaYDmVywoaJzVlKoZxc2E43CTUbPOAw6ki8HrI',
    title: 'Food ad',
  },
  {
    imageUrl:
      'https://3u39ha98bi.ufs.sh/f/CoX6DXpfh7iaa69NPAJ1npk3r8ExlDf4BaZstz7TmuJNVhGW',
    title: 'Mtn ad',
  },
  {
    imageUrl:
      'https://3u39ha98bi.ufs.sh/f/CoX6DXpfh7iam1bSNJKjExQJ8IMnmgPo2OLyqKNFpsV0z3ce',
    title: 'Airtime ad',
  },
];

export function TopImagesAds() {
  return (
    <PageContainer className="pb-8 md:pb-12">
      <InfiniteSlider gap={24} speedOnHover={20}>
        {topImages.map((image) => (
          <Image
            alt={image.title}
            className="aspect-square w-[120px] cursor-pointer rounded-sm"
            height={120}
            key={image.title}
            src={image.imageUrl}
            width={120}
          />
        ))}
      </InfiniteSlider>
    </PageContainer>
  );
}
