'use client';

import { useEffect, useState } from 'react';
import { resolveImageSrc, getImageFallback } from '@/lib/imageUtils';

export default function SafeImage({
  src,
  alt = '',
  fallbackKey = 'default',
  className = '',
  loading,
  fetchPriority,
  ...props
}) {
  const fallback = getImageFallback(fallbackKey);
  const [imgSrc, setImgSrc] = useState(() => resolveImageSrc(src, fallbackKey));

  useEffect(() => {
    setImgSrc(resolveImageSrc(src, fallbackKey));
  }, [src, fallbackKey]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={() => {
        if (imgSrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
      {...props}
    />
  );
}
