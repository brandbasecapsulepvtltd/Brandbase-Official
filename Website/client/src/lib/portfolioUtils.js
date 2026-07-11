const CATEGORY_LABELS = {
  'exhibition-stalls': 'Exhibition Management',
  'event-management': 'Event Management',
  'video-production': 'AV Production',
  'web-development': 'Web Development',
  'content-writing': 'Content Writing',
};

const SLUG_CATEGORY_OVERRIDES = {
  'event-management': 'event-management',
};

export function formatCategoryLabel(category) {
  if (!category) return 'Portfolio';
  if (CATEGORY_LABELS[category]) return CATEGORY_LABELS[category];
  // Never surface raw CMS leftovers like "other" as a visible badge
  if (String(category).toLowerCase() === 'other') return 'Event Management';
  return category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function normalizePortfolio(item) {
  if (!item?.slug) return null;
  const category = SLUG_CATEGORY_OVERRIDES[item.slug] || item.category;
  return category === item.category ? item : { ...item, category };
}

export function dedupePortfolios(items = []) {
  const bySlug = new Map();
  const byTitle = new Map();

  for (const raw of items) {
    const item = normalizePortfolio(raw);
    if (!item) continue;

    const titleKey = item.hero?.title?.trim().toLowerCase();
    if (titleKey && byTitle.has(titleKey)) {
      const existing = byTitle.get(titleKey);
      const preferCurrent =
        item.category === 'event-management' ||
        existing.category === 'other' ||
        !existing.category;
      if (preferCurrent) {
        bySlug.delete(existing.slug);
        bySlug.set(item.slug, item);
        byTitle.set(titleKey, item);
      }
      continue;
    }

    bySlug.set(item.slug, item);
    if (titleKey) byTitle.set(titleKey, item);
  }

  return [...bySlug.values()];
}

export function filterPortfoliosByCategory(items = [], category) {
  if (!category || category === 'all') return items;
  return items.filter((item) => item.category === category);
}

export function preparePortfolios(items = [], category = 'all') {
  return dedupePortfolios(filterPortfoliosByCategory(items, category));
}
