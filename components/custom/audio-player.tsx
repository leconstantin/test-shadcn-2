'use client';

import {
  CheckIcon,
  Download,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import WaveSurfer from 'wavesurfer.js';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

type AudioPlayerProps = {
  src: string;
  title: string;
  thumbnail: string;
  mimeType: string;
  height?: number;
  barWidth?: number;
};

type PlayerState = 'loading' | 'ready' | 'error';
const VOLUME_STORAGE_KEY = 'audio-player-volume';
const SPEED_STORAGE_KEY = 'audio-player-speed';

export function AudioPlayer({
  src,
  title,
  thumbnail,
  mimeType,
  height = 64,
  barWidth = 2,
}: AudioPlayerProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [playerState, setPlayerState] = useState<PlayerState>('loading');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState('00:00');
  const [currentTime, setCurrentTime] = useState('00:00');
  const [playbackRate, setPlaybackRate] = useState(1);

  // Format time as mm:ss
  const formatTime = useCallback((s: number) => {
    if (!Number.isFinite(s)) return '00:00';
    const minutes = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(s % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, []);

  // Load saved preferences
  const loadSavedPreferences = useCallback(() => {
    const savedVolume = Number.parseFloat(
      localStorage.getItem(VOLUME_STORAGE_KEY) || '1'
    );
    const savedSpeed = Number.parseFloat(
      localStorage.getItem(SPEED_STORAGE_KEY) || '1'
    );

    return {
      volume: Math.max(0, Math.min(1, savedVolume)), // Clamp between 0-1
      speed: Math.max(0.25, Math.min(4, savedSpeed)), // Reasonable speed limits
    };
  }, []);

  // Initialize WaveSurfer
  useEffect(() => {
    if (!waveformRef.current) return;

    const { volume: savedVolume, speed: savedSpeed } = loadSavedPreferences();

    setPlayerState('loading');

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#ccc',
      progressColor: '#6366f1',
      height,
      barWidth,
      normalize: true,
    });

    // Event listeners
    const handleReady = () => {
      setDuration(formatTime(ws.getDuration()));
      setPlayerState('ready');
    };

    const handleError = (error: Error) => {
      toast.error(error.message);
      setPlayerState('error');
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleAudioProcess = () => {
      setCurrentTime(formatTime(ws.getCurrentTime()));
    };

    const handleFinish = () => {
      setIsPlaying(false);
    };

    // Attach event listeners
    ws.on('ready', handleReady);
    ws.on('error', handleError);
    ws.on('play', handlePlay);
    ws.on('pause', handlePause);
    ws.on('audioprocess', handleAudioProcess);
    ws.on('finish', handleFinish);

    // Load audio and apply saved settings
    ws.load(src);
    ws.setVolume(savedVolume);
    ws.setPlaybackRate(savedSpeed);

    setVolume(savedVolume);
    setPlaybackRate(savedSpeed);
    setIsMuted(savedVolume === 0);

    wavesurferRef.current = ws;

    return () => {
      // Cleanup event listeners
      ws.un('ready', handleReady);
      ws.un('error', handleError);
      ws.un('play', handlePlay);
      ws.un('pause', handlePause);
      ws.un('audioprocess', handleAudioProcess);
      ws.un('finish', handleFinish);
      ws.destroy();
    };
  }, [src, formatTime, loadSavedPreferences, height, barWidth]);

  const togglePlay = useCallback(() => {
    if (!wavesurferRef.current || playerState !== 'ready') return;
    wavesurferRef.current.playPause();
  }, [playerState]);

  const handleVolumeChange = useCallback((value: number[]) => {
    const vol = value[0];
    setVolume(vol);
    localStorage.setItem(VOLUME_STORAGE_KEY, vol.toString());

    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(vol);
      setIsMuted(vol === 0);
    }
  }, []);

  const handleSpeedChange = useCallback((rate: number) => {
    setPlaybackRate(rate);
    localStorage.setItem(SPEED_STORAGE_KEY, rate.toString());

    if (wavesurferRef.current) {
      wavesurferRef.current.setPlaybackRate(rate);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!wavesurferRef.current) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (newMuted) {
      wavesurferRef.current.setVolume(0);
    } else {
      // Restore previous volume, ensuring it's not 0
      const volumeToRestore = volume === 0 ? 0.5 : volume;
      wavesurferRef.current.setVolume(volumeToRestore);
      if (volume === 0) {
        setVolume(volumeToRestore);
        localStorage.setItem(VOLUME_STORAGE_KEY, volumeToRestore.toString());
      }
    }
  }, [isMuted, volume]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg border shadow-md">
      <AspectRatio ratio={834 / 470}>
        <Image
          alt={title}
          className="rounded-lg object-cover grayscale"
          fill
          priority
          sizes="(max-width: 834px) 100vw, 834px"
          src={thumbnail}
        />
      </AspectRatio>
      <div className="absolute bottom-0 flex w-full flex-col gap-3 rounded-lg bg-background/40 p-2 backdrop-blur-md supports-backdrop-blur:bg-background/90 md:p-4">
        {/* Title & Play/Pause */}
        <div className="flex items-center justify-between">
          <h3 className="truncate font-medium text-sm">{title}</h3>
          <div className="flex items-center gap-2">
            <Button
              className="rounded-full"
              onClick={togglePlay}
              size={'icon'}
              variant={'ghost'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>

            {/* Speed */}
            <div className="flex items-center gap-2 text-xs">
              <span className="whitespace-nowrap">Speed:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-sm px-2 text-xs"
                    size="sm"
                    variant="ghost"
                  >
                    {playbackRate}x
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                    <DropdownMenuItem
                      className={cn(
                        'cursor-pointer',
                        rate === playbackRate
                          ? 'flex justify-between font-semibold text-primary'
                          : ''
                      )}
                      key={rate}
                      onSelect={() => handleSpeedChange(rate)}
                    >
                      {rate}x
                      {rate === playbackRate && (
                        <CheckIcon className="ml-2 size-4 text-blue-600" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Download Button */}
            <Button
              asChild
              className="rounded-full"
              size={'icon'}
              title="Download"
              variant={'ghost'}
            >
              <a
                download={`${title}.${mimeType}`}
                href={src}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Download size={18} />
              </a>
            </Button>
          </div>
        </div>

        {/* Waveform */}
        <div className="w-full" ref={waveformRef} />

        {/* Time */}
        <div className="flex justify-between text-primary text-xs">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>

        {/* Volume & Mute */}
        <div className="flex items-center gap-3">
          <Button onClick={toggleMute} size={'icon'} variant={'ghost'}>
            {isMuted || volume === 0 ? (
              <VolumeX size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </Button>

          <Slider
            className="w-full cursor-pointer"
            max={1}
            min={0}
            onValueChange={handleVolumeChange}
            step={0.01}
            value={[isMuted ? 0 : volume]}
          />

          <div className="flex items-center gap-1">
            <span>{Math.round((isMuted ? 0 : volume) * 100)}</span>
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
