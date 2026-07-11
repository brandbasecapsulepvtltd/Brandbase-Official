import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import ContactFAQ from '@/components/Contact/ContactFAQ';
import { PortfolioHero } from '@/components/Portfolio/PortfolioMain/PortfolioHero/demo';
import PortfolioResults from '@/components/Portfolio/PortfolioMain/PortfolioCta/testimonial-1';
import { api } from '@/lib/api';
import { PORTFOLIO_PAGE } from '@/lib/portfolioPageData';
import { buildPortfolioPageJsonLd, buildPortfolioPageMetadata } from '@/lib/siteConfig';

export const dynamic = 'force-dynamic';
export const metadata = buildPortfolioPageMetadata(PORTFOLIO_PAGE);

const FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'exhibition-stalls', label: 'Exhibition Management' },
  { id: 'event-management', label: 'Event Management' },
];

const LABELS = {
  'exhibition-stalls': 'Exhibition Management',
  'event-management': 'Event Management',
};

function sanitize(list = []) {
  const map = new Map();
  for (const item of list) {
    if (!item?.slug) continue;
    const category =
      item.slug === 'event-management' || String(item.category).toLowerCase() === 'other'
        ? 'event-management'
        : item.category;
    map.set(item.slug, {
      slug: item.slug,
      category,
      title: item.hero?.title || 'Untitled project',
      description: item.hero?.description || '',
      image: Array.isArray(item.hero?.images) ? item.hero.images[0] : item.hero?.images || '',
      cardImage: item.hero?.cardImage || '',
      heading: item.bento?.mainHeading || 'Explore Project',
    });
  }
  return [...map.values()];
}

export default async function PortfolioPage({ searchParams }) {
  const params = await searchParams;
  const filter =
    typeof params?.category === 'string' && FILTERS.some((f) => f.id === params.category)
      ? params.category
      : 'all';

  let projects = [];
  try {
    const res = await api.getPortfolios(undefined, { cache: 'no-store', silent: true });
    projects = sanitize(res?.data);
  } catch (err) {
    console.error('portfolio page fetch failed:', err?.message || err);
  }

  const visible =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const jsonLd = buildPortfolioPageJsonLd(PORTFOLIO_PAGE, projects);
  const { faqs, bottomCta, breadcrumbLabel, seo } = PORTFOLIO_PAGE;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pb-2 pt-28 md:px-8 md:pt-32">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: breadcrumbLabel, href: seo?.canonicalPath || '/portfolio' },
            ]}
          />
        </div>

        <PortfolioHero />

        <section className="bg-white px-4 py-16 md:px-8 dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-2xl font-bold text-zinc-900 md:text-3xl dark:text-white">
                Featured Projects
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Filter by category to explore our work
              </p>
            </div>

            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {FILTERS.map((f) => {
                const active = filter === f.id;
                const href = f.id === 'all' ? '/portfolio' : `/portfolio?category=${f.id}`;
                return (
                  <Link
                    key={f.id}
                    href={href}
                    prefetch={false}
                    className={
                      active
                        ? 'rounded-full bg-[#FF6600] px-6 py-2 text-sm font-bold text-white'
                        : 'rounded-full border border-zinc-200 px-6 py-2 text-sm font-bold text-zinc-600 hover:border-[#FF6600] hover:text-[#FF6600] dark:border-zinc-700 dark:text-zinc-300'
                    }
                  >
                    {f.label}
                  </Link>
                );
              })}
            </div>

            {visible.length === 0 ? (
              <p className="py-12 text-center text-zinc-500">No projects found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {visible.map((project) => (
                  <div
                    key={project.slug}
                    className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <Link href={`/portfolio/${project.slug}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.cardImage || project.image || '/images/placeholder.jpg'}
                        alt={project.title}
                        width={640}
                        height={400}
                        className="aspect-[16/10] h-auto w-full object-cover object-center"
                      />
                    </Link>
                    <div className="p-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#FF6600]">
                        {LABELS[project.category] || 'Portfolio'}
                      </p>
                      <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">
                        <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                        <span className="text-sm text-zinc-500">{project.heading}</span>
                        <Link href={`/portfolio/${project.slug}`} aria-label={`Open ${project.title}`}>
                          <ArrowRight className="h-5 w-5 text-[#FF6600]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

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
    </>
  );
}
