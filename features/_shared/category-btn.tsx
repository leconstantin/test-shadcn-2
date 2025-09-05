import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CategoryButton({
  name,
  link,
  className,
  type,
  active,
  slug,
}: {
  name: string;
  link: string;
  className?: string;
  type: 'tv' | 'podcast' | 'gallery' | 'all';
  active: boolean;
  slug?: string;
}) {
  const variant = active ? 'default' : 'secondary';
  const href = slug
    ? `/${type}/${slug}?category=${link}`
    : `/${type}?category=${link}`;
  return (
    <Button
      asChild
      className={cn('h-full w-fit rounded-2xl', className)}
      variant={variant}
    >
      <Link className="flex h-full w-fit" href={href}>
        <span>{name}</span>
      </Link>
    </Button>
  );
}
