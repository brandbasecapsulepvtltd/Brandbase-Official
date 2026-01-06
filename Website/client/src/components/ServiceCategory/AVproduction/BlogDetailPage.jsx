// BlogDetailPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Twitter, Linkedin, Mail } from "lucide-react";

/**
 * BlogDetailPage
 * - Top-center black progress box with circular loader & percentage that:
 *    • appears when user scrolls down
 *    • percent is based on article scroll progress (100% when article ends)
 *    • can be clicked to expand and show list of section titles (h2)
 *    • clicking a title scrolls to that section smoothly
 *    • highlights active section while scrolling
 *
 * Paste into your project (TailwindCSS required).
 */

// ============================
// BLOG DATA (Move to separate file later)
// ============================
const BLOG_DATA = {
  // Main blog metadata
  metadata: {
    slug: "best-productivity-hacks-for-creative-freelancers-today",
    category: "productivity",
    isEditorPick: true,
    isSlider: true,
    isHelpfulResources: true,
    title: "Best productivity hacks for creative freelancers today",
    description: "Smart tools and routines to help freelancers stay organized, inspired, and productive.",
    author: {
      name: "Michael Smith",
      role: "Creative & Lifestyle",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      twitter: "#",
      linkedin: "#"
    },
    readTime: "5 min read",
    featuredImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=800&fit=crop",
    publishDate: "2024-03-15"
  },

  // Article sections
  sections: [
    {
      id: "intro",
      title: "Introduction",
      content: [
        "Freelancers have limitless potential to deliver high-quality work while managing multiple projects, clients, and deadlines. However, increased flexibility and autonomy often bring increased pressure to stay organized and competitive in this growing industry.",
        "Smart routines, organizational projects, and productivity hacks can play a crucial role in ensuring consistent and exceptional output. In this article, we explore effective strategies that help freelancers achieve and maintain sustainable work-life balance and create a healthy friction between work and rest."
      ]
    },
    {
      id: "why",
      title: "Why smart routines matter for efficiency",
      content: [
        "Freelancers need flexibility, but structure is what keeps productivity moving. Creating a daily routine helps with distribution and improves concentration.",
        "Planning tasks in advance and setting priorities keeps you focused under control. This leads to more focused work and better results and reduces stress."
      ]
    },
    {
      id: "tools",
      title: "Tools that enhance creativity and workflow",
      content: [
        "The right tools are essential to any productive freelancer's kit. From apps for tracking work, storing ideas, and scheduling tasks various tools can assist in reducing errors and improving overall productivity. With the right tools, freelancers can simplify complex work, make faster decisions, and finish projects on time."
      ]
    },
    {
      id: "focus",
      title: "Staying focused while working independently",
      content: [
        "Working alone can make it tough to stay motivated. Creating a dedicated workspace, setting time blocks, and removing digital distractions help boost focus.",
        "Finding a balance between tackling your daily goals and taking strategic breaks is crucial. Regular check-ins with yourself and setting realistic deadlines improve productivity and maintain notifications. This improves workflow and keeps attention on important tasks."
      ]
    },
    {
      id: "balance",
      title: "A balance of work and well being",
      content: [
        "A good productivity strategy acknowledges the importance of mental and physical health. Break regularly, exercise, and maintain creative capacity for long-term success."
      ],
      listItems: [
        "Regular breaks boost productivity throughout the day",
        "Better clarity and idea generation",
        "Balanced emotional and mental health"
      ]
    },
    {
      id: "confidence",
      title: "Boosting confidence through consistent progress",
      content: [
        "Productivity thrives from tracking progress and celebrating wins continuously.",
        "Small improvements every day lead to stronger confidence and better performance across all tasks. Consistency builds trust in yourself and showcases your capabilities."
      ]
    },
    {
      id: "conclusion",
      title: "Conclusion",
      content: [
        "Productivity is essential for creative freelancers who want to grow in a competitive market. Smart routines, helpful tools, and healthy habits create work-life balance that supports long-term success. By implementing these productivity hacks, you can unlock your full potential as a freelancer. Consistency and dedication are the foundations of success, and productivity is not just about doing more. It's about working smarter and creating a sustainable path for long-term success."
      ]
    }
  ]
};

