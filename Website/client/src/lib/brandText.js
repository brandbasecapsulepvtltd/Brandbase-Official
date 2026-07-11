/** Display-only: Brandbase → BrandBase (never alter emails or URLs). */
export function fixBrandDisplay(text) {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return text;
  if (/^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed) || /^tel:/i.test(trimmed)) {
    return text;
  }
  return text.replace(/\bBrandbase\b/g, 'BrandBase');
}

const EXCLUDED_FOOTER_LINK_PATTERNS = [
  /app development/i,
  /mobile-app-development/i,
  /\/services\/app-development/i,
];

export function shouldExcludeFooterLink(link) {
  const label = link?.label || '';
  const href = link?.href || '';
  return EXCLUDED_FOOTER_LINK_PATTERNS.some(
    (pattern) => pattern.test(label) || pattern.test(href)
  );
}

export function normalizeFooterLinkLabel(label) {
  if (!label) return label;
  if (label.trim().toLowerCase() === 'blog') return 'Blogs';
  return fixBrandDisplay(label);
}

export function normalizeFooterData(data) {
  if (!data) return data;

  return {
    ...data,
    description: fixBrandDisplay(data.description),
    copyright: fixBrandDisplay(data.copyright),
    contactInfo: data.contactInfo
      ? {
          ...data.contactInfo,
          address: fixBrandDisplay(data.contactInfo.address),
          email: data.contactInfo.email,
          phone: data.contactInfo.phone,
        }
      : data.contactInfo,
    columns: data.columns?.map((col) => ({
      ...col,
      links: (col.links || [])
        .filter((link) => !shouldExcludeFooterLink(link))
        .map((link) => ({
          ...link,
          label: normalizeFooterLinkLabel(link.label),
        })),
    })),
  };
}
