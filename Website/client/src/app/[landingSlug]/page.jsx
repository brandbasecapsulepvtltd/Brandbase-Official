import { notFound } from 'next/navigation';
import MumbaiLandingContent from '@/components/SEO/MumbaiLandingContent';
import { getSeoLandingPage, getAllSeoLandingSlugs } from '@/lib/seoLandingPages';
import { buildMumbaiPageMetadata, buildMumbaiPageJsonLd } from '@/lib/siteConfig';

export async function generateStaticParams() {
  return getAllSeoLandingSlugs().map((landingSlug) => ({ landingSlug }));
}

export async function generateMetadata({ params }) {
  const { landingSlug } = await params;
  const page = getSeoLandingPage(landingSlug);
  if (!page) return {};
  return buildMumbaiPageMetadata(page);
}

export default async function SeoLandingPage({ params }) {
  const { landingSlug } = await params;
  const page = getSeoLandingPage(landingSlug);

  if (!page) {
    notFound();
  }

  const jsonLd = buildMumbaiPageJsonLd(page);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MumbaiLandingContent pageData={page} />
    </>
  );
}
