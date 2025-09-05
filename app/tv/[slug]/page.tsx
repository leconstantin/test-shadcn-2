import { formatDistanceToNow } from 'date-fns';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Player from 'next-video/player';
import { PageContainer } from '@/components/custom/page-container';
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from '@/components/ui/disclosure';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getVideo, getVideos, getVideosByCategory } from '@/data/videos';
import CategorySmall from '@/features/_shared/category-sm';
import SecondaryVideoCard from '@/features/tv/secondary-video-card';
import type { TMedia } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideo(slug);

  if (!video) {
    return notFound();
  }

  return {
    title: video.title,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      type: 'video.other',
      images: [
        {
          url: video.url,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description: video.description,
      images: [video.url],
      creator: '@rathonagency',
    },
  };
}

// ✅ Add this or adjust it to match your actual type

export async function generateStaticParams() {
  const videos = await getVideos();
  return videos.map((video) => ({ slug: video.slug }));
}

export default async function TVPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const currentVideo = await getVideo(slug);
  const { category } = (await searchParams) as { category: string };

  const videos = category
    ? await getVideosByCategory(category)
    : await getVideos();

  if (!currentVideo) {
    return <div>Video not found</div>;
  }

  const otherVideos = videos.filter((v) => v.slug !== slug);

  return (
    <PageContainer className="py-8 md:py-16">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <VideoPlayer video={currentVideo} />
        </div>
        <div className="col-span-12 py-6 md:col-span-4 md:py-0">
          <div className="relative flex flex-col gap-4 md:gap-2">
            <CategorySmall filterCategory={category} slug={slug} type="tv" />
            <div className="sticky top-0">
              <ScrollArea className="relative h-screen w-full py-2 focus-visible:ring-[1px]">
                <div className="flex flex-col gap-3 ">
                  {otherVideos.map((vid) => (
                    <SecondaryVideoCard key={vid.title} {...vid} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function VideoPlayer({ video }: { video: TMedia }) {
  return (
    <div className="flex flex-col gap-6 p-1">
      <div className="relative overflow-hidden rounded-lg">
        <Player
          autoPlay
          className="rounded-lg bg-background"
          controls
          src={video.url}
          style={{
            borderRadius: '10px',
          }}
        />
      </div>
      <VideoDescription video={video} />
    </div>
  );
}

function VideoDescription({ video }: { video: TMedia }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-2xl">{video.title}</h2>
      <Disclosure className="w-full rounded-md bg-muted px-3">
        <DisclosureTrigger className="flex cursor-pointer">
          <button
            className="w-full cursor-pointer py-2 text-left text-sm"
            type="button"
          >
            Show more
          </button>
        </DisclosureTrigger>
        <DisclosureContent>
          <div className="overflow-hidden pb-3">
            <p className="text-muted-foreground tracking-tight">
              {video.description}
            </p>
            <p className="text-muted-foreground tracking-tight">
              In this urgent video, we break down the latest market crash and
              what it means for investors, businesses, and the global economy.
              Whether you're in stocks, crypto, real estate, or just want to
              protect your money, this is essential viewing.
            </p>
            <p className="text-wrap">
              {formatDistanceToNow(new Date(video.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}
