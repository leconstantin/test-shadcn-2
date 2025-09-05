import { Armchair } from 'lucide-react';
import Link from 'next/link';
import { ModeSwitcher } from '@/components/custom/mode-switcher';
import { CommandMenu } from '@/components/layout/command-menu';
import HeaderContactForm from '@/components/layout/header-contact-form';
import { MainNav } from '@/components/layout/main-nav';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { getArticles } from '@/data/articles';
import { getArticlesCategories } from '@/data/categories';

interface SiteHeaderProps {
  isBlog?: boolean;
}
export async function SiteHeader({ isBlog = false }: SiteHeaderProps) {
  const articles = await getArticles();
  const categories = await getArticlesCategories();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/40 backdrop-blur-lg supports-backdrop-blur:bg-background/90">
      <div className="container-wrapper sm:px-6 lg:px-0">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <MobileNav categories={categories} isBlog={isBlog} />
          <Button
            asChild
            className="hidden size-8 lg:flex"
            size="icon"
            variant="ghost"
          >
            <Link href="/">
              <Armchair className="size-7 font-bold" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </Button>
          <MainNav
            categories={categories}
            className="hidden lg:flex"
            isBlog={isBlog}
          />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu
                articles={articles}
                categories={categories}
                isBlog={isBlog}
              />
            </div>
            <nav className="flex items-center gap-4">
              <HeaderContactForm />
              <ModeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
