import Head from 'next/head';

// Metadata should be exported as a named export
export const metadata = {
  title: 'Our Services',
  description: 'Explore our services',
}

// Page component must be the default export
export default function BlogCategoryPage() {
  return (
    <div>
      {/* Option 1: Using Next.js Head component for metadata */}
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      
      <h1>All blogs of specific category</h1>
      {/* Page content */}
    </div>
  )
}