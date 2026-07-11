'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Mail, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import SafeImage from '@/components/General/SafeImage';

function formatCategory(category) {
  if (!category) return 'Blog';
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

function blogHref(blog) {
  const m = blog?.metadata;
  if (!m?.slug || !m?.category) return '/blogs';
  return `/blogs/${m.category}/${m.slug}`;
}

function ShareButtons({ title, className = '' }) {
  const share = useCallback(
    (platform) => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(title);
      const links = {
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        email: `mailto:?subject=${text}&body=${url}`,
      };
      if (platform === 'email') {
        window.location.href = links.email;
      } else {
        window.open(links[platform], '_blank', 'noopener,noreferrer');
      }
    },
    [title]
  );

  return (
    <div className={`flex gap-3 ${className}`}>
      {[
        { id: 'twitter', icon: Twitter, label: 'Share on Twitter' },
        { id: 'linkedin', icon: Linkedin, label: 'Share on LinkedIn' },
        { id: 'email', icon: Mail, label: 'Share via email' },
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => share(id)}
          title={label}
          aria-label={label}
          className="p-2.5 border border-gray-200 dark:border-zinc-700 rounded-xl hover:border-[#FF6600]/50 hover:bg-[#FF6600]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
        >
          <Icon size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
      ))}
    </div>
  );
}

