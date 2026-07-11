import Link from 'next/link';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import ContactFAQ from '@/components/Contact/ContactFAQ';
import { PortfolioHero } from './PortfolioHero/demo';
import PortfolioResults from './PortfolioCta/testimonial-1';
import { PORTFOLIO_PAGE } from '@/lib/portfolioPageData';

/**
 * Legacy wrapper — portfolio page now renders its own grid inline.
 * Kept so older imports don't break.
 */
export default function PortfolioContent({ pageData = PORTFOLIO_PAGE }) {
  const { faqs, bottomCta } = pageData;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 pb-2 pt-28 md:px-8 md:pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: pageData.breadcrumbLabel, href: pageData.seo?.canonicalPath || '/portfolio' },
          ]}
        />
      </div>

      <PortfolioHero />
      <PortfolioResults />
      <ContactFAQ items={faqs} />

      <section className="bg-gradient-to-br from-[#FF6600] to-orange-600 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center text-white">
          <h2 className="text-2xl font-bold md:text-3xl">{bottomCta.title}</h2>
          <p className="leading-relaxed text-orange-50">{bottomCta.subtitle}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={bottomCta.primary.href}
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 font-semibold text-[#FF6600]"
            >
              {bottomCta.primary.label}
            </Link>
            <Link
              href={bottomCta.secondary.href}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-3.5 font-semibold text-white"
            >
              {bottomCta.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
