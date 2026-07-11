/** Known broken Unsplash photo IDs → verified working replacements */
const BROKEN_UNSPLASH_REPLACEMENTS = {
  'photo-1465495976277': 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  'photo-1492684223066-e9e4aab4d25e': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
  'photo-1514525253344': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
  'photo-1459749411177': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
  'photo-1454165833767': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
  'photo-1563293881': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2025&auto=format&fit=crop',
  'photo-1592478411213': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069&auto=format&fit=crop',
  'photo-1581092921461': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
  'photo-1507537297725': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop',
  'photo-1497366216548': 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
  'photo-1558618666': 'https://ik.imagekit.io/vinayak06/ServiceSlider/fabrication.jpg',
  'photo-1497366754035': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2069&auto=format&fit=crop',
  // Was mapped to a jet-turbine photo — use exhibition stock instead
  'photo-1540575467063': 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
  'photo-1540575861501': 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
  'photo-1531050171669': 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&h=800&fit=crop',
};

export const IMAGE_FALLBACKS = {
  essential: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
  signature: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  royal: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
  feature: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2069&auto=format&fit=crop',
  animate: 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
  exhibition: 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
  video: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg',
  default: 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
  blog: 'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
};

/**
 * Resolve CMS image URLs — swaps known-dead Unsplash links for working ones.
 */
export function resolveImageSrc(src, fallbackKey = 'default') {
  if (!src || typeof src !== 'string') {
    return IMAGE_FALLBACKS[fallbackKey] || IMAGE_FALLBACKS.default;
  }

  for (const [brokenId, replacement] of Object.entries(BROKEN_UNSPLASH_REPLACEMENTS)) {
    if (src.includes(brokenId)) {
      return replacement;
    }
  }

  return src;
}

export function getImageFallback(fallbackKey = 'default') {
  return IMAGE_FALLBACKS[fallbackKey] || IMAGE_FALLBACKS.default;
}
