'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

function parseStatValue(value) {
  const str = String(value);
  const match = str.match(/^(\d+)(.*)$/);
  if (!match) return { number: 0, suffix: str };
  return { number: parseInt(match[1], 10), suffix: match[2] || '' };
}

export default function AnimatedCounter({ value, label, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { number: target, suffix } = parseStatValue(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || target === 0) return;

    const duration = 1800;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <div ref={ref} className={className}>
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF6600] mb-1 md:mb-2 tabular-nums">
        {target === 0 ? value : (isInView ? `${count}${suffix}` : value)}
      </div>
      <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">{label}</div>
    </div>
  );
}
