'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import { ServiceCard } from '@/components/ui/service-card';
import { cn } from '@/lib/utils';

const PROCESS_STEPS = [
  { step: '01', title: 'Discover', text: 'We understand your goals, audience, and event or digital requirements.' },
  { step: '02', title: 'Design', text: 'Strategy, creative concepts, and technical planning tailored to your brand.' },
  { step: '03', title: 'Deliver', text: 'Flawless execution with dedicated project management and quality checks.' },
  { step: '04', title: 'Grow', text: 'Post-launch support, optimization, and measurable performance tracking.' },
];

const TRUST_POINTS = [
  '1000+ projects delivered',
  '50+ countries served',
  'Dedicated account managers',
  'End-to-end solutions',
];

export default function ServicesPageContent({ services = [] }) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-white pb-20">
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pb-20 px-4 md:px-8 overflow-hidden border-b border-gray-100 dark:border-zinc-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF6600]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
            ]}
          />

          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6600]/10 text-[#FF6600] text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Full-Service Agency
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] to-orange-500">
                Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              Digital marketing, web development, event & exhibition management,
              audio & video production, and branding — all under one roof in Mumbai, serving clients globally.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 pt-2"
            >
              {TRUST_POINTS.map((point) => (
                <span
                  key={point}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-gray-100 dark:border-zinc-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6600]" aria-hidden="true" />
                  {point}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20" aria-labelledby="services-grid-heading">
        <div className="text-center mb-12">
          <h2 id="services-grid-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Explore Our Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose a service category to see detailed offerings, case studies, and how we can help your brand grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={cn(
                'lg:col-span-2',
                services.length === 5 && index === 3 && 'lg:col-start-2'
              )}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                href={service.href}
                imgSrc={service.imgSrc}
                imgAlt={service.title}
                variant={service.variant}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 dark:bg-zinc-900/50 py-16 md:py-20 px-4 md:px-8 border-y border-gray-100 dark:border-zinc-800" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="process-heading" className="text-2xl md:text-3xl font-bold mb-3">
              How We Work
            </h2>
            <p className="text-gray-600 dark:text-gray-400">A proven process from first call to final delivery.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((item, index) => (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-[#FF6600]/30 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-[#FF6600] font-bold text-sm tracking-widest">{item.step}</span>
                <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-20" aria-labelledby="services-cta-heading">
        <div className="relative rounded-3xl overflow-hidden px-8 py-16 md:py-20 text-center shadow-2xl border border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 id="services-cta-heading" className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Ready to build your next big experience?
            </h2>
            <p className="text-gray-300 text-lg">
              From exhibitions to corporate events and digital products — we plan, design, and execute everything flawlessly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6600] hover:bg-[#E55A00] text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-[#FF6600] text-white hover:text-[#FF6600] font-semibold rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