const MediaGallery = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!media || media.length === 0) return null;

  if (media.length === 1) {
    const item = media[0];
    const isVideo = item.type === 'video' || item.url?.match(/\.(mp4|webm|mov)$/i);
    return (
      <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-zinc-800">
        {isVideo ? (
          <video src={item.url} controls className="w-full h-auto" />
        ) : (
          <SafeImage
            src={item.url}
            alt={item.caption || 'Blog media'}
            fallbackKey="default"
            className="w-full h-auto object-cover"
          />
        )}
        {item.caption && (
          <p className="p-3 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
            {item.caption}
          </p>
        )}
      </div>
    );
  }

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % media.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  const current = media[currentIndex];
  const isVideo = current.type === 'video' || current.url?.match(/\.(mp4|webm|mov)$/i);

  return (
    <div className="mb-8 relative group rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-800 bg-black">
      <div className="relative aspect-video">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
            {isVideo ? (
              <video src={current.url} controls className="w-full h-full object-contain" />
            ) : (
              <SafeImage
                src={current.url}
                alt={current.caption || 'Slide'}
                fallbackKey="blog"
                className="w-full h-full object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {media.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-[#FF6600] w-6' : 'bg-white/50 hover:bg-white/80 w-2'
              }`}
            />
          ))}
        </div>
      </div>
      {current.caption && (
        <div className="p-3 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">{current.caption}</p>
        </div>
      )}
    </div>
  );
};

function RelatedPostCard({ blog, compact = false }) {
  const m = blog.metadata;
  return (
    <Link
      href={blogHref(blog)}
      className={`group block transition-opacity hover:opacity-90 ${compact ? 'flex gap-4' : ''}`}
    >
      {compact && m.featuredImage && (
        <SafeImage
          src={m.featuredImage}
          alt={m.title}
          fallbackKey="default"
          className="w-20 h-20 object-cover rounded-xl shrink-0"
        />
      )}
      <div className={compact ? 'flex-1 min-w-0' : ''}>
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 leading-snug group-hover:text-[#FF6600] transition-colors line-clamp-2">
          {m.title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {m.author?.name} · {m.readTime}
        </p>
      </div>
    </Link>
  );
}

export default function BlogDetailPage({
  blogData,
  category,
  relatedBlogs = [],
  editorPicks = [],
  prevPost,
  nextPost,
}) {
  if (!blogData?.metadata) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <p className="text-gray-500">Article not found.</p>
      </div>
    );
  }

  const { metadata, sections = [] } = blogData;
  const categoryLabel = formatCategory(category || metadata.category);

  const articleRef = useRef(null);
  const boxRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [percent, setPercent] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;

    const headings = Array.from(el.querySelectorAll('h2')).map((h, i) => ({
      id: h.id || `section-${i}`,
      title: h.textContent.trim(),
      node: h,
    }));

    headings.forEach((h, i) => {
      if (!h.node.id) h.node.id = h.id;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = headings.findIndex((x) => x.node === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    headings.forEach((h) => io.observe(h.node));
    return () => io.disconnect();
  }, [sections]);

  useEffect(() => {
    const onScroll = () => {
      const art = articleRef.current;
      if (!art) return;

      const rect = art.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = art.scrollHeight;
      const viewportH = window.innerHeight;
      const scrolled = window.scrollY;
      const denom = Math.max(articleHeight - viewportH, 1);
      let p = (scrolled - articleTop) / denom;
      p = Math.min(Math.max(p, 0), 1);
      setPercent(Math.round(p * 100));

      const shouldShow =
        scrolled > 60 ||
        (scrolled >= articleTop - viewportH && scrolled <= articleTop + articleHeight);
      setVisible(shouldShow);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const goToSection = (idx) => {
    const section = sections[idx];
    if (!section) return;
    setOpen(false);
    const offset = window.innerHeight * 0.2;
    const element = document.getElementById(section.id);
    if (!element) return;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
    setActiveIndex(idx);
  };

  const sectionDataForPanel = sections.map((section, idx) => ({
    id: section.id,
    title: section.title,
    index: idx,
  }));

  const sidebarRelated = relatedBlogs.length > 0 ? relatedBlogs : editorPicks;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Floating progress / TOC */}
      <div
        ref={boxRef}
        aria-hidden={!visible}
        className={`fixed z-50 transition-all duration-300 ease-out pointer-events-auto
          left-1/2 -translate-x-1/2
          lg:left-auto lg:translate-x-20 lg:right-1/2
          ${visible ? 'top-16 lg:top-20 opacity-100' : '-top-20 opacity-0'}
          max-w-[92vw]`}
        style={{ width: open ? 420 : 210 }}
      >
        <div
          className="mx-auto rounded-2xl shadow-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white overflow-hidden border border-gray-200 dark:border-zinc-700"
          style={{ transition: 'height 350ms cubic-bezier(.2,.9,.2,1), width 350ms cubic-bezier(.2,.9,.2,1)' }}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-4 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
            aria-expanded={open}
          >
            <span className="text-sm font-bold tracking-wide text-[#FF6600]">EXPLORE</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#FF6600] text-sm font-semibold text-white">
              {percent}%
            </span>
          </button>

          <div
            className={`overflow-hidden bg-zinc-900 transition-[max-height,opacity,padding] duration-300 ease-out ${
              open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
            }`}
            style={{ padding: open ? '12px' : '0px 12px' }}
          >
            <div className="px-2 pb-3 text-gray-400 text-xs uppercase tracking-wide">Sections</div>
            <div className="max-h-72 overflow-auto px-2 pb-4 custom-scrollbar">
              {sectionDataForPanel.length === 0 ? (
                <div className="text-sm text-gray-500">No sections</div>
              ) : (
                <ul className="space-y-1">
                  {sectionDataForPanel.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => goToSection(s.index)}
                        className={`w-full text-left text-sm block px-3 py-2 rounded-lg transition-colors ${
                          s.index === activeIndex
                            ? 'bg-[#FF6600] text-white font-semibold'
                            : 'text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="pt-2 px-2 pb-3 border-t border-zinc-700 flex items-center gap-2">
              <ShareButtons title={metadata.title} />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-4">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blogs' },
            { label: categoryLabel, href: `/blogs/${category || metadata.category}` },
            {
              label: metadata.title,
              href: `/blogs/${category || metadata.category}/${metadata.slug}`,
            },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <header className="mb-8 md:mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6600] mb-3">
            {categoryLabel}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {metadata.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-5 leading-relaxed">
            {metadata.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-200">{metadata.author?.name}</span>
            {metadata.author?.role && (
              <>
                <span aria-hidden="true">·</span>
                <span>{metadata.author.role}</span>
              </>
            )}
            {metadata.readTime && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {metadata.readTime}
                </span>
              </>
            )}
            {formatDate(metadata.publishDate) && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  {formatDate(metadata.publishDate)}
                </span>
              </>
            )}
            {metadata.isEditorPick && (
              <span className="px-2.5 py-0.5 bg-[#FF6600]/10 text-[#FF6600] text-xs font-semibold rounded-full">
                Editor&apos;s Pick
              </span>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Article */}
          <div className="lg:col-span-2">
            <div className="mb-8 md:mb-10 rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 aspect-[16/9]">
              <SafeImage
                src={metadata.featuredImage}
                alt={metadata.title}
                fallbackKey="blog"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            <article ref={articleRef} className="prose prose-lg dark:prose-invert max-w-none">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-10 md:mb-12 scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 not-prose">
                    {section.title}
                  </h2>
                  <MediaGallery media={section.media} />
                  {section.content?.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-base md:text-lg not-prose"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.listItems?.length > 0 && (
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4 not-prose">
                      {section.listItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </article>

            {/* Prev / Next */}
            {(prevPost || nextPost) && (
              <nav
                className="border-t border-gray-200 dark:border-zinc-800 pt-8 mt-12 grid sm:grid-cols-2 gap-4"
                aria-label="Article navigation"
              >
                {prevPost ? (
                  <Link
                    href={blogHref(prevPost)}
                    className="flex flex-col gap-1 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-[#FF6600]/40 transition-colors group"
                  >
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Previous
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:text-[#FF6600] line-clamp-2">
                      {prevPost.metadata.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost && (
                  <Link
                    href={blogHref(nextPost)}
                    className="flex flex-col gap-1 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-[#FF6600]/40 transition-colors group text-right sm:col-start-2"
                  >
                    <span className="text-xs text-gray-500 flex items-center justify-end gap-1">
                      Next <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:text-[#FF6600] line-clamp-2">
                      {nextPost.metadata.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 p-6 bg-gray-50 dark:bg-zinc-900/50">
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white mb-4">
                  Share this article
                </h3>
                <ShareButtons title={metadata.title} />
              </div>

              {metadata.author && (
                <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white mb-4">
                    About the author
                  </h3>
                  <div className="flex gap-4">
                    <SafeImage
                      src={metadata.author.image}
                      alt={metadata.author.name}
                      fallbackKey="default"
                      className="w-14 h-14 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{metadata.author.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{metadata.author.role}</p>
                      <div className="flex gap-2">
                        {metadata.author.twitter && metadata.author.twitter !== '#' && (
                          <a
                            href={metadata.author.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#FF6600] transition-colors"
                            aria-label="Author on Twitter"
                          >
                            <Twitter size={16} />
                          </a>
                        )}
                        {metadata.author.linkedin && metadata.author.linkedin !== '#' && (
                          <a
                            href={metadata.author.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#FF6600] transition-colors"
                            aria-label="Author on LinkedIn"
                          >
                            <Linkedin size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {editorPicks.length > 0 && (
                <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white mb-4">
                    Editor&apos;s picks
                  </h3>
                  <div className="space-y-5">
                    {editorPicks.map((blog) => (
                      <RelatedPostCard key={blog.metadata.slug} blog={blog} compact />
                    ))}
                  </div>
                </div>
              )}

              {sidebarRelated.length > 0 && (
                <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white mb-4">
                    {relatedBlogs.length > 0 ? 'Related articles' : 'More to read'}
                  </h3>
                  <div className="space-y-5">
                    {sidebarRelated.map((blog) => (
                      <RelatedPostCard key={blog.metadata.slug} blog={blog} />
                    ))}
                  </div>
                </div>
              )}

              <Link
                href="/blogs"
                className="block text-center py-3 px-4 rounded-xl border-2 border-[#FF6600] text-[#FF6600] font-semibold hover:bg-[#FF6600] hover:text-white transition-colors"
              >
                View all articles
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6600]">
            Work with us
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Ready to put these insights into action?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            From exhibitions to digital campaigns — let&apos;s build your next success story.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold rounded-xl transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white font-semibold rounded-xl transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 8px; }
      `}</style>
    </div>
  );
}
