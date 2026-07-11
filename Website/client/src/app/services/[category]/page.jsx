import CategoryContent from '@/components/ServiceCategory/CategoryContent';
import { apiCall } from '@/lib/api';
import { getCategorySlugCandidates, resolveCategoryPageSlug } from '@/lib/categorySlugs';
import {
  buildServiceCategoryJsonLd,
  buildServiceCategoryMetadata,
} from '@/lib/siteConfig';
import { redirect } from 'next/navigation';

export const revalidate = 10;

async function getCategoryData(categorySlug) {
  const candidates = getCategorySlugCandidates(categorySlug);

  for (const slug of candidates) {
    try {
      const response = await apiCall(`/service-categories/${slug}`, { silent: true });
      if (response?.data) return response.data;
    } catch {
      // Try next alias
    }
  }

  return null;
}

async function getAllCategorySlugs() {
  try {
    const response = await apiCall('/service-categories/slugs');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching category slugs:', error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const categorySlugs = await getAllCategorySlugs();
    return categorySlugs.map((slug) => ({
      category: slug,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const canonicalSlug = resolveCategoryPageSlug(category);
  const pageData = await getCategoryData(canonicalSlug);

  if (!pageData) {
    return {
      title: 'Services | BrandBase Capsule',
      description: 'Professional creative and digital services from BrandBase Capsule, Mumbai.',
    };
  }

  return buildServiceCategoryMetadata(canonicalSlug, pageData);
}

export default async function CategoryPage({ params }) {
  const { category } = await params;

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Invalid Request</h1>
        <p className="text-gray-600 dark:text-gray-400">No category specified in the URL.</p>
      </div>
    );
  }

  const canonicalSlug = resolveCategoryPageSlug(category);
  if (canonicalSlug !== category) {
    redirect(`/services/${canonicalSlug}`);
  }

  const pageData = await getCategoryData(category);

  if (!pageData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Category Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">The requested service category does not exist.</p>
      </div>
    );
  }

  const jsonLd = buildServiceCategoryJsonLd(canonicalSlug, pageData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryContent pageData={pageData} categorySlug={canonicalSlug} />
    </>
  );
}
