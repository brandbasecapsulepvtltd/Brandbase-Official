import AVProduction from '@/pages/AVProduction';
import { buildServiceCategoryJsonLd, buildServiceCategoryMetadata } from '@/lib/siteConfig';

const CATEGORY_SLUG = 'av-production';

export const metadata = buildServiceCategoryMetadata(CATEGORY_SLUG, {
  hero: {
    subtitle:
      'Corporate films, event coverage, and promotional video production with broadcast-quality delivery from our Mumbai team.',
  },
});

export default function AVProductionPage() {
  const jsonLd = buildServiceCategoryJsonLd(CATEGORY_SLUG, {
    hero: {
      subtitle:
        'Corporate films, event coverage, and promotional video production with broadcast-quality delivery from our Mumbai team.',
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AVProduction />
    </>
  );
}
