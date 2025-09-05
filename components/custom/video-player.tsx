'use client';

import { Pause, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

interface VideoWithHoverControlsProps {
  src: string;
}

export default function VideoWithHoverControls({
  src,
}: VideoWithHoverControlsProps) {
  const [isPlaying, setIsPlaying] = useState(true); // autoPlay is true initially
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AspectRatio ratio={16 / 9}>
        <video
          autoPlay
          className="aspect-video w-full rounded-sm object-cover"
          controls={false}
          loop
          muted
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          playsInline
          ref={videoRef}
          src={src}
        />
      </AspectRatio>

      {/* Play/Pause Button Overlay */}
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            className="h-12 w-12 rounded-full border-0 bg-black/50 text-white transition-all duration-200 hover:bg-black/70"
            onClick={togglePlayPause}
            size="icon"
            variant="secondary"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 fill-white" />
            ) : (
              <Play className="ml-0.5 h-6 w-6 fill-white" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
