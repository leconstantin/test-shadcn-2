import type { TNewsCategory } from "@/types";
import { getArticles } from "./articles";
import { getAudios } from "./audios";
import { getImages } from "./images";
import { getVideos } from "./videos";

export async function getArticlesCategories(): Promise<TNewsCategory[]> {
  const articles = await getArticles();

  const categories: Record<string, TNewsCategory> = {};

  for (const article of articles) {
    const categoryName = article.group;
    if (categoryName && !categories[categoryName]) {
      categories[categoryName] = {
        id: categoryName.toLowerCase(),
        title: categoryName,
      };
    }
  }

  return [
    { id: "all", title: "All" }, // Add "All" category at the start
    ...Object.values(categories),
  ];
}

export async function getAudiosCategories(): Promise<TNewsCategory[]> {
  const audios = await getAudios();

  const categories: Record<string, TNewsCategory> = {};

  for (const audio of audios) {
    const categoryName = audio.group;
    if (categoryName && !categories[categoryName]) {
      categories[categoryName] = {
        id: categoryName.toLowerCase(),
        title: categoryName,
      };
    }
  }

  return [
    { id: "all", title: "All" }, // Add "All" category at the start
    ...Object.values(categories),
  ];
}

export async function getVideosCategories(): Promise<TNewsCategory[]> {
  const videos = await getVideos();

  const categories: Record<string, TNewsCategory> = {};

  for (const video of videos) {
    const categoryName = video.group;
    if (categoryName && !categories[categoryName]) {
      categories[categoryName] = {
        id: categoryName.toLowerCase(),
        title: categoryName,
      };
    }
  }

  return [
    { id: "all", title: "All" }, // Add "All" category at the start
    ...Object.values(categories),
  ];
}

export async function getImagesCategories(): Promise<TNewsCategory[]> {
  const images = await getImages();

  const categories: Record<string, TNewsCategory> = {};

  for (const image of images) {
    const categoryName = image.group;
    if (categoryName && !categories[categoryName]) {
      categories[categoryName] = {
        id: categoryName.toLowerCase(),
        title: categoryName,
      };
    }
  }
  return [
    { id: "all", title: "All" }, // Add "All" category at the start
    ...Object.values(categories),
  ];
}
