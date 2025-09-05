'use client';

import type { DialogProps } from '@radix-ui/react-dialog';
import {
  FeatherIcon,
  Laptop,
  Moon,
  Search,
  Sun,
  Users2Icon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import React from 'react';
import { TextShimmer } from '@/components/custom/text-shimmer';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { navItems } from '@/config/app';
import { cn, getCategoryIcon } from '@/lib/utils';
import type { TArticle, TNewsCategory } from '@/types';

const placeholders = [
  'Search articles...',
  'Find categories...',
  'Explore authors...',
  "Try 'latest news'",
];

export function CommandMenu({
  articles,
  isBlog,
  categories,
  ...props
}: DialogProps & {
  articles: TArticle[];
  isBlog?: boolean;
  categories: TNewsCategory[];
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0);

  // Cycle placeholder every 2 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((openCommand) => !openCommand);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        className={cn(
          'relative h-8 w-full cursor-pointer justify-start rounded-[0.5rem] border-none bg-muted/50 font-normal text-muted-foreground text-sm shadow-none hover:text-muted-foreground sm:pr-12 md:w-40 lg:w-56 xl:w-64'
        )}
        onClick={() => setOpen(true)}
        variant="outline"
        {...props}
      >
        <Search className="size-4" />
        <TextShimmer className="hidden lg:inline-flex" duration={1}>
          Search an article...
        </TextShimmer>
        <TextShimmer className="inline-flex lg:hidden" duration={1}>
          Search...
        </TextShimmer>

        <kbd className="pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-transparent px-1.5 font-medium font-mono text-[10px] opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog
        className="rounded-xl border-none ring-1 ring-muted lg:min-w-2xl dark:bg-transparent"
        commandClassName=" dark:bg-background/20 dark:backdrop-blur-lg dark:supports-backdrop-blur:bg-background/90"
        onOpenChange={setOpen}
        open={open}
      >
        <CommandInput
          className="h-14 text-lg"
          iconClassName="size-5 hidden"
          placeholder={placeholders[placeholderIndex]}
        />

        <CommandList className="max-h-[65vh] dark:bg-transparent">
          <CommandEmpty>No results found.</CommandEmpty>
          {/* pages */}
          <CommandGroup heading="Pages">
            {navItems.map((item) => (
              <CommandItem
                className="py-1 [&_svg:not([class*='size-'])]:size-2"
                key={item.href}
                onSelect={() => {
                  runCommand(() => router.push(item.href));
                }}
                value={item.label}
              >
                <item.icon className="size-2" />
                {item.label}
              </CommandItem>
            ))}
            <CommandItem
              onSelect={() => {
                runCommand(() => router.push('/staff'));
              }}
              value="Staff"
            >
              <Users2Icon className="size-4" />
              Staff
            </CommandItem>
          </CommandGroup>
          {/* categories */}
          {isBlog && (
            <CommandGroup heading="Categories">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category.title);
                return (
                  <CommandItem
                    key={category.title}
                    onSelect={() => {
                      runCommand(() =>
                        router.push(`/?category=${category.id}`)
                      );
                    }}
                    value={category.title}
                  >
                    <Icon />
                    {category.title}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
          <CommandSeparator />
          <CommandGroup heading="Articles">
            {articles.map((article) => (
              <CommandItem
                key={article.title}
                onSelect={() => {
                  runCommand(() => router.push(`/article/${article.title}`));
                }}
                value={article.title}
              >
                <FeatherIcon />
                {article.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Laptop />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
