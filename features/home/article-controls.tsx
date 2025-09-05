import { LayoutGridIcon } from 'lucide-react';
import { FaListUl } from 'react-icons/fa6';
import FilterArticles from '@/features/home/controls/filter-articles';
import SortArticles from '@/features/home/controls/sort-articles';
export default function ControlsArticle() {
  return (
    <div className="flex items-center gap-5 px-2">
      <FilterArticles />
      <SortArticles />
      <div className="flex items-center gap-2">
        <LayoutGridIcon className="size-4 cursor-pointer text-foreground transition-all duration-300 hover:text-muted-foreground" />
        <FaListUl className="size-4 cursor-pointer text-muted-foreground transition-all duration-300 hover:text-foreground" />
      </div>
    </div>
  );
}
