'use client';

import Link from 'next/link';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import BlogArticleCard from '@/components/Blog/BlogArticleCard';
import { formatBlogCategoryLabel } from '@/lib/corePagesSeo';

export default function BlogCategoryContent({ category, blogs = [], error = null }) {
  const label = formatBlogCategoryLabel(category);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blogs' },
            { label: label, href: `/blogs/${category}` },
          ]}
        />
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-white dark:from-zinc-900 dark:to-black py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {label}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            Articles and insights about {label.toLowerCase()} from BrandBase Capsule.
          </p>
          {blogs.length > 0 && (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
              {blogs.length} article{blogs.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {error ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <Link
              href={`/blogs/${category}`}
              className="inline-flex px-6 py-3 bg-[#FF6600] text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Try Again
            </Link>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              There are no articles in this category yet.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6600] text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Browse All Blogs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {blogs.map((blog, index) => (
              <BlogArticleCard key={blog._id || index} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
