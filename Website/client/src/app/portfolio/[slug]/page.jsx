import { notFound } from 'next/navigation';
import PortfolioDetailContent from '@/components/Portfolio/PorfolioDetail/PortfolioDetailContent';
import { api } from '@/lib/api';
import {
  buildPortfolioDetailJsonLd,
  buildPortfolioDetailMetadata,
} from '@/lib/corePagesSeo';

export const revalidate = 10;

export async function generateStaticParams() {
  try {
    const response = await api.getPortfolios();
    return (response.data || []).map((item) => ({ slug: item.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const response = await api.getPortfolioBySlug(slug);
    return buildPortfolioDetailMetadata(slug, response?.data);
  } catch {
    return buildPortfolioDetailMetadata(slug, null);
  }
}

export default async function PortfolioDetailPage({ params }) {
  const { slug } = await params;

  let portfolio;
  try {
    const response = await api.getPortfolioBySlug(slug);
    portfolio = response?.data;
  } catch {
    portfolio = null;
  }

  if (!portfolio) {
    notFound();
  }

  const jsonLd = buildPortfolioDetailJsonLd(slug, portfolio);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PortfolioDetailContent portfolioItem={portfolio} slug={slug} />
    </>
  );
}
