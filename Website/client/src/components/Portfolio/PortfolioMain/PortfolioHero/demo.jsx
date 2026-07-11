import Link from 'next/link';
import { Rocket, Palette, TrendingUp } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: Rocket, title: 'Performance Driven', text: 'High-conversion digital experiences' },
  { icon: Palette, title: 'Strategic Design', text: 'User-centric design principles' },
  { icon: TrendingUp, title: 'Measurable Results', text: 'Data-backed marketing solutions' },
];

const PortfolioHero = () => {
  return (
    <section className="bg-white px-4 pb-8 pt-8 text-center text-black dark:bg-zinc-950 dark:text-white md:px-8">
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#FF6600]">
        Our Work
      </p>
      <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
        Transformative Solutions for{' '}
        <span className="bg-gradient-to-r from-[#FF6600] to-orange-500 bg-clip-text text-transparent">
          Digital Success
        </span>
      </h1>

      <p className="mt-6 text-xl font-medium text-gray-600 dark:text-gray-300 md:text-2xl">
        Where Strategy Meets Execution
      </p>

      <p className="mx-auto my-8 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:my-10 md:text-xl">
        Explore exhibition stalls, events, websites, and brand campaigns where we delivered
        exceptional results and measurable business impact.
      </p>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50 p-6 transition-colors hover:border-[#FF6600]/30 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="mb-3 rounded-lg bg-[#FF6600]/10 p-3 text-[#FF6600]">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-center justify-center gap-4 py-5 sm:flex-row">
        <Link
          href="/contact"
          className="rounded-xl border-2 border-[#FF6600] px-8 py-3.5 text-base font-semibold text-[#FF6600] transition-all duration-300 hover:bg-[#FF6600] hover:text-white"
        >
          Schedule a Consultation
        </Link>
        <Link
          href="/services"
          className="rounded-xl px-8 py-3.5 text-base font-semibold text-gray-600 transition-colors hover:text-[#FF6600] dark:text-gray-300"
        >
          View Our Services
        </Link>
      </div>
    </section>
  );
};

export { PortfolioHero };