// ============================
// COMPONENT
// ============================
export default function BlogDetailPage() {
  const { metadata, sections } = BLOG_DATA;
  
  const articleRef = useRef(null);
  const boxRef = useRef(null);
  const [visible, setVisible] = useState(false); // whether black box is shown
  const [open, setOpen] = useState(false); // expanded panel
  const [percent, setPercent] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  // circle parameters
  const CIRCLE_SIZE = 44; // svg viewBox size
  const R = 18; // radius
  const C = 2 * Math.PI * R; // circumference

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

      // We want progress to be 0 when top of article enters viewport,
      // and 1 (100%) when bottom of article reaches top of viewport (i.e., scrolled past)
      // But common desire: progress = (window.scrollY - articleTop) / (articleHeight - viewportH)
      const scrolled = window.scrollY;
      const denom = Math.max(articleHeight - viewportH, 1);
      let p = (scrolled - articleTop) / denom;
      p = Math.min(Math.max(p, 0), 1);

      setPercent(Math.round(p * 100));

      // control visibility: show when user has scrolled at all or when in the article area
      // here we show once user scrolls beyond 60px or if inside article bounds
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
    
    // Scroll to element with offset (20% down from the top)
    const targetPosition = elementTop - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
    
    // Set active immediately for visual feedback
    setActiveIndex(idx);
  };

  // toggle open/close with animation-friendly state
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

  // Prepare section data for the progress panel
  const sectionDataForPanel = sections.map((section, idx) => ({
    id: section.id,
    title: section.title,
    index: idx
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Floating top-center black box */}
      <div
        ref={boxRef}
        aria-hidden={!visible}
        className={`fixed right-0 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out pointer-events-auto
          ${visible ? "top-30 opacity-100" : "-top-12 opacity-0"}
        `}
        style={{ width: open ? 420 : 210 }}
      >
        <div
          className={`mx-auto rounded-2xl shadow-2xl bg-orange-100 text-black dark:text-white overflow-hidden`}
          style={{
            transition: "height 350ms cubic-bezier(.2,.9,.2,1), width 350ms cubic-bezier(.2,.9,.2,1)",
          }}
        >
          {/* Header (clickable) */}
          <button
            onClick={toggleOpen}
            className="w-full flex items-center justify-between gap-4 px-4 py-2 focus:outline-none"
            aria-expanded={open}
          >
            {/* Left: circular loader + title */}
            <div className="flex items-center gap-3">
              <div className="text-left">
                <div className="text-sm font-bold tracking-wide">EXPLORE </div>
              </div>
            </div>

            {/* Right: percent pill */}
            <div className="ml-auto px-2 py-1 rounded-md bg-orange-400 text-sm font-semibold tracking-wide">
              {percent}%
            </div>
          </button>

          {/* Expandable content */}
          <div
            className={`overflow-hidden bg-black/90 transition-[max-height,opacity,padding] duration-300 ease-out ${
              open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ padding: open ? "12px" : "0px 12px" }}
          >
            {/* Explain small top line */}
            <div className="px-2 pb-3 text-gray-300 text-[13px]">Sections</div>

            {/* List of sections */}
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
                          ${s.index === activeIndex ? "bg-white dark:bg-black/10 text-white font-semibold" : "text-gray-300 hover:bg-white dark:bg-black/5"}
                        `}
                      >
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* small footer: share icons */}
            <div className="pt-2 px-2 pb-3 border-t border-gray-800 flex items-center gap-2">
              <button title="Share on Twitter" className="p-1 rounded hover:bg-white dark:bg-black/5">
                <Twitter size={16} className="text-gray-300" />
              </button>
              <button title="Share on LinkedIn" className="p-1 rounded hover:bg-white dark:bg-black/5">
                <Linkedin size={16} className="text-gray-300" />
              </button>
              <button title="Share via Email" className="p-1 rounded hover:bg-white dark:bg-black/5">
                <Mail size={16} className="text-gray-300" />
              </button>
              <div className="ml-auto text-xs text-gray-400">Progress inside article</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header Section */}
        <header className="mb-12 max-w-2xl mt-15">
          <h1 className="text-5xl font-sans font-bold text-black dark:text-white mb-4 leading-tight">
            {metadata.title}
          </h1>
          <p className="text-gray-600 text-base mb-4">
            {metadata.description}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>by {metadata.author.name}</span>
            <span>•</span>
            <span>{metadata.readTime}</span>
            {metadata.isEditorPick && (
              <>
                <span>•</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Editor's Pick</span>
              </>
            )}
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="grid grid-cols-3 gap-12">
          {/* Left Column - Article Content */}
          <div className="col-span-2">
            {/* Featured Image */}
            <div className="mb-12 rounded-lg overflow-hidden bg-gray-300 h-96">
              <img
                src={metadata.featuredImage}
                alt={metadata.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Sections */}
            <article ref={articleRef} className="prose prose-lg max-w-none">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-12">
                  <h2 className="text-2xl font-sans font-bold text-black dark:text-white mb-4">{section.title}</h2>
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                  {section.listItems && (
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                      {section.listItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </article>

            {/* Navigation Footer */}
            <div className="border-t border-b border-gray-300 py-8 mt-16 mb-12 flex gap-8">
              <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition">
                <span>←</span>
                <span>Previous Post</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition">
                <span>Next Post</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-1">
            {/* Share Post Section */}
            <div className="mb-12 border-b border-gray-300 pb-8">
              <h3 className="text-lg font-bold text-black dark:text-white mb-6">Share post</h3>
              <div className="flex gap-4">
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition" title="Share on Twitter">
                  <Twitter size={18} className="text-gray-700" />
                </button>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition" title="Share on LinkedIn">
                  <Linkedin size={18} className="text-gray-700" />
                </button>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition" title="Share via Email">
                  <Mail size={18} className="text-gray-700" />
                </button>
              </div>
            </div>

            {/* Author Info */}
            <div className="mb-12 border-b border-gray-300 pb-8">
              <h3 className="text-lg font-bold text-black dark:text-white mb-4">Author info</h3>
              <div className="flex gap-4">
                <img
                  src={metadata.author.image}
                  alt={metadata.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-black dark:text-white mb-1">{metadata.author.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{metadata.author.role}</p>
                  <div className="flex gap-3">
                    <a href={metadata.author.twitter} className="text-gray-500 hover:text-black dark:text-white transition">
                      <Twitter size={16} />
                    </a>
                    <a href={metadata.author.linkedin} className="text-gray-500 hover:text-black dark:text-white transition">
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor's Choice */}
            {metadata.isEditorPick && (
              <div className="mb-12 border-b border-gray-300 pb-8">
                <h3 className="text-lg font-bold text-black dark:text-white mb-6">Editor's choice</h3>
                <div className="space-y-6">
                  <article className="flex gap-4 cursor-pointer hover:opacity-75 transition">
                    <img
                      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop"
                      alt="Article thumbnail"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-black dark:text-white text-sm mb-2 leading-tight">
                        How modern work is reshaping modern lifestyles
                      </h4>
                      <p className="text-xs text-gray-500">by Samantha Grant | 3 min read</p>
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
                  <p className="text-xs text-gray-500">by Erica Johnson | 7 min read</p>
                </article>
                <article className="cursor-pointer hover:opacity-75 transition">
                  <h4 className="font-bold text-black dark:text-white text-sm mb-2">
                    Exploring minimalist living: a beginner's perspective
                  </h4>
                  <p className="text-xs text-gray-500">by Sarah Winters | 4 min read</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small helper styles for scrollbar (Tailwind doesn't include custom scrollbar by default) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 8px; }
      `}</style>
    </div>
  );
}
