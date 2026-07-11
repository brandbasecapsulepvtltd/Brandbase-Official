"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  MapPin,
  Calendar,
  User,
  Building,
  Globe,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import Breadcrumbs from "@/components/General/Breadcrumbs";
import SafeImage from "@/components/General/SafeImage";
import EventActionButtons from "@/components/ExhibitionCal/EventActionButtons";
import { getIndustryLabel } from "@/lib/master-data";
import { isEventPast, parseEventDate } from "@/lib/eventUtils";
function EventShareButtons({ title }) {
  const [copied, setCopied] = useState(false);

  const share = useCallback(
    (platform) => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(title);
      const links = {
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        email: `mailto:?subject=${text}&body=${url}`,
      };
      if (platform === "email") {
        window.location.href = links.email;
      } else {
        window.open(links[platform], "_blank", "noopener,noreferrer");
      }
    },
    [title]
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {[
        { id: "twitter", icon: Twitter, label: "Share on Twitter" },
        { id: "linkedin", icon: Linkedin, label: "Share on LinkedIn" },
        { id: "email", icon: Mail, label: "Share via email" },
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => share(id)}
          title={label}
          aria-label={label}
          className="p-3 rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-[#FF6600]/50 hover:bg-[#FF6600]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
        >
          <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      ))}
      <button
        type="button"
        onClick={copyLink}
        title="Copy link"
        aria-label="Copy link"
        className="p-3 rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-[#FF6600]/50 hover:bg-[#FF6600]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Copy className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        )}
      </button>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="w-1 h-8 bg-[#FF6600] rounded-full" aria-hidden="true" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{children}</h2>
    </div>
  );
}

export default function EventDetailContent({ event, asOfDate }) {
  const referenceDate = asOfDate || new Date().toISOString();
  const past = isEventPast(event, referenceDate);
  const start = parseEventDate(event.startDate);
  const end = parseEventDate(event.endDate);
  const dateLabel =
    start && end
      ? `${format(start, "MMMM d")} – ${format(end, "d, yyyy")}`
      : "Dates TBA";

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 max-w-7xl pt-28 pb-16 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Event Calendar", href: "/event-calendar" },
            { label: event.name, href: `/event-calendar/${event.slug}` },
          ]}
        />

        <header className="rounded-3xl border border-gray-100 dark:border-zinc-800 bg-gradient-to-br from-orange-50/80 to-white dark:from-zinc-900 dark:to-zinc-950 p-8 md:p-12 mb-12">
          <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-orange-100 text-[#FF6600] dark:bg-orange-900/30 dark:text-orange-400">
                  {getIndustryLabel(event.industry)}
                </span>
                {past && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                    Exhibition Ended
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {event.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                {event.description}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-[#FF6600]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">{dateLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-[#FF6600]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Location</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {event.venue}, {event.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-full max-w-sm shrink-0">
              <EventActionButtons event={event} asOfDate={referenceDate} />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="lg:hidden">
              <EventActionButtons event={event} asOfDate={referenceDate} />
            </div>

            {event.whyParticipate && (
              <section>
                <SectionHeading>Why Participate?</SectionHeading>
                <div className="bg-orange-50/50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-orange-100 dark:border-zinc-800">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {event.whyParticipate}
                  </p>
                </div>
              </section>
            )}

            <section>
              <SectionHeading>Event Highlights</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                  <User className="w-8 h-8 text-[#FF6600] mb-4" />
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {event.expectedFootfall?.toLocaleString() || "—"}+
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expected Visitors</p>
                </div>
                <div className="p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                  <Building className="w-8 h-8 text-[#FF6600] mb-4" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {event.isIndoor ? "Indoor Exhibition" : "Outdoor Event"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Venue Type</p>
                </div>
                <div className="p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                  <Globe className="w-8 h-8 text-[#FF6600] mb-4" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {event.organizer}
                  </p>
                  {event.organizerWebsite && (
                    <a
                      href={event.organizerWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#FF6600] hover:underline"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </section>

            {event.stallSizes?.length > 0 && (
              <section>
                <SectionHeading>Available Stall Sizes</SectionHeading>
                <div className="flex flex-wrap gap-3">
                  {event.stallSizes.map((size) => (
                    <span
                      key={size}
                      className="px-5 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-200 font-medium"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {event.portfolioItems?.length > 0 && (
              <section>
                <SectionHeading>Our Work at Previous Editions</SectionHeading>
                <div className="grid grid-cols-1 gap-8">
                  {event.portfolioItems.map((item) => (
                    <article
                      key={item.id}
                      className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-all"
                    >
                      {item.imageUrl && (
                        <div className="relative h-64 overflow-hidden">
                          <SafeImage
                            src={item.imageUrl}
                            alt={item.eventName || item.clientName}
                            fallbackKey="exhibition"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6 md:p-8">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                              {item.clientName}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">{item.clientCompany}</p>
                          </div>
                          {item.stallSize && (
                            <span className="px-3 py-1 bg-orange-100 text-[#FF6600] text-xs font-semibold rounded-full dark:bg-orange-900/30 dark:text-orange-400 shrink-0">
                              {item.stallSize} Stall
                            </span>
                          )}
                        </div>
                        {item.clientTestimonial && (
                          <blockquote className="text-gray-600 dark:text-gray-300 italic border-l-4 border-[#FF6600] pl-4 py-1">
                            &ldquo;{item.clientTestimonial}&rdquo;
                          </blockquote>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {event.sections?.map((section) => (
              <section key={section.id} className="space-y-4">
                <SectionHeading>{section.title}</SectionHeading>
                {section.content?.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
                {section.listItems?.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    {section.listItems.map((item, idx) => (
                      <li key={idx} className="text-lg">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.media?.map((mediaItem, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden my-6">
                    {mediaItem.type === "image" ? (
                      <SafeImage
                        src={mediaItem.url}
                        alt={mediaItem.caption || section.title}
                        fallbackKey="exhibition"
                        className="w-full h-auto rounded-xl"
                      />
                    ) : (
                      <video src={mediaItem.url} controls className="w-full h-auto rounded-xl" />
                    )}
                    {mediaItem.caption && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                        {mediaItem.caption}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            ))}

            {event.faqs?.length > 0 && (
              <section>
                <SectionHeading>Frequently Asked Questions</SectionHeading>
                <div className="space-y-3">
                  {event.faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 open:bg-white dark:open:bg-zinc-900"
                    >
                      <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-gray-900 dark:text-white p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] rounded-xl">
                        {faq.question}
                        <span className="bg-white dark:bg-zinc-800 p-1 rounded-full border border-gray-200 dark:border-zinc-700">
                          <Plus className="w-4 h-4 group-open:hidden" />
                          <Minus className="w-4 h-4 hidden group-open:block" />
                        </span>
                      </summary>
                      <div className="px-4 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-zinc-800 pt-4">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Organizer</h3>
                <p className="font-medium text-lg mb-1">{event.organizer}</p>
                {event.organizerWebsite && (
                  <a
                    href={event.organizerWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF6600] hover:underline text-sm inline-flex items-center gap-1 mb-4"
                  >
                    <Globe className="w-4 h-4" />
                    Official Website
                  </a>
                )}
                <hr className="border-gray-100 dark:border-zinc-800 my-4" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Need a stall for {event.name}? BrandBase designs, fabricates, and manages exhibition
                  booths across India.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6600] hover:underline"
                >
                  Contact us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Share Event</h3>
                <EventShareButtons title={event.name} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
