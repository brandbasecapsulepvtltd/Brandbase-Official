'use client';

import Link from 'next/link';
import {
  PencilRuler,
  Hammer,
  Truck,
  Award,
  Palette,
  Lightbulb,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import SafeImage from '@/components/General/SafeImage';
import SeoRelatedBlogs from '@/components/SEO/SeoRelatedBlogs';
import { getRelatedSeoLandings } from '@/lib/seoLandingPages';

const SERVICE_ICONS = {
  'pencil-ruler': PencilRuler,
  hammer: Hammer,
  truck: Truck,
  palette: Palette,
  lightbulb: Lightbulb,
  award: Award,
};

export default function MumbaiLandingContent({ pageData }) {
  if (!pageData) return null;

  const { hero, about, venues, services, portfolio, faqs, bottomCta, breadcrumbLabel, serviceHref } = pageData;
  const canonicalPath = pageData.seo?.canonicalPath || '/';
  const portfolioAlt = portfolio?.portfolioAlt || 'BrandBase Capsule project showcase';
  const locationLabel = portfolio?.locationLabel || 'Project';
  const faqIntro = pageData.faqIntro || 'Common questions about our services.';
  const relatedLandings = getRelatedSeoLandings(pageData.slug, 3);

  return (
    <main className="mumbai-landing min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-[#FF6600]/30 selection:text-orange-900 dark:selection:text-orange-200 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: breadcrumbLabel, href: canonicalPath },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50/50 dark:bg-zinc-950">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-200/40 dark:bg-orange-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/50 dark:bg-orange-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" aria-hidden="true" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] dark:opacity-[0.03]" aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10 text-center pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mumbai-glass-card mb-8 border-[#FF6600]/20 bg-white/80 dark:bg-white/5">
            <Sparkles className="w-4 h-4 text-[#FF6600]" aria-hidden="true" />
            <span className="text-sm font-medium tracking-widest uppercase text-[#FF6600]/90">{hero.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-zinc-900 dark:text-white">
            <span className="block mb-2">
              {hero.titleLead}{' '}
              <span className="font-cursive text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#FF6600] mx-2">{hero.titleAccent}</span>
            </span>
            <span>{hero.titleMain}</span>
            <span className="block mt-2 mumbai-accent-gradient">{hero.titleLocation}</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-10">
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={hero.primaryCta.href}
              className="px-8 py-4 rounded-full bg-[#FF6600] text-white font-semibold hover:bg-orange-600 hover:shadow-[0_10px_30px_-5px_rgba(255,102,0,0.4)] transition-all transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="px-8 py-4 rounded-full mumbai-glass-card text-zinc-900 dark:text-white hover:bg-white/50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 group border border-zinc-200 dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
            >
              {hero.secondaryCta.label}{' '}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
          {serviceHref && (
            <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
              Explore our full service page:{' '}
              <Link href={serviceHref} className="text-[#FF6600] font-medium hover:underline">
                View service details
              </Link>
            </p>
          )}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-400 dark:text-zinc-600" aria-hidden="true">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* About / Trust */}
      <section className="py-24 bg-white dark:bg-zinc-950 relative" aria-labelledby="mumbai-about-heading">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-orange-50 dark:from-orange-500/20 dark:to-orange-500/10 rounded-[2rem] blur-2xl -z-10" aria-hidden="true" />
              <SafeImage
                src={about.image}
                alt={about.imageAlt}
                fallbackKey="exhibition"
                className="rounded-[2rem] border border-white dark:border-white/10 shadow-2xl skew-y-1 hover:skew-y-0 transition-all duration-700 w-full"
                loading="eager"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-float border border-orange-100 dark:border-[#FF6600]/30">
                <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-[#FF6600]/20 text-[#FF6600] flex items-center justify-center">
                  <Award className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-white">{about.statValue}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{about.statLabel}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 id="mumbai-about-heading" className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white">
                {about.title}{' '}
                <span className="font-cursive text-[#FF6600] text-5xl md:text-6xl">{about.titleAccent}</span>
              </h2>
              <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                {about.paragraphs.map((text) => (
                  <p key={text.slice(0, 40)}>{text}</p>
                ))}
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {about.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF6600] shrink-0" aria-hidden="true" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Venue / market guide */}
      {venues?.locations?.length > 0 && (
      <section className="py-24 bg-slate-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-white/5" aria-labelledby="mumbai-venues-heading">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#FF6600] font-bold tracking-widest uppercase text-sm">{venues.eyebrow}</span>
            <h2 id="mumbai-venues-heading" className="text-3xl md:text-5xl font-bold mt-2 mb-6 text-zinc-900 dark:text-white">
              {venues.title}
              <br />
              <span className="mumbai-accent-gradient">{venues.titleAccent}</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">{venues.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {venues.locations.map((venue) => (
              <article
                key={venue.id}
                className="bg-white dark:bg-black p-8 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
                  {venue.icon === 'map-pin' ? (
                    <MapPin className="w-24 h-24" />
                  ) : (
                    <Award className="w-24 h-24" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{venue.name}</h3>
                <p className={`text-sm font-medium mb-6 ${venue.accentClass}`}>{venue.subtitle}</p>
                <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                  {venue.points.map((point) => (
                    <li key={point.label} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FF6600] shrink-0" aria-hidden="true" />
                      <span>
                        <strong>{point.label}:</strong> {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Services */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-zinc-950" aria-labelledby="mumbai-services-heading">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#FF6600] font-cursive text-3xl">{services.eyebrow}</span>
            <h2 id="mumbai-services-heading" className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-zinc-900 dark:text-white">
              {services.title}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">{services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.items.map((service) => {
              const Icon = SERVICE_ICONS[service.icon] || Award;
              return (
                <article
                  key={service.title}
                  className="group mumbai-glass-card p-8 rounded-3xl relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white dark:bg-white/[0.03]"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 dark:bg-[#FF6600]/5 rounded-full blur-2xl group-hover:bg-orange-200 dark:group-hover:bg-[#FF6600]/10 transition-colors opacity-50" aria-hidden="true" />
                  <Icon className="w-10 h-10 text-zinc-400 dark:text-zinc-500 group-hover:text-[#FF6600] transition-colors mb-6 relative z-10" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white relative z-10">{service.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed relative z-10">{service.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio gallery */}
      <section id="portfolio" className="py-24 bg-white dark:bg-zinc-950" aria-labelledby="mumbai-portfolio-heading">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#FF6600] font-cursive text-3xl">{portfolio.eyebrow}</span>
              <h2 id="mumbai-portfolio-heading" className="text-4xl md:text-5xl font-bold mt-2 text-zinc-900 dark:text-white">
                {portfolio.title}
              </h2>
            </div>
            <Link
              href={portfolio.cta.href}
              className="px-6 py-2 rounded-full border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors text-sm uppercase tracking-widest text-zinc-600 dark:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
            >
              {portfolio.cta.label}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.images.map((src, i) => (
              <figure
                key={src}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-zinc-100 dark:border-white/5 m-0"
              >
                <SafeImage
                  src={src}
                  alt={`${portfolioAlt} — ${i + 1}`}
                  fallbackKey="exhibition"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <figcaption className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                  <span className="text-[#FF6600] text-xs font-bold uppercase tracking-widest mb-1">Project</span>
                  <span className="text-white text-xl font-bold">{locationLabel}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SeoRelatedBlogs />

      {relatedLandings.length > 0 && (
        <section className="py-16 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-white/5" aria-label="Related services">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 text-center">
              Related {pageData.region === 'india' ? 'India' : 'Mumbai'} Services
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {relatedLandings.map((landing) => (
                <Link
                  key={landing.slug}
                  href={landing.seo.canonicalPath}
                  className="px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-[#FF6600] hover:text-[#FF6600] transition-colors"
                >
                  {landing.breadcrumbLabel}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-24 bg-slate-50 dark:bg-zinc-900" aria-labelledby="mumbai-faq-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 id="mumbai-faq-heading" className="text-3xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
              Common Questions
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">{faqIntro}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="bg-white dark:bg-zinc-800/50 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-white/5 hover:border-orange-200 dark:hover:border-[#FF6600]/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 flex items-start gap-2">
                  <span className="text-[#FF6600] shrink-0">Q.</span> {item.question}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 pl-6 leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 relative overflow-hidden bg-zinc-900 dark:bg-black" aria-labelledby="mumbai-cta-heading">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6600]/20 to-orange-900/40 opacity-50" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 id="mumbai-cta-heading" className="text-4xl md:text-6xl font-bold text-white mb-4">
            {bottomCta.title}
          </h2>
          <p className="font-cursive text-3xl md:text-4xl text-[#FF6600] mb-6">{bottomCta.titleAccent}</p>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-12">{bottomCta.subtitle}</p>
          <Link
            href={bottomCta.cta.href}
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors transform hover:scale-105 shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          >
            {bottomCta.cta.label} <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
