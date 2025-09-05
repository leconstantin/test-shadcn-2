import type { Metadata } from 'next';
import AdsList from '@/features/ads/ads-list';
import { TopImagesAds } from '@/features/home/top-images';
import { TopTextAds } from '@/features/home/top-texts';

export const metadata: Metadata = {
  title: 'Ads',
};

export default function AdsPage() {
  return (
    <>
      <TopTextAds />
      <TopImagesAds />
      <AdsList />
    </>
  );
}
