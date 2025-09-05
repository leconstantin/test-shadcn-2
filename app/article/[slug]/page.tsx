import { formatDistanceToNow } from 'date-fns';
import { ClockFadingIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageContainer } from '@/components/custom/page-container';
import { PageProgressbar } from '@/components/custom/page-progressbar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getArticle, getArticles } from '@/data/articles';
import { getMemberById } from '@/data/staff';
import SimpleEditor from '@/features/tiptap/simple-editor';
import profile from '@/public/profile.svg';
import type { TArticle } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return notFound();
  }
  const { title, description, coverImage } = article;
  return {
    title,
    description: description || '',
    openGraph: {
      title,
      description: description || '',
      type: 'article',
      images: [{ url: coverImage || '', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || '',
      images: [coverImage || ''],
      creator: '@rathonagency',
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article: TArticle | null = await getArticle(slug);

  if (!article) {
    return notFound();
  }

  return (
    <PageContainer className="@container relative flex flex-col py-8 md:py-16">
      {/* Article Header */}
      <ArticleHeader article={article} />
      {/* Image */}
      <ArticleCoverImage article={article} />
      {/* Content */}
      <div className="mx-auto max-w-5xl pt-8 sm:pt-12">
        <SimpleEditor
          content={article.content || ''}
          editable={false}
          id={article.slug}
          words={article.words || 0}
        />
      </div>
      <PageProgressbar />
    </PageContainer>
  );
}

async function ArticleHeader({ article }: { article: TArticle }) {
  const published = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });
  const author = await getMemberById(article.authorId);

  return (
    <div className="@container grid w-full grid-cols-12">
      <div className="@lg:col-span-8 @md:col-span-10 col-span-12 @lg:col-start-3 @md:col-start-2">
        <article className="relative flex flex-col items-center gap-8 text-center">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 font-medium text-muted-foreground text-sm lg:gap-10">
            <span className="text-primary">{published}</span>

            <Link
              className="transition duration-250 ease-curve-a hover:text-primary"
              href={`/?category=${article.group.toLowerCase()}`}
            >
              {article.group}
            </Link>
          </div>

          {/* Title */}
          <h1 className="max-w-[62.5rem] scroll-mt-[calc(var(4.75rem)+var(3rem))] text-balance font-medium text-4xl text-primary">
            {article.title}
          </h1>

          {/* Description */}
          <p className="max-w-xl text-balance font-medium text-primary leading-7 tracking-tight">
            {article.description || ''}
          </p>

          {/* Author and Read Time */}
          <div className="flex w-full items-center justify-between">
            <Link
              className="flex items-center gap-2"
              href={`/staff/${author?.username}`}
            >
              <Avatar className="size-7">
                <AvatarImage
                  alt={author?.name}
                  src={author?.avatarUrl || author?.image || profile.src}
                />
                <AvatarFallback>{author?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-muted-foreground text-sm">
                By{' '}
                <span className="font-semibold text-primary">
                  {author?.name}
                </span>
              </span>
              <span className="hidden font-medium text-muted-foreground text-sm xl:inline-block">
                Author
              </span>
            </Link>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <ClockFadingIcon className="size-4" />
              <span>10 min read</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function ArticleCoverImage({ article }: { article: TArticle }) {
  return (
    <div className="relative z-0 mt-12 grid grid-cols-12 lg:mt-20">
      <div className="@md:col-span-10 col-span-12 @md:col-start-2">
        <div className="relative mx-auto max-h-[470px] max-w-4xl overflow-hidden rounded-lg shadow-lg">
          <AspectRatio ratio={834 / 470}>
            {article.coverImage ? (
              <Image
                alt={`Featured image for article: ${article.title}`}
                className="rounded-lg object-cover transition-all duration-300 hover:scale-105"
                fill
                priority
                sizes="(max-width: 834px) 100vw, 834px"
                src={article.coverImage}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted text-muted-foreground text-sm">
                No image available
              </div>
            )}
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
