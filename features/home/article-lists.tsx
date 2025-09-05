import { getArticles, getArticlesByCategory } from '@/data/articles';
import ArticleCard from '@/features/home/article-card';
export default async function articleLists({ category }: { category: string }) {
  const categoryFilter =
    category && category.charAt(0).toUpperCase() + category.slice(1);

  const articles = categoryFilter
    ? await getArticlesByCategory(categoryFilter as string)
    : await getArticles();
  if (!articles.length) {
    return null;
  }
  return (
    <div className="w-full md:col-span-9">
      <div className="grid grid-cols-1 gap-x-3 gap-y-8 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.title} />
        ))}
        {articles.map((article) => (
          <ArticleCard article={article} key={article.title} />
        ))}
      </div>
    </div>
  );
}
