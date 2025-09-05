'use client';

import { useEffect, useState } from 'react';
import { InfiniteTextMarquee } from '@/components/custom/infinite-text-marquee';
import { PageContainer } from '@/components/custom/page-container';
import { topTextMessages } from '@/config/app';

export function TopTextAds() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % topTextMessages.length);
    }, 10_000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const { text, link, tooltipText } = topTextMessages[current];

  return (
    <PageContainer className="py-4 md:py-4">
      <InfiniteTextMarquee
        fontSize="1rem"
        hoverColor="bg-muted-foreground"
        link={link}
        showTooltip={false}
        speed={20}
        text={text}
        textColor="bg-primary"
        tooltipText={tooltipText}
      />
    </PageContainer>
  );
}
