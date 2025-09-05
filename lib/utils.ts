import { type ClassValue, clsx } from 'clsx';
import {
  Briefcase,
  Clapperboard,
  Cpu,
  FlaskConical,
  Globe2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Leaf,
  List,
  MessageCircleQuestion,
  Palette,
  Plane,
  ShieldAlert,
  Smile,
  Trophy,
} from 'lucide-react';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaTiktok,
  FaTwitch,
} from 'react-icons/fa';
import { FaGlobe, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { PiLinktreeLogo } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DECIMAL_REGEX = /\.0$/;

export function formatViews(views: number): string {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000)
      .toFixed(1)
      .replace(DECIMAL_REGEX, '')}M views`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1).replace(DECIMAL_REGEX, '')}K views`;
  }
  return `${views} views`;
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export const getSocialIcon = (name: string) => {
  switch (name) {
    case 'twitter':
      return FaXTwitter;
    case 'linkedin':
      return FaLinkedin;
    case 'github':
      return FaGithub;
    case 'facebook':
      return FaFacebook;
    case 'instagram':
      return FaInstagram;
    case 'youtube':
      return FaYoutube;
    case 'twitch':
      return FaTwitch;
    case 'tiktok':
      return FaTiktok;
    case 'website':
      return FaGlobe;
    case 'linktree':
      return PiLinktreeLogo;
    default:
      return FaLink;
  }
};

export const getCategoryIcon = (name: string) => {
  switch (name) {
    case 'All':
      return List;
    case 'Politics':
      return Landmark;
    case 'Business':
      return Briefcase;
    case 'Technology':
      return Cpu;
    case 'Sport':
      return Trophy;
    case 'Entertainment':
      return Clapperboard;
    case 'Health':
      return HeartPulse;
    case 'Science':
      return FlaskConical;
    case 'World':
      return Globe2;
    case 'Education':
      return GraduationCap;
    case 'Environment':
      return Leaf;
    case 'Lifestyle':
      return Smile;
    case 'Travel':
      return Plane;
    case 'Crime':
      return ShieldAlert;
    case 'Opinion':
      return MessageCircleQuestion;
    case 'Culture':
      return Palette;
    default:
      return FaGlobe;
  }
};
