import { ArticlesList } from '@/components/custom/articles-list';
import { getArticles } from '@/data/articles';

export default async function StaffArticles() {
  const articles = await getArticles();
  return (
    <div className="flex w-2/3 flex-col gap-4">
      <h2 className="font-bold text-2xl">Articles I have written :</h2>
      <ArticlesList articles={articles} />
    </div>
  );
}
