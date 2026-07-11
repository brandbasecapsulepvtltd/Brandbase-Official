'use client';

import Link from 'next/link';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import { CONTACT, CONTACT_FORM_PROMPT, SHOW_PUBLIC_PHONE } from '@/lib/contactConstants';

export default function LegalPolicyShell({
  pageConfig,
  children,
  lastUpdated,
}) {
  const canonicalPath = pageConfig.seo?.canonicalPath || '/';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-black">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: pageConfig.breadcrumbLabel, href: canonicalPath },
          ]}
        />
      </div>

      {children}

      <footer className="max-w-6xl mx-auto px-4 md:px-6 pb-16 pt-8 border-t border-gray-200 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {lastUpdated && (
              <p>
                Last updated: <span className="font-medium text-gray-900 dark:text-white">{lastUpdated}</span>
              </p>
            )}
            {pageConfig.relatedPage && (
              <p className="mt-2">
                See also:{' '}
                <Link
                  href={pageConfig.relatedPage.href}
                  className="text-[#FF6600] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] rounded"
                >
                  {pageConfig.relatedPage.label}
                </Link>
              </p>
            )}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#FF6600] text-white font-semibold hover:bg-orange-600 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
          >
            Contact Us
          </Link>
        </div>
        <p className="mt-6 text-xs text-gray-500 dark:text-gray-500">
          Questions? Email{' '}
          <a href={`mailto:${CONTACT.email}`} className="text-[#FF6600] hover:underline">
            {CONTACT.email}
          </a>
          {SHOW_PUBLIC_PHONE ? (
            <>
              {' '}or use our{' '}
              <Link href="/contact" className="text-[#FF6600] hover:underline">
                contact form
              </Link>
            </>
          ) : (
            <>
              {' '}or{' '}
              <Link href="/contact" className="text-[#FF6600] hover:underline">
                {CONTACT_FORM_PROMPT}
              </Link>
            </>
          )}
          .
        </p>
      </footer>
    </div>
  );
}

export function LegalPolicyEmpty({ pageConfig }) {
  return (
    <LegalPolicyShell pageConfig={pageConfig}>
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{pageConfig.breadcrumbLabel}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          This page is temporarily unavailable. Please contact us and we&apos;ll share the latest document.
        </p>
        <Link
          href="/contact"
          className="inline-flex px-8 py-3 rounded-full bg-[#FF6600] text-white font-semibold hover:bg-orange-600 transition-colors"
        >
          Get in Touch
        </Link>
      </section>
    </LegalPolicyShell>
  );
}
