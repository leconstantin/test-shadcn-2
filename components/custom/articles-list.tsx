import { format } from 'date-fns';
import { ChevronsDownUpIcon, ChevronsUpDownIcon, FileIcon } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { TArticle } from '@/types';

export function ArticlesList({
  className,
  articles,
}: {
  className?: string;
  articles: TArticle[];
}) {
  return (
    <div className={cn('bg-background px-4', className)}>
      <div className="space-y-4 py-4">
        <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
          {articles.map((article) => (
            <ExperiencePositionItem article={article} key={article.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperiencePositionItem({ article }: { article: TArticle }) {
  return (
    <Collapsible asChild>
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
        <CollapsibleTrigger className="group/experience not-prose block w-full select-none text-left">
          <div className="relative z-1 mb-1 flex items-center gap-3 bg-background">
            <div
              aria-hidden
              className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
            >
              <FileIcon className="size-4" />
            </div>

            <Link
              className="flex-1 text-balance font-medium text-base"
              href={`/article/${article.slug}`}
            >
              {article.title}
            </Link>

            <div
              aria-hidden
              className="shrink-0 text-muted-foreground [&_svg]:size-4"
            >
              <ChevronsDownUpIcon className="hidden group-data-[state=open]/experience:block" />
              <ChevronsUpDownIcon className="hidden group-data-[state=closed]/experience:block" />
            </div>
          </div>

          <div className="flex items-center gap-2 pl-9 text-muted-foreground text-sm">
            {article.group && (
              <>
                <dl>
                  <dt className="sr-only">Category</dt>
                  <dd>{article.group}</dd>
                </dl>

                <Separator
                  className="data-[orientation=vertical]:h-4"
                  orientation="vertical"
                />
              </>
            )}

            <dl>
              <dt className="sr-only">Published</dt>
              <dd>{format(article.publishedAt, 'LLLL d, yyyy')}</dd>
            </dl>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          {article.description && (
            <Prose className="pt-2 pl-9">{article.description}</Prose>
          )}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function Prose({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'prose prose-sm prose-zinc dark:prose-invert max-w-none font-mono text-foreground',
        'prose-a:break-words prose-a:font-medium prose-a:text-foreground prose-a:underline prose-a:underline-offset-4',
        'prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:font-normal prose-code:text-sm prose-code:before:content-none prose-code:after:content-none',
        className
      )}
      {...props}
    />
  );
}
