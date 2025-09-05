import type { TMedia } from "@/types";

export async function getVideos(): Promise<TMedia[]> {
  try {
    const res = await fetch(`${process.env.CONVEX_SITE_URL}/videos`);

    if (!res.ok) {
      return [];
    }

    const videos = await res.json();

    if (Array.isArray(videos)) {
      return videos;
    }

    if (videos && typeof videos === "object" && "success" in videos) {
      if (!videos.success) {
        return [];
      }
      return videos.data || [];
    }

    if (!videos) return [];
    return Array.isArray(videos) ? videos : [];
  } catch {
    return [];
  }
}
export async function getVideo(slug: string): Promise<TMedia | null> {
  const videos = await getVideos();
  const videoFile = videos.find((video) => video.slug === slug);
  if (!videoFile) return null;
  return videoFile;
}

export async function getVideosByCategory(category: string): Promise<TMedia[]> {
  const videos = await getVideos();
  if (!videos) return [];
  if (category === "all") {
    return videos;
  }
  return videos.filter(
    (v) => v.group?.toLowerCase() === category.toLowerCase()
  );
}
