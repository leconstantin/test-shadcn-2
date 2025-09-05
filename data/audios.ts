import type { TMedia } from "@/types";

export async function getAudios(): Promise<TMedia[]> {
  try {
    const res = await fetch(`${process.env.CONVEX_SITE_URL}/audios`);

    if (!res.ok) {
      return [];
    }

    const audios = await res.json();

    if (Array.isArray(audios)) {
      return audios;
    }

    if (audios && typeof audios === "object" && "success" in audios) {
      if (!audios.success) {
        return [];
      }
      return audios.data || [];
    }

    if (!audios) return [];
    return Array.isArray(audios) ? audios : [];
  } catch {
    return [];
  }
}

export async function getAudio(slug: string): Promise<TMedia | null> {
  const audios = await getAudios();
  const audioFile = audios.find((audio) => audio.slug === slug);
  if (!audioFile) return null;
  return audioFile;
}

export async function getAudiosByCategory(category: string): Promise<TMedia[]> {
  const audios = await getAudios();
  if (!audios) return [];
  if (category === "all") {
    return audios;
  }
  return audios.filter(
    (a) => a.group?.toLowerCase() === category.toLowerCase()
  );
}
