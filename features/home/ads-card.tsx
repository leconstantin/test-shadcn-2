'use client';
import Image from 'next/image';
import Link from 'next/link';
import VideoWithHoverControls from '@/components/custom/video-player';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { ads } from '@/config/app';

export default function AdsCard({ ad }: { ad: (typeof ads)[0] }) {
  return (
    <div className="relative flex flex-col gap-4 rounded-sm bg-background p-2">
      <div className="relative overflow-hidden rounded-sm">
        {ad.coverType === 'img' ? (
          <Link href="/ads">
            <AspectRatio ratio={16 / 9}>
              <Image
                alt={ad.companyName}
                className="w-full rounded-sm object-cover transition-all duration-300 hover:scale-105"
                height={500}
                priority
                src={ad.cover}
                width={500}
              />
            </AspectRatio>
          </Link>
        ) : (
          <VideoWithHoverControls src={ad.cover} />
        )}
      </div>
      <Link
        className="font-medium text-lg tracking-tight hover:underline"
        href={ad.link || '/'}
      >
        {ad.companyName}
      </Link>
    </div>
  );
}
