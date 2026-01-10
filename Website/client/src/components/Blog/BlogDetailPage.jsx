'use client';

// components/BlogDetailPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Twitter, Linkedin, Mail } from "lucide-react";

// ============================
// COMPONENT
// ============================
export default function BlogDetailPage({ blogData }) {
  // If no blogData passed, return null or loading state
  if (!blogData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const { metadata, sections } = blogData;

  const articleRef = useRef(null);
  const boxRef = useRef(null);
  const [visible, setVisible] = useState(false); // whether black box is shown
  const [open, setOpen] = useState(false); // expanded panel
  const [percent, setPercent] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  // update sections (h2) after first render
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;

    // collect visible h2 headings (in document order)
    const headings = Array.from(el.querySelectorAll("h2")).map((h, i) => ({
      id: h.id || `section-${i}`,
      title: h.textContent.trim(),
      node: h,
    }));

    // ensure each heading has id (for direct linking)
    headings.forEach((h, i) => {
      if (!h.node.id) h.node.id = h.id;
    });

    // IntersectionObserver for active section
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // center-ish triggers
      threshold: 0,
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = headings.findIndex((x) => x.node === entry.target);
          if (idx !== -1) setActiveIndex(idx);
        }
      });
    }, observerOptions);

    headings.forEach((h) => io.observe(h.node));

    return () => {
      io.disconnect();
    };
  }, []);

  // scroll listener: compute percent relative to article
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

      // control visibility
      const shouldShow = scrolled > 60 || (scrolled >= articleTop - viewportH && scrolled <= articleTop + articleHeight);
      setVisible(shouldShow);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [articleRef]);

  // click a section: scroll to it smoothly and close panel optionally
  const goToSection = (idx) => {
    const section = sections[idx];
    if (!section) return;
    setOpen(false);

    // Calculate dynamic offset - 20% of viewport height
    const VIEWPORT_OFFSET_PERCENT = 0.2;
    const offset = window.innerHeight * VIEWPORT_OFFSET_PERCENT;

    // Find the element by id
    const element = document.getElementById(section.id);
    if (!element) return;

    // Get element position
    const elementTop = element.getBoundingClientRect().top + window.scrollY;

    // Scroll to element with offset
    const targetPosition = elementTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

    setActiveIndex(idx);
  };

  const toggleOpen = () => {
    setOpen((v) => !v);
  };

  // keyboard accessibility: ESC closes open panel
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const sectionDataForPanel = sections.map((section, idx) => ({
    id: section.id,
    title: section.title,
    index: idx
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-black mt-10">
      {/* Floating top Menu Box */}
      {/* Responsive positioning: Centered on mobile, Offset to right on desktop */}
      <div
        ref={boxRef}
        aria-hidden={!visible}
        className={`fixed z-50 transition-all duration-300 ease-out pointer-events-auto
          left-1/2 -translate-x-1/2 
          lg:left-auto lg:translate-x-20 lg:right-1/2
          ${visible ? "top-15 lg:top-20 opacity-100" : "-top-20 opacity-0"}
          max-w-[92vw] 
        `}
        style={{ width: open ? 420 : 210 }}
      >
        <div
          className={`mx-auto rounded-2xl shadow-2xl bg-orange-100 dark:bg-zinc-800 text-black dark:text-white overflow-hidden border dark:border-zinc-700`}
          style={{
            transition: "height 350ms cubic-bezier(.2,.9,.2,1), width 350ms cubic-bezier(.2,.9,.2,1)",
          }}
        >
          {/* Header (clickable) */}
          <button
            onClick={toggleOpen}
            className="w-full flex items-center justify-between gap-4 px-4 py-3 focus:outline-none"
            aria-expanded={open}
          >
            <div className="flex items-center gap-3">
              <div className="text-left">
                <div className="text-sm font-bold tracking-wide">EXPLORE</div>
              </div>
            </div>

            <div className="ml-auto px-2 py-1 rounded-md bg-orange-400 dark:bg-orange-600 text-sm font-semibold tracking-wide text-white">
              {percent}%
            </div>
          </button>

          {/* Expandable content */}
          <div
            className={`overflow-hidden bg-black/90 transition-[max-height,opacity,padding] duration-300 ease-out ${open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
              }`}
            style={{ padding: open ? "12px" : "0px 12px" }}
          >
            <div className="px-2 pb-3 text-gray-300 text-[13px]">Sections</div>

            <div className="max-h-72 overflow-auto px-2 pb-4 custom-scrollbar">
              {sectionDataForPanel.length === 0 ? (
                <div className="text-sm text-gray-400">No sections found</div>
              ) : (
                <ul className="space-y-2">
                  {sectionDataForPanel.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => goToSection(s.index)}
                        className={`w-full text-left text-sm block px-3 py-2 rounded-md transition-colors duration-150
                          ${s.index === activeIndex ? "bg-orange-500 text-white font-semibold" : "text-gray-300 hover:bg-white/10"}
                        `}
                      >
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-2 px-2 pb-3 border-t border-gray-800 dark:border-zinc-700 flex items-center gap-2">
              <button title="Share on Twitter" className="p-1 rounded hover:bg-white/10">
                <Twitter size={16} className="text-gray-300" />
              </button>
              <button title="Share on LinkedIn" className="p-1 rounded hover:bg-white/10">
                <Linkedin size={16} className="text-gray-300" />
              </button>
              <button title="Share via Email" className="p-1 rounded hover:bg-white/10">
                <Mail size={16} className="text-gray-300" />
              </button>
              <div className="ml-auto text-xs text-gray-400">Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-16">
        {/* Header Section */}
        <header className="mb-8 md:mb-12 max-w-2xl mt-8 md:mt-12">
          <h1 className="text-3xl md:text-5xl font-sans font-bold text-black dark:text-white mb-4 leading-tight">
            {metadata.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-4">
            {metadata.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-gray-500 dark:text-gray-400">
            <span>by {metadata.author.name}</span>
            <span className="hidden md:inline">•</span>
            <span>{metadata.readTime}</span>
            {metadata.isEditorPick && (
              <>
                <span className="hidden md:inline">•</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Editor's Pick</span>
              </>
            )}
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Left Column - Article Content */}
          <div className="col-span-1 lg:col-span-2">
            {/* Featured Image */}
            <div className="mb-8 md:mb-12 rounded-lg overflow-hidden bg-gray-300 h-64 md:h-96">
              <img
                src={metadata.featuredImage}
                alt={metadata.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Sections */}
            <article ref={articleRef} className="prose prose-lg max-w-none">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-8 md:mb-12">
                  <h2 className="text-xl md:text-2xl font-sans font-bold text-black dark:text-white mb-4">{section.title}</h2>
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-base md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                  {section.listItems && (
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4 text-base md:text-lg">
                      {section.listItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </article>

            {/* Navigation Footer */}
            <div className="border-t border-b border-gray-300 dark:border-zinc-800 py-6 md:py-8 mt-12 md:mt-16 mb-12 flex flex-col sm:flex-row gap-4 sm:gap-8">
              <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-zinc-700 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition w-full sm:w-auto text-gray-900 dark:text-white">
                <span>←</span>
                <span>Previous Post</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-zinc-700 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition w-full sm:w-auto sm:ml-auto text-gray-900 dark:text-white">
                <span>Next Post</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-1">
            <div className="sticky top-8">
              <div className="mb-8 md:mb-12 border-b border-gray-300 dark:border-zinc-800 pb-8">
                <h3 className="text-lg font-bold text-black dark:text-white mb-6">Share post</h3>
                <div className="flex gap-4">
                  <button className="p-2 border border-gray-300 dark:border-zinc-700 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition" title="Share on Twitter">
                    <Twitter size={18} className="text-gray-700 dark:text-gray-300" />
                  </button>
                  <button className="p-2 border border-gray-300 dark:border-zinc-700 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition" title="Share on LinkedIn">
                    <Linkedin size={18} className="text-gray-700 dark:text-gray-300" />
                  </button>
                  <button className="p-2 border border-gray-300 dark:border-zinc-700 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition" title="Share via Email">
                    <Mail size={18} className="text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Author Info */}
              <div className="mb-8 md:mb-12 border-b border-gray-300 dark:border-zinc-800 pb-8">
                <h3 className="text-lg font-bold text-black dark:text-white mb-4">Author info</h3>
                <div className="flex gap-4">
                  <img
                    src={metadata.author.image}
                    alt={metadata.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-black dark:text-white mb-1">{metadata.author.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{metadata.author.role}</p>
                    <div className="flex gap-3">
                      <a href={metadata.author.twitter} className="text-gray-500 dark:text-gray-400 hover:text-black dark:text-white transition">
                        <Twitter size={16} />
                      </a>
                      <a href={metadata.author.linkedin} className="text-gray-500 dark:text-gray-400 hover:text-black dark:text-white transition">
                        <Linkedin size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editor's Choice */}
              {metadata.isEditorPick && (
                <div className="mb-8 md:mb-12 border-b border-gray-300 dark:border-zinc-800 pb-8">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-6">Editor's choice</h3>
                  <div className="space-y-6">
                    <article className="flex gap-4 cursor-pointer hover:opacity-75 transition">
                      <img
                        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop"
                        alt="Article thumbnail"
                        className="w-20 h-20 object-cover rounded shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-black dark:text-white text-sm mb-2 leading-tight">
                          How modern work is reshaping modern lifestyles
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">by Samantha Grant | 3 min read</p>
                      </div>
                    </article>
                  </div>
                </div>
              )}

              {/* Recent Posts */}
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-6">Recent posts</h3>
                <div className="space-y-6">
                  <article className="cursor-pointer hover:opacity-75 transition">
                    <h4 className="font-bold text-black dark:text-white text-sm mb-2">
                      How e-commerce is reshaping global shopping trends
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">by Erica Johnson | 7 min read</p>
                  </article>
                  <article className="cursor-pointer hover:opacity-75 transition">
                    <h4 className="font-bold text-black dark:text-white text-sm mb-2">
                      Exploring minimalist living: a beginner's perspective
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">by Sarah Winters | 4 min read</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small helper styles for scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 8px; }
      `}</style>
    </div>
  );
}
