import { notFound } from 'next/navigation';
import BlogDetailPage from '@/components/Blog/BlogDetailPage';
import { api } from '@/lib/api';

export const revalidate = 10;

function normalizeBlog(raw) {
  if (!raw) return null;
  return Array.isArray(raw) ? raw[0] : raw;
}

function formatCategory(category) {
  if (!category) return 'Blog';
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateStaticParams() {
  try {
    const response = await api.getBlogs();
    return (response.data || [])
      .filter((blog) => blog.metadata?.slug && blog.metadata?.category)
      .map((blog) => ({
        category: blog.metadata.category,
        slug: blog.metadata.slug,
      }));
  } catch {
    return [];
  }
}

function buildJsonLd(blog, category, slug) {
  const { metadata } = blog;
  const pageUrl = `https://www.brandbasecapsule.com/blogs/${category}/${slug}`;
  const categoryLabel = formatCategory(category);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#article`,
        headline: metadata.title,
        description: metadata.description,
        image: metadata.featuredImage,
        datePublished: metadata.publishDate,
        author: {
          '@type': 'Person',
          name: metadata.author?.name || 'Brandbase Capsule',
        },
        publisher: { '@id': 'https://www.brandbasecapsule.com/#organization' },
        url: pageUrl,
        articleSection: categoryLabel,
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.brandbasecapsule.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.brandbasecapsule.com/blogs' },
          {
            '@type': 'ListItem',
            position: 3,
            name: categoryLabel,
            item: `https://www.brandbasecapsule.com/blogs/${category}`,
          },
          { '@type': 'ListItem', position: 4, name: metadata.title, item: pageUrl },
        ],
      },
    ],
  };
}

function buildRelatedContext(allBlogs, slug, category) {
  const posts = (allBlogs || []).filter((b) => b.metadata?.slug);
  const sorted = [...posts].sort(
    (a, b) => new Date(b.metadata.publishDate) - new Date(a.metadata.publishDate)
  );
  const index = sorted.findIndex((b) => b.metadata.slug === slug);

  const prevPost = index > 0 ? sorted[index - 1] : null;
  const nextPost = index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null;

  const related = posts
    .filter(
      (b) =>
        b.metadata.slug !== slug &&
        b.metadata.category === category
    )
    .slice(0, 4);

  const editorPicks = posts
    .filter((b) => b.metadata.isEditorPick && b.metadata.slug !== slug)
    .slice(0, 3);

  return { prevPost, nextPost, related, editorPicks };
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;

  try {
    const response = await api.getBlogBySlug(slug);
    const blog = normalizeBlog(response?.data);

    if (!blog?.metadata) {
      return { title: 'Blog Post | Brandbase Capsule' };
    }

    const { metadata } = blog;
    const pageUrl = `https://www.brandbasecapsule.com/blogs/${category}/${slug}`;
    const title =
      metadata.seo?.metaTitle ||
      `${metadata.title} | ${formatCategory(category)} | Brandbase Capsule`;
    const description = metadata.seo?.metaDescription || metadata.description;

    return {
      title,
      description,
      keywords: metadata.seo?.keywords || [],
      metadataBase: new URL('https://www.brandbasecapsule.com'),
      alternates: {
        canonical: metadata.seo?.canonicalUrl || pageUrl,
      },
      openGraph: {
        title,
        description,
        url: pageUrl,
        siteName: 'Brandbase Capsule',
        locale: 'en_IN',
        type: 'article',
        publishedTime: metadata.publishDate,
        authors: [metadata.author?.name],
        images: metadata.featuredImage
          ? [{ url: metadata.featuredImage, alt: metadata.title }]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: metadata.featuredImage ? [metadata.featuredImage] : [],
        creator: '@brandbasecapsule',
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return { title: 'Blog Post | Brandbase Capsule' };
  }
}

export default async function BlogDetailRoute({ params }) {
  const { category, slug } = await params;

  let blog;
  let allBlogs = [];

  try {
    const [blogRes, allRes] = await Promise.all([
      api.getBlogBySlug(slug),
      api.getBlogs().catch(() => ({ data: [] })),
    ]);
    blog = normalizeBlog(blogRes?.data);
    allBlogs = allRes?.data || [];
  } catch {
    blog = null;
  }

  if (!blog?.metadata) {
    notFound();
  }

  const blogCategory = blog.metadata.category || category;
  const { prevPost, nextPost, related, editorPicks } = buildRelatedContext(
    allBlogs,
    slug,
    blogCategory
  );
  const jsonLd = buildJsonLd(blog, blogCategory, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailPage
        blogData={blog}
        category={blogCategory}
        relatedBlogs={related}
        editorPicks={editorPicks}
        prevPost={prevPost}
        nextPost={nextPost}
      />
    </>
  );
}
