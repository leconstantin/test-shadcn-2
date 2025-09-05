import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { VideoHoverCard } from '@/components/custom/video-hover-card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { TMedia } from '@/types';

// video prors

export default function VideoCard({
  url,
  title,
  slug,
  createdAt,
  group,
}: TMedia) {
  return (
    <Link
      className="relative flex cursor-pointer flex-col gap-4 rounded-sm bg-background p-2"
      href={`/tv/${slug}`}
      title={title}
    >
      <div className="relative overflow-hidden rounded-md ring ring-ring/10">
        <AspectRatio ratio={16 / 9}>
          <VideoHoverCard src={url} />
        </AspectRatio>
      </div>
      <h2 className="text-pretty font-medium text-lg leading-6 tracking-tight">
        {title}
      </h2>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 font-medium text-sm">
        <p className="text-wrap">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
        <p className="text-muted-foreground text-sm">{group}</p>
      </div>
    </Link>
  );
}
