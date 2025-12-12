import BlogDetailPage from '@/components/Blog/BlogDetailPage';
// Ensure BlogsData is exported from your data file, or create a 'getAllBlogs' helper
import { getBlogBySlug, BlogsData } from '@/Data/BlogsData'; 
import { notFound } from 'next/navigation';

/**
 * 1. AUTOMATIC STATIC PARAMS
 * Instead of hardcoding the list, we map through your actual data.
 * This satisfies your request to "take it from the data".
 */
export async function generateStaticParams() {
  // If BlogsData is not directly exported, you might need a helper like getAllBlogs()
  // Assuming BlogsData is available here:
  return BlogsData.map((blog) => ({
    category: blog.metadata.category,
    slug: blog.metadata.slug,
  }));
}

/**
 * 2. ASYNC PAGE COMPONENT
 * In Next.js 15, 'params' is a Promise. You must 'await' it.
 */
export default async function BlogPage({ params }) {
  // Await the params object (Fixes the error you are seeing)
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Get the blog data by slug
  const blogData = getBlogBySlug(slug);
  
  // If blog not found, show 404
  if (!blogData) {
    notFound();
  }
  
  // Pass the blog data as props to the BlogDetailPage component
  return <BlogDetailPage blogData={blogData} />;
}