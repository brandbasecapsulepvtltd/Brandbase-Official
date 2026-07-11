'use client';

import Link from 'next/link';
import SafeImage from '@/components/General/SafeImage';

export default function BlogArticleCard({ blog }) {
  const { metadata } = blog;
  const authorImage = metadata.author?.image || metadata.author?.avatar;

  return (
    <Link
      href={`/blogs/${metadata.category}/${metadata.slug}`}
      className="group block h-full"
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-zinc-800">
        <SafeImage
          src={metadata.featuredImage}
          alt={metadata.title}
          fallbackKey="blog"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="pt-2">
        <p className="text-xs font-semibold text-[#FF6600] mb-2 uppercase tracking-wide">
          {metadata.category?.replace(/-/g, ' ')}
        </p>
        <h3 className="text-lg font-bold mb-2 leading-snug text-gray-900 dark:text-white group-hover:text-[#FF6600] transition-colors">
          {metadata.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {metadata.description}
        </p>
        <div className="flex items-center gap-3 mt-4">
          {authorImage && (
            <SafeImage
              src={authorImage}
              alt={metadata.author?.name || 'Author'}
              fallbackKey="default"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <div className="text-sm">
            <p className="font-medium text-gray-900 dark:text-white">
              {metadata.author?.name || 'Brandbase Capsule'}
            </p>
            {metadata.publishDate && (
              <p className="text-gray-500 dark:text-gray-400">
                {new Date(metadata.publishDate).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
