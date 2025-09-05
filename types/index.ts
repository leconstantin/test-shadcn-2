import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type TFooterLink = {
  title: string;
  links: { name: string; href: string; external: boolean }[];
};
export type TNavItem = {
  href: string;
  label: string;
  external?: boolean;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export interface VideoPlayerProps {
  src: string | string[];
  poster?: string;
  className?: string;
  buttonClassName?: string;
  aspectRatio?: "16/9" | "9/16" | "4/3" | "1/1" | "auto";
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  showCenterPlayButton?: boolean;
  showHoverControls?: boolean;
  autoPlayOnHover?: boolean;
  pauseOnHoverLeave?: boolean;
  buttonPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onHoverPlay?: () => void;
  onHoverPause?: () => void;
  width?: string | number;
  height?: string | number;
}

export type TNewsLink = {
  title: string;
  links: {
    title: string;
    href: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    external: boolean;
  }[];
};

export type Ad = {
  companyName: string;
  cover: string;
  coverType: "img" | "vid";
  createdAt: string;
  link?: string;
  isActive?: boolean;
};

export type TNewsCategory = {
  id: string;
  title: string;
};

export type TCategory = {
  title: string;
};

export type TArticle = {
  title: string;
  slug: string;
  description: string | undefined;
  content: string | undefined;
  words: number | undefined;
  coverImage: string;
  status: "draft" | "staged" | "approved" | "published" | "deleted";
  group: string;
  authorId: string;
  publishedAt: number;
};

export type TMember = {
  id: string;
  avatarUrl: string | null | undefined;
  _creationTime: number;
  name?: string | undefined;
  image?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  username?: string | undefined;
  bio?: string | undefined;
  role?: "author" | "admin" | "media-manager" | "ads-manager" | undefined;
  coverImage?: string | undefined;
  socialLinks?:
    | {
        name: string;
        url: string;
      }[]
    | undefined;
};

export type TMedia = {
  title: string;
  slug: string;
  description: string | undefined;
  url: string;
  createdAt: number;
  group: string | null;
};
