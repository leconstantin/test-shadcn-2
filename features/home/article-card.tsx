import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { GlowingEffect } from '@/components/custom/glowing-effect';
import { ImageZoom } from '@/components/custom/image-zoom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { TArticle } from '@/types';

export default function ArticleCard({ article }: { article: TArticle }) {
  const { title, slug, publishedAt, coverImage, group } = article;
  return (
    <div className="group relative flex h-full cursor-pointer flex-col gap-4 rounded-sm bg-background md:p-2">
      <GlowingEffect
        className="hidden md:block"
        disabled={false}
        glow={true}
        inactiveZone={0.01}
        proximity={64}
        spread={40}
      />

      <div className="relative w-full overflow-hidden rounded-md ring ring-ring/25">
        <AspectRatio className="w-full" ratio={16 / 9}>
          <ImageZoom className="aspect-video w-full rounded-sm" zoomMargin={50}>
            {/** biome-ignore lint/performance/noImgElement: <explanation> */}
            <img
              alt={title}
              className="aspect-video h-full w-full rounded-sm object-cover transition-transform duration-300 group-hover:scale-110"
              // priority
              src={coverImage}
            />
          </ImageZoom>
        </AspectRatio>
      </div>

      <Link className="mt-auto flex flex-col gap-4" href={`/article/${slug}`}>
        <h2 className="line-clamp-2 text-pretty pr-5 font-medium text-lg leading-6 tracking-tight ">
          {title}
        </h2>
        <div className="mt-auto md:pr-12 ">
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 font-medium text-sm">
            <p className="text-wrap transition-all duration-500 group-hover:tracking-wider">
              {group}
            </p>
            <p className="text-muted-foreground text-sm">
              {formatDistanceToNow(new Date(publishedAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
