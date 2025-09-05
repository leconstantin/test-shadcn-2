import type { TArticle } from "@/types";

// import { members } from "@/config/web";

export async function getArticles(): Promise<TArticle[]> {
  const res = await fetch(`${process.env.CONVEX_SITE_URL}/articles`, {
    headers: {
      Authorization: `Bearer ${process.env.ARTICLES_API_KEY}`,
    },
  });
  const articles = await res.json();
  if (!articles) return [];
  return articles;
}

export async function getArticle(slug: string): Promise<TArticle | null> {
  // use filter
  const articles = await getArticles();
  const article = articles.find((art) => art.slug === slug);
  if (!article) return null;
  return article;
}

// get article by category
export async function getArticlesByCategory(
  category: string
): Promise<TArticle[]> {
  const articles = await getArticles();
  if (category === "All") {
    return articles;
  }
  return articles.filter((a) => a.group === category);
}
