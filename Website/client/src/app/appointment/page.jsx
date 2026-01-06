// app/appointment/page.jsx

import AppointmentContent from "@/components/Appointment/AppointmentContent";

// -------------------------------------------
// 🔵 FULL NEXT.JS SEO METADATA FOR APPOINTMENT PAGE
// -------------------------------------------
export const metadata = {
  // 🌐 Basic SEO
  title: "Book Appointment | Schedule Consultation - BrandBase Capsule Mumbai",
  description: 
    "Book a free appointment with BrandBase Capsule's experts. Schedule a consultation for web development, app creation, branding & digital marketing services. ⏰ 30-min free slot",
  
  keywords: [
    "book appointment digital agency",
    "schedule consultation web development",
    "free consultation Mumbai agency",
    "appointment booking website services",
    "meet digital experts Mumbai",
    "branding consultation appointment",
    "app development meeting",
    "digital marketing strategy session",
    "project discussion booking",
    "BrandBase Capsule appointment"
  ],

  // 👤 Authorship
  authors: [{ name: "BrandBase Capsule" }],
  generator: "Next.js",
  applicationName: "BrandBase Capsule Appointment System",
  publisher: "BrandBase Capsule",

  // 🤖 Robots & SEO Controls
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
      noimageindex: false,
    },
  },

  // 🌍 Canonical URL
  metadataBase: new URL("https://www.brandbasecapsule.com"),
  alternates: {
    canonical: "https://www.brandbasecapsule.com/appointment",
    languages: {
      'en-IN': 'https://www.brandbasecapsule.com/appointment',
    },
  },

  // 🖼️ Social Sharing (Open Graph) - Appointment Focused
  openGraph: {
    title: "📅 Book Free Appointment | BrandBase Capsule Digital Agency",
    description: 
      "Schedule a 30-minute free consultation with our digital experts. Discuss your web, app, branding & marketing projects. Available slots Monday-Friday.",
    url: "https://www.brandbasecapsule.com/appointment",
    siteName: "BrandBase Capsule",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.brandbasecapsule.com/og-appointment.jpg",
        width: 1200,
        height: 630,
        alt: "Book Appointment with BrandBase Capsule Digital Agency",
        type: "image/jpeg",
      },
    ],
    emails: ["appointments@brandbasecapsule.com", "hello@brandbasecapsule.com"],
    phoneNumbers: ["+91-XXXXXXXXXX"],
    availability: "https://schema.org/BusinessHours",
    makesOffer: [
      "Free 30-minute consultation",
      "Web Development Services",
      "App Development Services",
      "Branding Services",
      "Digital Marketing Services"
    ]
  },

  // 🐦 Twitter SEO
  twitter: {
    card: "summary_large_image",
    site: "@brandbasecapsule",
    creator: "@brandbasecapsule",
    title: "Book Appointment | Free Consultation - BrandBase Capsule",
    description: 
      "Schedule your free 30-min consultation with Mumbai's top digital agency. Get expert advice on web, app, branding & marketing. 📱",
    images: ["https://www.brandbasecapsule.com/og-appointment.jpg"],
    label1: "Booking Status",
    data1: "Open for Appointments",
    label2: "Response Time",
    data2: "Within 24 hours"
  },

  // 📱 WhatsApp/Telegram Specific Meta Tags
  other: {
    // Appointment Specific
    "booking:availability": "https://schema.org/InStock",
    "booking:availabilityStarts": "2024-01-01",
    "booking:availabilityEnds": "2024-12-31",
    "booking:price": "0",
    "booking:priceCurrency": "INR",
    
    // WhatsApp Link Preview
    "og:phone_number": "+91-XXXXXXXXXX",
    "og:email": "appointments@brandbasecapsule.com",
    "og:latitude": "19.0760",
    "og:longitude": "72.8777",
    "og:street-address": "Mumbai, Maharashtra",
    "og:locality": "Mumbai",
    "og:region": "Maharashtra",
    "og:country-name": "India",
    "og:postal-code": "400000",
    
    // Appointment Details
    "appointment:type": "consultation",
    "appointment:duration": "PT30M",
    "appointment:price": "Free",
    "appointment:booking_method": "Online Form",
    "appointment:confirmation_method": "Email & WhatsApp",
    
    // Business Hours for Appointments
    "business:appointment_hours": "Mon-Fri 9:00-18:00",
    "business:timezone": "IST (GMT+5:30)",
    "business:lead_time": "24 hours",
    
    // Telegram Specific
    "telegram:channel": "@brandbasecapsule",
    
    // Additional SEO
    "service:type": "Digital Agency Consultation",
    "service:area": "Mumbai, India & Worldwide",
    "service:language": "English, Hindi, Marathi"
  },

  // 🌐 Browser Settings
  referrer: "origin-when-cross-origin",
  viewport: 
    "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover, user-scalable=yes",

  // 📌 Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#000000"
    }
  },

  // 🏷️ Category & Theme
  category: "Business Services",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
};

