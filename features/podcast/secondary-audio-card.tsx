import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import podCover from '@/public/images/pod-cover.jpg';
import type { TMedia } from '@/types';
export default function SecondaryAudioCard({
  title,
  slug,
  group,
  description,
  createdAt,
}: TMedia) {
  return (
    <Link
      className="group relative w-full"
      href={`/podcast/${slug}`}
      title={title}
    >
      <div className="flex justify-between gap-4">
        <div className="relative aspect-video min-h-[100px] overflow-hidden rounded-sm object-cover">
          <Image
            alt={title}
            className="object-cover grayscale group-hover:grayscale-75"
            fill
            src={podCover}
          />
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
