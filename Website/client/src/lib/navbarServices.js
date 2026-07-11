const MAX_SUB_ITEMS = 4;

const EXCLUDED_CATEGORY_PATTERN =
  /app\s*development|mobile\s*app|app-development|mobile-app-development/i;

/** Canonical navbar columns — order matches public services */
const NAVBAR_COLUMNS = [
  {
    key: 'exhibition-management',
    category: 'Event & Exhibition',
    categoryLink: '/services/exhibition-management',
    match: /event|exhibition/i,
    priorityItems: [
      'Stall & Booth Design',
      'Event Planning & Management',
      'Exhibition Booth Fabrication',
      'On-site Event Coordination',
    ],
    fallbackItems: [
      { name: 'Stall & Booth Design', link: '/services/events-exhibition/stall-design' },
      { name: 'Event Planning & Management', link: '/services/events-exhibition/event-planning-management' },
      { name: 'Exhibition Booth Design', link: '/services/events-exhibition/stall-design' },
      { name: 'On-site Coordination', link: '/services/events-exhibition/onsite-event-coordination' },
    ],
  },
  {
    key: 'digital-marketing',
    category: 'Digital Marketing',
    categoryLink: '/services/digital-marketing',
    match: /digital\s*marketing/i,
    priorityItems: [
      'SEO Optimization',
      'Social Media Marketing',
      'Online Ads Campaigns',
      'Professional Content Writing',
    ],
    fallbackItems: [
      { name: 'SEO Optimization', link: '/services/digital-marketing/seo-optimization' },
      { name: 'Social Media Marketing', link: '/services/digital-marketing/social-media-marketing' },
      { name: 'Online Ads Campaigns', link: '/services/digital-marketing/online-ads-campaigns' },
      { name: 'Content Writing', link: '/services/digital-marketing/content-writing' },
    ],
  },
  {
    key: 'website-development',
    category: 'Website Development',
    categoryLink: '/services/website-development',
    match: /website/i,
    priorityItems: [
      'Business Website',
      'E-Commerce Websites',
      'Landing Page Development',
      'CMS Website',
    ],
    fallbackItems: [
      { name: 'Business Website', link: '/services/website-development/business-website' },
      { name: 'E-Commerce Websites', link: '/services/website-development/ecommerce-websites' },
      { name: 'Landing Page Development', link: '/services/website-development/landing-page-development' },
      { name: 'CMS Website', link: '/services/website-development/cms-website' },
    ],
  },
  {
    key: 'av-production',
    category: 'Audio & Video Production',
    categoryLink: '/services/av-production',
    match: /audio|video|av\s*production|film/i,
    priorityItems: [
      'Corporate Films',
      'Commercial & Ad Films',
      'Event Coverage',
      'Social & Reels',
    ],
    fallbackItems: [
      { name: 'Corporate Films', link: '/services/av-production' },
      { name: 'Commercial & Ad Films', link: '/services/av-production' },
      { name: 'Event Coverage', link: '/services/av-production' },
      { name: 'Social & Reels Production', link: '/services/av-production' },
    ],
  },
  {
    key: 'branding-design',
    category: 'Branding & Creative Design',
    categoryLink: '/services/branding-design',
    match: /brand/i,
    priorityItems: [
      'Brand Identity Design',
      'Logo & Visual Systems',
      'Marketing Collateral',
      'Event Branding',
    ],
    fallbackItems: [
      { name: 'Brand Identity Design', link: '/services/branding-design' },
      { name: 'Logo & Visual Systems', link: '/services/branding-design' },
      { name: 'Marketing Collateral', link: '/services/branding-design' },
      { name: 'Event Branding', link: '/services/events-exhibition/event-branding' },
    ],
  },
];

function shouldExcludeCategory(category = '', categoryLink = '') {
  const text = `${category} ${categoryLink}`;
  return EXCLUDED_CATEGORY_PATTERN.test(text);
}

function pickTopItems(allItems, priorityNames, fallbackItems) {
  const picked = [];
  const usedNames = new Set();

  for (const name of priorityNames) {
    const found = allItems.find(
      (item) =>
        item.name?.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(item.name?.toLowerCase() || '')
    );
    if (found && !usedNames.has(found.name)) {
      picked.push({ name: found.name, link: found.link });
      usedNames.add(found.name);
    }
    if (picked.length >= MAX_SUB_ITEMS) return picked;
  }

  for (const item of allItems) {
    if (!item?.name || usedNames.has(item.name)) continue;
    picked.push({ name: item.name, link: item.link });
    usedNames.add(item.name);
    if (picked.length >= MAX_SUB_ITEMS) break;
  }

  for (const fb of fallbackItems) {
    if (usedNames.has(fb.name)) continue;
    picked.push(fb);
    usedNames.add(fb.name);
    if (picked.length >= MAX_SUB_ITEMS) break;
  }

  return picked.slice(0, MAX_SUB_ITEMS);
}

/**
 * Normalize CMS navbar services: remove App Dev, merge Event+Exhibition,
 * cap sub-items, align to 5 public service columns.
 */
export function normalizeNavbarServices(cmsServices = [], cmsDirectLinks = []) {
  const filtered = (cmsServices || []).filter(
    (s) => !shouldExcludeCategory(s.category, s.categoryLink)
  );

  const allSources = [
    ...filtered,
    ...(cmsDirectLinks || []).map((d) => ({
      category: d.category,
      categoryLink: d.link,
      items: [],
    })),
  ];

  const mergedItemsByColumn = new Map(NAVBAR_COLUMNS.map((col) => [col.key, []]));

  for (const source of allSources) {
    const column = NAVBAR_COLUMNS.find(
      (col) => col.match.test(source.category || '') || col.match.test(source.categoryLink || '')
    );
    if (!column) continue;

    const existing = mergedItemsByColumn.get(column.key) || [];
    mergedItemsByColumn.set(column.key, [...existing, ...(source.items || [])]);
  }

  return NAVBAR_COLUMNS.map((col) => {
    const cmsItems = mergedItemsByColumn.get(col.key) || [];
    const items = pickTopItems(cmsItems, col.priorityItems, col.fallbackItems);

    return {
      category: col.category,
      categoryLink: col.categoryLink,
      items: items.length > 0 ? items : col.fallbackItems,
    };
  });
}

export function getDefaultNavbarServices() {
  return normalizeNavbarServices([], []);
}

/** @deprecated direct links merged into main 5-column grid */
export function normalizeNavbarDirectLinks() {
  return [];
}

export { NAVBAR_COLUMNS, MAX_SUB_ITEMS };