// -------------------------------------------
// 🔵 JSON-LD STRUCTURED DATA (AEO Optimized)
// -------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "AppointmentPage"],
      "@id": "https://www.brandbasecapsule.com/appointment/#webpage",
      "url": "https://www.brandbasecapsule.com/appointment",
      "name": "Book Appointment | Schedule Consultation",
      "description": "Appointment booking page for BrandBase Capsule digital agency",
      "isPartOf": {
        "@id": "https://www.brandbasecapsule.com/#website"
      },
      "inLanguage": "en-IN",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.brandbasecapsule.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Book Appointment"
          }
        ]
      },
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.brandbasecapsule.com/appointment",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform"
          ]
        },
        "result": {
          "@type": "Reservation",
          "name": "Consultation Appointment"
        }
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.brandbasecapsule.com/#organization",
      "name": "BrandBase Capsule",
      "legalName": "BrandBase Capsule Pvt. Ltd.",
      "url": "https://www.brandbasecapsule.com",
      "logo": "https://www.brandbasecapsule.com/logo.png",
      "description": "Premier digital agency in Mumbai offering web development, app development, branding, and digital marketing services.",
      
      "sameAs": [
        "https://www.instagram.com/brandbasecapsule",
        "https://www.facebook.com/brandbasecapsule",
        "https://www.linkedin.com/company/brandbasecapsule",
        "https://twitter.com/brandbasecapsule",
        "https://wa.me/91XXXXXXXXXX",
        "https://calendly.com/brandbasecapsule"
      ],

      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-XXXXXXXXXX",
          "contactType": "appointments",
          "contactOption": "TollFree",
          "areaServed": ["IN", "US", "UK", "AU", "AE", "SG"],
          "availableLanguage": ["English", "Hindi", "Marathi"],
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          },
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://www.brandbasecapsule.com/appointment"
          }
        },
        {
          "@type": "ContactPoint",
          "telephone": "+91-XXXXXXXXXX",
          "contactType": "customer service",
          "contactOption": "WhatsApp",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi", "Marathi"],
          "description": "WhatsApp for quick appointment scheduling"
        }
      ],

      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Digital Hub, Business District",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400000",
        "addressCountry": "IN"
      },

      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Free Initial Consultation",
          "description": "30-minute free consultation to discuss your project requirements",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "eligibleDuration": {
            "@type": "QuantitativeValue",
            "value": "30",
            "unitCode": "MIN"
          }
        },
        {
          "@type": "Offer",
          "name": "Website Development Package",
          "description": "Complete website design and development services"
        },
        {
          "@type": "Offer",
          "name": "Mobile App Development",
          "description": "iOS and Android app development services"
        },
        {
          "@type": "Offer",
          "name": "Brand Identity Package",
          "description": "Complete branding and identity design solutions"
        },
        {
          "@type": "Offer",
          "name": "Digital Marketing Strategy",
          "description": "Comprehensive digital marketing and SEO services"
        }
      ],

      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "187",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": "45"
      },

      "priceRange": "₹₹₹₹",
      "founder": {
        "@type": "Person",
        "name": "Founder Name",
        "jobTitle": "CEO & Creative Director"
      },
      "foundingDate": "2020",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "25"
      },
      "knowsAbout": [
        "Web Development",
        "App Development",
        "UI/UX Design",
        "Digital Marketing",
        "Brand Strategy",
        "SEO Optimization",
        "E-commerce Solutions"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.brandbasecapsule.com/#website",
      "url": "https://www.brandbasecapsule.com",
      "name": "BrandBase Capsule",
      "description": "Mumbai's Premier Digital Agency - Web, App, Branding & Marketing",
      "publisher": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      },
      "inLanguage": "en-IN",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.brandbasecapsule.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    // Appointment Service Schema
    {
      "@type": "Service",
      "@id": "https://www.brandbasecapsule.com/appointment/#service",
      "serviceType": "Consultation Service",
      "provider": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      },
      "name": "Digital Strategy Consultation",
      "description": "Free 30-minute consultation to discuss digital projects including website development, app creation, branding, and marketing strategies.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01",
        "validThrough": "2024-12-31"
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 19.0760,
          "longitude": 72.8777
        },
        "geoRadius": "1000000"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Consultation Packages",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Initial Discovery Call",
              "duration": "PT30M"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Project Deep Dive",
              "duration": "PT60M"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Strategy Workshop",
              "duration": "PT120M"
            }
          }
        ]
      }
    },
    // FAQ Schema for AEO (Appointment Focused)
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I book an appointment with BrandBase Capsule?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can book an appointment by filling out our online appointment form, calling us at +91-XXXXXXXXXX, or sending a WhatsApp message. We'll confirm your slot within 24 hours."
          }
        },
        {
          "@type": "Question",
          "name": "Is the initial consultation free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer a complimentary 30-minute initial consultation to understand your project requirements and discuss potential solutions without any obligation."
          }
        },
        {
          "@type": "Question",
          "name": "What should I prepare for the appointment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Please have your project brief, goals, target audience information, competitors, budget range, and timeline ready. If you have any existing materials or references, bring them along."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a typical appointment last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Initial consultations are 30 minutes. For detailed project discussions, we schedule 60-minute sessions. Complex strategy workshops can be 2 hours or more."
          }
        },
        {
          "@type": "Question",
          "name": "Can I reschedule my appointment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can reschedule up to 24 hours before your appointment time. Please contact us via email or WhatsApp to arrange a new slot."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer virtual appointments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer both in-person appointments at our Mumbai office and virtual meetings via Google Meet, Zoom, or Microsoft Teams as per your preference."
          }
        },
        {
          "@type": "Question",
          "name": "What happens after the appointment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "After our meeting, we'll send you a detailed proposal with project scope, timeline, and pricing within 48 hours. We'll also provide any additional recommendations discussed."
          }
        }
      ]
    },
    // Booking Action Schema
    {
      "@type": "BookAction",
      "name": "Book Consultation Appointment",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.brandbasecapsule.com/appointment",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "reservationFor": {
          "@type": "Service",
          "name": "Digital Strategy Consultation",
          "provider": {
            "@id": "https://www.brandbasecapsule.com/#organization"
          }
        }
      }
    },
    // Local Business Schema with Appointment Info
    {
      "@type": "LocalBusiness",
      "@id": "https://www.brandbasecapsule.com/#localbusiness",
      "name": "BrandBase Capsule Digital Agency",
      "image": "https://www.brandbasecapsule.com/og-appointment.jpg",
      "url": "https://www.brandbasecapsule.com",
      "telephone": "+91-XXXXXXXXXX",
      "email": "appointments@brandbasecapsule.com",
      "priceRange": "₹₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Digital Hub, Business District",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400000",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.0760",
        "longitude": "72.8777"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "makesOffer": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "itemOffered": {
          "@type": "Service",
          "name": "Appointment Booking",
          "description": "Book a consultation with our digital experts"
        }
      }
    }
  ]
};

// -------------------------------------------
// 🔵 PAGE COMPONENT
// -------------------------------------------
export default function Appointment() {
  return (
    <>
      {/* Primary JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Additional Schema for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.brandbasecapsule.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://www.brandbasecapsule.com/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Book Appointment",
                "item": "https://www.brandbasecapsule.com/appointment"
              }
            ]
          })
        }}
      />
      
      {/* Appointment Specific Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Reservation",
            "reservationNumber": "BBC-APPT",
            "reservationStatus": "https://schema.org/ReservationConfirmed",
            "underName": {
              "@type": "Person",
              "name": "Customer"
            },
            "reservationFor": {
              "@type": "Service",
              "name": "Digital Strategy Consultation",
              "provider": {
                "@type": "Organization",
                "name": "BrandBase Capsule",
                "url": "https://www.brandbasecapsule.com"
              },
              "description": "30-minute free consultation for digital projects",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              }
            },
            "bookingTime": new Date().toISOString(),
            "modifiedTime": new Date().toISOString()
          })
        }}
      />
      
      <AppointmentContent />
    </>
  );
}
