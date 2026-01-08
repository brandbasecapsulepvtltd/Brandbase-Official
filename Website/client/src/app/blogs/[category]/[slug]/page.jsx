import { notFound } from 'next/navigation';
import BlogDetailPage from '@/components/Blog/BlogDetailPage';
import { api } from '@/lib/api';

export const revalidate = 10;

// 1. Generate static params
export async function generateStaticParams() {
  try {
    const response = await api.getBlogs(); // Assuming this fetches all blogs
    const blogs = response.data || [];

    return blogs.map((blog) => ({
      category: blog.metadata.category,
      slug: blog.metadata.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// 2. Generate metadata
export async function generateMetadata({ params }) {
  const { category, slug } = await params;

  try {
    const response = await api.getBlogBySlug(slug);

    // Normalize data: handle both Array and Object responses
    const rawData = response.data;
    const blogWrapper = Array.isArray(rawData) ? rawData[0] : rawData;

    // Based on your JSON, the metadata is directly inside the object
    if (!blogWrapper || !blogWrapper.metadata) {
      return { title: 'Blog Post | Brandbase Capsule' };
    }

    const formattedCategory = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      title: `${blogWrapper.metadata.title} | ${formattedCategory}`,
      description: blogWrapper.metadata.description,
    };
  } catch (error) {
    return { title: 'Blog Post | Brandbase Capsule' };
  }
}

// 3. Main page component
export default async function BlogPage({ params }) {
  const { category, slug } = await params;

  try {
    const response = await api.getBlogBySlug(slug);

    // 1. Identify if we have data at all
    const rawData = response.data;

    // 2. Normalize the data: If it's an array, take the first item. If not, use it directly.
    const blogWrapper = Array.isArray(rawData) ? rawData[0] : rawData;

    console.log('Processed Blog Data:', {
      found: !!blogWrapper,
      hasMetadata: !!blogWrapper?.metadata
    });

    // 3. Validation: Check if the "metadata" property exists inside the wrapper
    // In your Blog JSON, the data itself is the blog object (unlike services which had a nested .data)
    if (!blogWrapper || !blogWrapper.metadata) {
      console.error('Blog data structure invalid or missing metadata');
      notFound();
    }

    // Pass the normalized blog object to BlogDetailPage
    return <BlogDetailPage blogData={blogWrapper} />;

  } catch (error) {
    console.error('Error fetching blog data:', error);
    notFound();
  }
}