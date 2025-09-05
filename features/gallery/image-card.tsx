'use client';
import { formatDistanceToNow } from 'date-fns';
import { Download, Share2 } from 'lucide-react';
import { ImageZoom } from '@/components/custom/image-zoom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import type { TMedia } from '@/types';

export function ImageCard({
  url,
  title,
  description,
  createdAt,
  group,
}: TMedia) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, text: description, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert('Image URL copied to clipboard.');
    }
  };

  return (
    <div
      className="group relative flex cursor-pointer flex-col gap-4 rounded-sm bg-background p-2"
      title={title}
    >
      <div className="relative overflow-hidden rounded-md ring ring-ring/10">
        <AspectRatio className="h-full w-full" ratio={16 / 9}>
          <ImageZoom
            className="aspect-video h-fit w-full rounded-sm"
            zoomMargin={50}
          >
            <img
              alt={title}
              className="aspect-video w-full rounded-sm object-cover grayscale transition-all duration-300 hover:scale-105 group-hover:grayscale-0"
              height={225}
              src={url}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              width={399}
            />
          </ImageZoom>
        </AspectRatio>
      </div>
      <h2 className="text-pretty font-medium text-lg leading-6 tracking-tight">
        {title}
      </h2>

      <div className="mt-auto flex justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-medium text-sm">
          <p className="text-wrap">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
          <p className="text-muted-foreground text-sm">{group}</p>
        </div>
        <div className="flex gap-2">
          <Button
            aria-label="Share"
            onClick={handleShare}
            size="icon"
            variant="ghost"
          >
            <Share2 className="size-4" />
          </Button>
          <a
            aria-label="Download image"
            download
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button size="icon" variant="ghost">
              <Download className="size-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
