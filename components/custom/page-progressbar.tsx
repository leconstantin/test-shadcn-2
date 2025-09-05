'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const PageProgressbar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progressValue = (scrollTop / docHeight) * 100;
      setProgress(progressValue);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      animate={{ width: `${progress}%` }}
      className="fixed top-14 left-0 z-999 h-1 bg-primary"
      initial={{ width: 0 }}
      style={{ width: `${progress}%` }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    />
  );
};

export { PageProgressbar };
