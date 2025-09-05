'use client';

import type { VideoHTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export type VideoHoverCardProps = VideoHTMLAttributes<HTMLVideoElement>;

const tRegex = /t=(\d+(?:\.\d+)?)/;

export const VideoHoverCard = ({
  className,
  ...props
}: VideoHoverCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const initialTimeRef = useRef<number>(0);

  // Parse the initial time from the src attribute (e.g., #t=20)
  useEffect(() => {
    const src = (props.src ?? '') as string;
    let initialTime = 0;
    if (typeof src === 'string') {
      const hashIndex = src.indexOf('#');
      if (hashIndex !== -1) {
        const hash = src.slice(hashIndex + 1);
        // Look for t=number or t=start,end
        const tMatch = hash.match(tRegex);
        if (tMatch) {
          initialTime = Number.parseFloat(tMatch[1]);
        }
      }
    }
    initialTimeRef.current = initialTime;
  }, [props.src]);

  const handleMouseOver = () => {
    videoRef.current?.play();
  };

  const handleMouseOut = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = initialTimeRef.current;
    }
  };

  const handleFocus = () => {
    videoRef.current?.play();
  };

  const handleBlur = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = initialTimeRef.current;
    }
  };

  return (
    <video
      className={cn(
        'absolute inset-0 size-full object-cover',
        'transition-opacity duration-200',
        'aspect-video rounded-md group-hover:opacity-90',
        className
      )}
      loop
      muted
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
      preload="metadata"
      ref={videoRef}
      tabIndex={0}
      {...props}
    />
  );
};
