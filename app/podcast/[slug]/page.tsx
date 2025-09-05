import { formatDistanceToNow } from 'date-fns';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AudioPlayer } from '@/components/custom/audio-player';
import { PageContainer } from '@/components/custom/page-container';
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from '@/components/custom/disclosure';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAudio, getAudios, getAudiosByCategory } from '@/data/audios';
import CategorySmall from '@/features/_shared/category-sm';
import SecondaryAudioCard from '@/features/podcast/secondary-audio-card';
import type { TMedia } from '@/types';
import { audioPlaceHolder } from '@/config/app';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const podcast = await getAudio(slug);

  if (!podcast) {
    return notFound();
  }

  return {
    title: podcast.title,
    description: podcast.description,
    openGraph: {
      title: podcast.title,
      description: podcast.description,
      type: 'video.other',
      images: [
        {
          url: podcast.url,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: podcast.title,
      description: podcast.description,
      images: [podcast.url],
      creator: '@rathonagency',
    },
  };
}

export async function generateStaticParams() {
  const podcasts = await getAudios();
  return podcasts.map((podcast) => ({
    slug: podcast.slug,
  }));
}

export default async function PodcastPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const currentPodcast = await getAudio(slug);
  const { category } = (await searchParams) as { category: string };

  const podcasts = category
    ? await getAudiosByCategory(category)
    : await getAudios();

  if (!currentPodcast) {
    return <div>Podcast not found</div>;
  }

  const otherPodcasts = podcasts.filter((podcast) => podcast.slug !== slug);

  return (
    <PageContainer className="py-8 md:py-16">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <VideoPlayer video={currentPodcast} />
        </div>
        <div className="col-span-12 py-6 md:col-span-4 md:py-0">
          <div className="relative flex flex-col gap-4 md:gap-2">
            <CategorySmall
              filterCategory={category}
              slug={slug}
              type="podcast"
            />
            <div className="sticky top-0">
              <ScrollArea className="relative h-screen w-full py-2 focus-visible:ring-[1px]">
                <div className="flex flex-col gap-3 ">
                  {otherPodcasts.map((pod) => (
                    <SecondaryAudioCard key={pod.title} {...pod} />
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
        <AudioPlayer
          mimeType="audio/mpeg"
          src={video.url}
          thumbnail={audioPlaceHolder}
          title={video.title}
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
            <div className="flex items-center justify-between">
              <p className="text-wrap">
                {formatDistanceToNow(new Date(video.createdAt), {
                  addSuffix: true,
                })}
              </p>
              <p className="text-wrap">{video.group}</p>
            </div>
          </div>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}
