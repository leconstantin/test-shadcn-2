import { PageContainer } from '@/components/custom/page-container';
import { getVideos, getVideosByCategory } from '@/data/videos';
import VideoCard from '@/features/tv/video-card';

export async function VideoList({ category }: { category: string }) {
  const tvVideos = category
    ? await getVideosByCategory(category)
    : await getVideos();
  return (
    <PageContainer className="py-8 pb-20 md:pb-16">
      <div className="flex flex-col gap-6 md:gap-10">
        <div className="grid grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-9">
          {tvVideos.map((video) => (
            <VideoCard key={video.title} {...video} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
