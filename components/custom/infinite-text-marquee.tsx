'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import type * as React from 'react';
import { useEffect, useState } from 'react';

type InfiniteTextMarqueeProps = {
  text?: string;
  link?: string;
  speed?: number;
  showTooltip?: boolean;
  tooltipText?: string;
  fontSize?: string;
  textColor?: string;
  hoverColor?: string;
};

export const InfiniteTextMarquee: React.FC<InfiniteTextMarqueeProps> = ({
  text = "Let's Get Started",
  link = '/components',
  speed = 30,
  showTooltip = true,
  tooltipText = 'Time to Flex💪',
  fontSize = '8rem',
  textColor = '', // optional override
  hoverColor = '', // optional override
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const maxRotation = 8;

  useEffect(() => {
    if (!showTooltip) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      const midpoint = window.innerWidth / 2;
      const distanceFromMidpoint = Math.abs(e.clientX - midpoint);
      const rotationValue = (distanceFromMidpoint / midpoint) * maxRotation;

      setRotation(e.clientX > midpoint ? rotationValue : -rotationValue);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showTooltip]);

  const repeatedText = `${new Array(10).fill(text).join(' - ')} -`;

  return (
    <>
      {showTooltip && (
        <div
          className={`following-tooltip fixed z-[99] text-nowrap rounded-3xl px-12 py-6 font-bold transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }bg-primary text-primary-foreground `}
          style={{
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x}px`,
            transform: `rotateZ(${rotation}deg) translate(-50%, -140%)`,
          }}
        >
          <p>{tooltipText}</p>
        </div>
      )}

      <main className="relative w-vw overflow-hidden">
        <motion.div
          animate={{
            x: [0, -1000],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: speed,
              ease: 'linear',
            },
          }}
          className="whitespace-nowrap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link href={link}>
            <span
              className={`m-0 cursor-pointer py-10 font-bold tracking-tight transition-all ${
                textColor ? '' : 'text-black dark:text-white'
              }`}
              style={{
                fontSize,
                color: textColor || undefined,
              }}
            >
              <span className="hoverable-text">{repeatedText}</span>
              <style jsx>{`
                .hoverable-text:hover {
                  color: ${hoverColor || 'var(--tw-prose-links)'};
                }
              `}</style>
            </span>
          </Link>
        </motion.div>
      </main>
    </>
  );
};
