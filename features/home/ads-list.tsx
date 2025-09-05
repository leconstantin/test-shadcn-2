import { MegaphoneIcon } from 'lucide-react';
import { ProgressiveBlur } from '@/components/custom/progressive-blur';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ads } from '@/config/app';
import AdsCard from '@/features/home/ads-card';

export function AdsList() {
  return (
    <aside className="flex w-full flex-col gap-3 md:col-span-3">
      <div className="flex items-center justify-between px-5">
        <MegaphoneIcon className=" size-4" />
        <h2 className="text-center font-medium tracking-wide" id="ads-title">
          Advertisings
        </h2>
      </div>
      <div className="sticky top-16">
        <ScrollArea className="relative h-screen px-4 focus-visible:ring-[1px]">
          <div className="flex flex-col gap-4">
            {ads.map((ad) => (
              <AdsCard ad={ad} key={ad.companyName} />
            ))}
            {ads.map((ad) => (
              <AdsCard ad={ad} key={ad.companyName} />
            ))}
          </div>
          <ProgressiveBlur
            blurIntensity={1}
            className="pointer-events-none absolute top-0 h-1.5 w-full md:h-2"
            direction="top"
          />
          <ProgressiveBlur
            blurIntensity={1}
            className="-mb-1 pointer-events-none absolute bottom-0 h-1.5 w-full md:h-2"
            direction="bottom"
          />
        </ScrollArea>
      </div>
    </aside>
  );
}
