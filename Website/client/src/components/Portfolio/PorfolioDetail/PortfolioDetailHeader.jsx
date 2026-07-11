'use client';

import Breadcrumbs from '@/components/General/Breadcrumbs';

export default function PortfolioDetailHeader({ slug, title, categoryLabel }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-2 relative z-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio' },
          { label: title || 'Case Study', href: `/portfolio/${slug}` },
        ]}
      />
      {categoryLabel && (
        <p className="text-xs font-bold uppercase tracking-widest text-[#FF6600] -mt-2 mb-2">
          {categoryLabel}
        </p>
      )}
    </div>
  );
}
