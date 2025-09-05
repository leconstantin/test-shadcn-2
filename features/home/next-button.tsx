'use client';
import { ChevronRight } from 'lucide-react';
import { ProgressiveBlur } from '@/components/custom/progressive-blur';
import { useCarousel } from '@/components/ui/carousel';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function NextBtn({ className }: { className?: string }) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <div
      className={cn('absolute top-2 right-0 flex items-center p-2', className)}
    >
      <ProgressiveBlur
        blurIntensity={0.5}
        className="pointer-events-none absolute top-0 right-0 z-10 h-full w-full rounded-lg"
        direction="right"
      />
      <div className="relative z-20 pl-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="cursor-pointer rounded-lg bg-background/15 p-1.5 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!canScrollNext}
              onClick={scrollNext}
              type="button"
            >
              <ChevronRight className="size-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Next</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
