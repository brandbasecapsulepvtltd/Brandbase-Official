/**
 * Maps legacy or alternate URL slugs to the canonical ServiceCategory slug in the API.
 * Individual service detail URLs may still use a different `category` segment.
 */
export const CATEGORY_PAGE_SLUG_ALIASES = {
  'events-exhibition': ['exhibition-management', 'events-exhibition', 'event-exhibition-management'],
  'event-exhibition-management': ['exhibition-management', 'events-exhibition'],
  'mobile-app-development': ['app-development', 'mobile-app-development'],
  'app-development': ['app-development', 'mobile-app-development'],
};

export function getCategorySlugCandidates(slug) {
  const aliases = CATEGORY_PAGE_SLUG_ALIASES[slug] || [];
  return [...new Set([slug, ...aliases])];
}

/** Canonical category landing-page slug for nav links */
export const CANONICAL_CATEGORY_SLUGS = {
  'events-exhibition': 'exhibition-management',
  'mobile-app-development': 'app-development',
};

export function resolveCategoryPageSlug(slug) {
  return CANONICAL_CATEGORY_SLUGS[slug] || slug;
}
