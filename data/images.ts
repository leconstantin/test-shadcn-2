import type { TMedia } from "@/types";

export async function getImages(): Promise<TMedia[]> {
  try {
    const res = await fetch(`${process.env.CONVEX_SITE_URL}/images`);

    // Check if the HTTP request was successful
    if (!res.ok) {
      return [];
    }

    const images = await res.json();

    // Handle empty array response (no images found)
    if (Array.isArray(images)) {
      return images;
    }

    // Handle error response from API
    if (images && typeof images === "object" && "success" in images) {
      if (!images.success) {
        return [];
      }
      // Return the data array from successful response
      return images.data || [];
    }

    // Fallback for unexpected response format
    if (!images) return [];
    return Array.isArray(images) ? images : [];
  } catch {
    return [];
  }
}

export async function getImagesByCategory(category: string): Promise<TMedia[]> {
  const images = await getImages();
  if (!images) return [];
  if (category === "all") {
    return images;
  }
  return images.filter(
    (i) => i.group?.toLowerCase() === category.toLowerCase()
  );
}
