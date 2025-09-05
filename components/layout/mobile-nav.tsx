'use client';

import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { navItems, newsLinks } from '@/config/app';
import { cn } from '@/lib/utils';
import type { TNewsCategory } from '@/types';

interface MobileNavProps {
  isBlog?: boolean;
  categories: TNewsCategory[];
}
export function MobileNav({ isBlog = false, categories }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button
          className="h-8 gap-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          variant="ghost"
        >
          <svg
            className="!size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Toggle Menu</title>
            <path
              d="M3.75 9h16.5m-16.5 6.75h16.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[100svh] p-0">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            {navItems?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    href={item.href}
                    key={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.label}
                  </MobileLink>
                )
            )}
          </div>

          <Accordion collapsible type="single">
            {newsLinks.map((link) => (
              <AccordionItem
                className="border-0"
                key={link.title}
                value={link.title}
              >
                <AccordionTrigger className="py-2">
                  {link.title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  {link.links.map((li) => (
                    <MobileLink
                      className="text-muted-foreground"
                      href={li.href}
                      key={li.title}
                    >
                      {li.title}
                    </MobileLink>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
            {isBlog && (
              <AccordionItem
                className="border-0"
                key={'categories'}
                value={'categories'}
              >
                <AccordionTrigger className="py-2">Categories</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <MobileLink
                      className="text-muted-foreground text-sm"
                      href={`/?category=${category.id}`}
                      key={category.title}
                    >
                      {category.title}
                    </MobileLink>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      className={cn('text-sm', className)}
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
