"use client";
import { useState } from "react";
import Tag from "../Tag";

// Clients Section with Brand Logos
export default function Clients({ data }) {
  const [showAll, setShowAll] = useState(false);

  // Calculate how many logos to show (2 rows × 6 logos = 12)
  const clientData = data?.clientData || [];
  const clientsToShow = showAll ? clientData : clientData.slice(0, 12);
  const hasMoreClients = clientData.length > 12;

  // Split clients into rows of 6
  const rows = [];
  for (let i = 0; i < clientsToShow.length; i += 6) {
    rows.push(clientsToShow.slice(i, i + 6));
  }

  return (
    <section
      aria-labelledby="clients-heading"
      className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-20 mt-10 mx-auto bg-white dark:bg-black"
    >
      {/* Title */}
      <header className="mx-auto text-center mb-6">
        <Tag>Our Clients</Tag>
        <h2
          id="clients-heading"
          className="text-4xl lg:text-6xl font-medium mt-4 text-black dark:text-white"
        >
          Trusted by Top
          <span className="text-[#FF6600]"> 200+ </span>
          Industry Leaders
        </h2>
      </header>
      {/* End Title */}

      {/* Client Logos with ARIA Label */}
      <div
        className="space-y-8 mt-10"
        role="region"
        aria-label="Client logos"
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-3 md:grid-cols-6 gap-6"
            role="list"
            aria-label={`Row ${rowIndex + 1} of client logos`}
          >
            {row.map((client) => (
              <article
                key={client.id}
                className="flex items-center justify-center py-4 lg:py-6 group relative cursor-default"
                role="listitem"
                aria-label={client.name}
              >
                {/* 3D Hover Container */}
                <div className="relative transform transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:z-10">
                  {/* Shadow effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm group-hover:blur-md scale-95 group-hover:scale-105"
                    aria-hidden="true"
                  ></div>

                  {/* Main logo with 3D effect */}
                  <img
                    src={client.logo}
                    className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 ease-out transform group-hover:shadow-2xl group-hover:shadow-[#FF6600]/20 rounded-2xl p-3 bg-white dark:bg-zinc-800/50 backdrop-blur-sm border border-white/10 dark:border-zinc-800 group-hover:border-[#FF6600]/30"
                    alt={`${client.name} - Industry leader and client`}
                    title={client.name}
                    loading="lazy"
                    width={112}
                    height={112}
                  />

                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-[#FF6600] opacity-0 group-hover:opacity-5 transition-all duration-500 ease-out transform group-hover:scale-110"
                    aria-hidden="true"
                  ></div>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>

      {/* View More Button with Smooth Animation */}
      {hasMoreClients && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="py-4 px-8 inline-flex items-center gap-x-3 text-base font-semibold rounded-full border-2 border-[#FF6600] bg-transparent text-[#FF6600] hover:bg-[#FF6600] hover:text-white transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF6600]/30 focus:outline-hidden focus:ring-2 focus:ring-[#FF6600] focus:ring-offset-2"
            aria-expanded={showAll}
            aria-controls="client-logos-container"
          >
            {showAll ? 'Show Less' : 'View More'}
            <svg
              className={`shrink-0 size-5 transition-all duration-500 ease-out ${showAll ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <title>{showAll ? 'Collapse icon' : 'Expand icon'}</title>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
