import BlogsContent from '@/components/Blog/BlogsContent';
import { api } from '@/lib/api';
import { buildBlogsListingJsonLd, buildBlogsListingMetadata } from '@/lib/corePagesSeo';

export const revalidate = 10;
export const metadata = buildBlogsListingMetadata();

export default async function BlogsPage() {
  let allBlogs = [];
  let editorPicks = [];
  let sliderBlogs = [];
  let helpfulResources = [];
  let error = null;

  try {
    const [blogsRes, editorsRes, sliderRes, resourcesRes] = await Promise.all([
      api.getBlogs().catch(() => ({ success: false })),
      api.getEditorsPicks().catch(() => ({ success: false })),
      api.getSliderBlogs().catch(() => ({ success: false })),
      api.getHelpfulResources().catch(() => ({ success: false })),
    ]);

    if (blogsRes.success) allBlogs = blogsRes.data || [];
    if (editorsRes.success) editorPicks = editorsRes.data || [];
    if (sliderRes.success) sliderBlogs = sliderRes.data || [];
    if (resourcesRes.success) helpfulResources = resourcesRes.data || [];

    if (!blogsRes.success && !editorsRes.success && !sliderRes.success && !resourcesRes.success) {
      error = 'Failed to load blog data. Please try again later.';
    }
  } catch {
    error = 'Failed to load blog data. Please try again later.';
  }

  const jsonLd = buildBlogsListingJsonLd(allBlogs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogsContent
        allBlogs={allBlogs}
        editorPicks={editorPicks}
        sliderBlogs={sliderBlogs}
        helpfulResources={helpfulResources}
        error={error}
      />
    </>
  );
}
