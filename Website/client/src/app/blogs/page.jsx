import BlogsContent from '@/components/Blog/BlogsContent';

// Metadata should be exported as a named export
export const metadata = {
  title: 'Our Blogs',
  description: 'Explore our Blogs',
}

// Page component must be the default export
export default function BlogsPage() {
  return (
    <>
    <BlogsContent/>
    </>
  )
}
