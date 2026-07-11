import { api } from '@/lib/api';
import BlogCategoryContent from '@/components/Blog/BlogCategoryContent';
import { buildBlogCategoryJsonLd, buildBlogCategoryMetadata } from '@/lib/corePagesSeo';

export const revalidate = 10;

export async function generateMetadata({ params }) {
  const { category } = await params;
  return buildBlogCategoryMetadata(category);
}

export default async function BlogCategoryPage({ params }) {
  const { category } = await params;

  let blogs = [];
  let error = null;

  try {
    const response = await api.getBlogsByCategory(category);
    if (response.success) {
      blogs = response.data || [];
    }
  } catch (err) {
    console.error('Error fetching blogs by category:', err);
    error = 'Failed to load blogs. Please try again later.';
  }

  const jsonLd = buildBlogCategoryJsonLd(category, blogs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogCategoryContent category={category} blogs={blogs} error={error} />
    </>
  );
}
