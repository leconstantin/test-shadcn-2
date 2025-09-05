import { PageContainer } from '@/components/custom/page-container';
import { getAudios, getAudiosByCategory } from '@/data/audios';
import AudioCard from '@/features/podcast/audio-card';

export default async function PodCastList({ category }: { category: string }) {
  const podcasts = category
    ? await getAudiosByCategory(category)
    : await getAudios();
  return (
    <PageContainer className="py-8 pb-20 md:pb-16">
      <div className="flex flex-col gap-6 md:gap-10">
        <div className="grid grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-9">
          {podcasts.map((audio) => (
            <AudioCard key={audio.title} {...audio} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
