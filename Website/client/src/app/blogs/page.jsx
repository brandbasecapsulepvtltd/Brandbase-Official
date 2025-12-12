import BlogsContent from '@/components/Blog/BlogsContent';

// Metadata should be exported as a named export
export const metadata = {
  title: 'Our Services',
  description: 'Explore our services',
}

// Page component must be the default export
export default function BlogsPage() {
  return (
    <>
    <BlogsContent/>
    </>
  )
}