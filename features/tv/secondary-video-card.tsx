import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { VideoHoverCard } from '@/components/custom/video-hover-card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { TMedia } from '@/types';

export default function SecondaryVideoCard({
  title,
  url,
  slug,
  group,
  description,
  createdAt,
}: TMedia) {
  return (
    <Link className="relative w-full " href={`/tv/${slug}`} title={title}>
      <div className="flex justify-between gap-4">
        <div className="relative aspect-video min-h-[100px] overflow-hidden rounded-sm object-cover">
          <AspectRatio ratio={16 / 9}>
            <VideoHoverCard src={url} />
          </AspectRatio>
        </div>

        <div className="flex flex-1 flex-col gap-1 py-2 pr-2">
          <h2 className="font-semibold text-base leading-5 tracking-tighter">
            {title}
          </h2>
          <p className="line-clamp-1 text-muted-foreground text-sm leading-4 tracking-tight ">
            {description}
          </p>
          <div className="mt-auto flex flex-col gap-1">
            <p className="text-muted-foreground text-sm">{group}</p>

            <p className="text-wrap text-muted-foreground text-xs">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
