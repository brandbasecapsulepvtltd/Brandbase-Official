// app/blog/[category]/[slug]/page.jsx
import BlogDetailPage from '@/components/Blog/BlogDetailPage';
import { notFound } from 'next/navigation';

const API_BASE_URL = 'https://brandbase.onrender.com/api';

// Set revalidation time (in seconds)
export const revalidate = 10; // Revalidate every 60 seconds

/**
 * Generate static params from blog data
 */
export async function generateStaticParams() {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      next: { revalidate: 60 } // Revalidate params every minute
    });
    
    if (!response.ok) {
      console.error('Failed to fetch blogs for static params:', response.status);
      return [];
    }
    
    const result = await response.json();
    const blogs = result.data || [];
    
    return blogs.map((blog) => ({
      category: blog.metadata.category,
      slug: blog.metadata.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Generate metadata for each blog post
 */
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    
    // Fetch fresh data with no-store to get latest updates
    const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, {
      cache: 'no-store' // Don't cache for metadata to get latest data
    });
    
    if (!response.ok) {
      console.error('Failed to fetch blog for metadata:', response.status);
      return {
        title: 'Blog Post | Brandbase Capsule',
        description: 'Read our latest blog post on Brandbase Capsule.',
      };
    }
    
    const result = await response.json();
    const blogData = result.data;
    
    if (!blogData) {
      return {
        title: 'Blog Post Not Found | Brandbase Capsule',
        description: 'The requested blog post could not be found.',
      };
    }

    const { metadata } = blogData;
    const siteUrl = 'https://brandbase-nu.vercel.app';
    const blogUrl = `${siteUrl}/blog/${metadata.category}/${metadata.slug}`;
    
    return {
      // 🌐 Basic SEO
      title: `${metadata.title} | Brandbase Capsule Blog`,
      description: metadata.description,
      
      keywords: [
        metadata.category,
        metadata.title.toLowerCase(),
        `${metadata.category} blog`,
        `${metadata.title.split(' ')[0]} tips`,
        "digital marketing blog",
        "productivity blog",
        "technology insights",
        "freelancer resources",
        "business growth",
        "creative professionals"
      ],

      // 👤 Authorship
      authors: [{ name: metadata.author.name }],
      generator: "Next.js",
      applicationName: "Brandbase Capsule",
      publisher: "Brandbase Capsule",

      // 🤖 Robots & SEO Controls
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
        },
      },

      // 🌍 Canonical URL
      metadataBase: new URL("https://www.brandbasecapsule.com"),
      alternates: {
        canonical: blogUrl,
      },

      // 🖼️ Social Sharing (Open Graph) - WhatsApp Friendly
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        url: blogUrl,
        siteName: "Brandbase Capsule Blog",
        locale: "en_IN",
        type: "article",
        publishedTime: metadata.publishDate,
        modifiedTime: metadata.publishDate,
        authors: [metadata.author.name],
        tags: [metadata.category],
        section: metadata.category.charAt(0).toUpperCase() + metadata.category.slice(1),
        images: [
          {
            url: metadata.featuredImage,
            width: 1200,
            height: 630,
            alt: metadata.title,
            type: "image/jpeg",
          },
        ],
      },

      // 🐦 Twitter SEO
      twitter: {
        card: "summary_large_image",
        title: metadata.title,
        description: metadata.description,
        images: [metadata.featuredImage],
        creator: `@${metadata.author.name.toLowerCase().replace(/\s+/g, '')}`,
        site: "@brandbasecapsule",
      },

      // 📱 WhatsApp/Telegram Specific Meta Tags
      other: {
        // WhatsApp Link Preview
        "og:image:secure_url": metadata.featuredImage,
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:alt": metadata.title,
        "og:image:type": "image/jpeg",
        
        // Article Specific
        "article:published_time": metadata.publishDate,
        "article:modified_time": metadata.publishDate,
        "article:author": metadata.author.name,
        "article:section": metadata.category,
        "article:tag": metadata.category,
        
        // Reading Time
        "twitter:label1": "Written by",
        "twitter:data1": metadata.author.name,
        "twitter:label2": "Est. reading time",
        "twitter:data2": metadata.readTime,
        
        // Location/Contact
        "business:hours": "Always Available",
        "business:timezone": "IST (GMT+5:30)",
      },

      // 🌐 Browser Settings
      referrer: "origin-when-cross-origin",
      viewport: 
        "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",

      // 📌 Icons
      icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.png",
        apple: "/apple-touch-icon.png",
      },

      // 🏷️ Category
      category: "Blog",
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | Brandbase Capsule',
      description: 'Read our latest blog post on Brandbase Capsule.',
    };
  }
}

/**
 * JSON-LD STRUCTURED DATA (SEO Optimized)
 */
function generateJsonLd(blogData) {
  const { metadata, sections } = blogData;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.brandbasecapsule.com';
  const blogUrl = `${siteUrl}/blog/${metadata.category}/${metadata.slug}`;
  
  // Extract read time in minutes
  const readTimeMatch = metadata.readTime.match(/\d+/);
  const readTimeMinutes = readTimeMatch ? parseInt(readTimeMatch[0]) : 5;
  
  // Prepare article body content
  const articleBody = sections.map(section => 
    `<h2>${section.title}</h2>${section.content.join('<p>')}`
  ).join('');
  
  // Calculate word count
  const wordCount = sections.reduce((count, section) => {
    return count + section.content.join(' ').split(' ').length;
  }, 0) + metadata.description.split(' ').length;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${blogUrl}#blogpost`,
        "headline": metadata.title,
        "description": metadata.description,
        "image": metadata.featuredImage,
        "datePublished": metadata.publishDate,
        "dateModified": metadata.publishDate,
        "author": {
          "@type": "Person",
          "@id": `${siteUrl}/author/${metadata.author.name.toLowerCase().replace(/\s+/g, '-')}`,
          "name": metadata.author.name,
          "jobTitle": metadata.author.role,
          "image": metadata.author.image,
          "sameAs": [
            metadata.author.twitter !== "#" ? metadata.author.twitter : null,
            metadata.author.linkedin !== "#" ? metadata.author.linkedin : null
          ].filter(Boolean)
        },
        "publisher": {
          "@type": "Organization",
          "@id": `${siteUrl}#organization`,
          "name": "Brandbase Capsule",
          "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/logo.png`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": blogUrl
        },
        "url": blogUrl,
        "articleBody": articleBody,
        "wordCount": wordCount,
        "timeRequired": `PT${readTimeMinutes}M`,
        "articleSection": metadata.category.charAt(0).toUpperCase() + metadata.category.slice(1),
        "keywords": metadata.category,
        "inLanguage": "en-IN",
        "thumbnailUrl": metadata.featuredImage,
        "potentialAction": {
          "@type": "ReadAction",
          "target": [blogUrl]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${blogUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `${siteUrl}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": metadata.category.charAt(0).toUpperCase() + metadata.category.slice(1),
            "item": `${siteUrl}/blog/${metadata.category}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": metadata.title,
            "item": blogUrl
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        "url": siteUrl,
        "name": "Brandbase Capsule",
        "description": "Creative Digital Agency Specializing in Web Development, Branding & Digital Marketing",
        "publisher": {
          "@id": `${siteUrl}#organization`
        },
        "inLanguage": "en-IN"
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        "name": "Brandbase Capsule",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "sameAs": [
          "https://www.instagram.com/brandbasecapsule",
          "https://www.facebook.com/brandbasecapsule",
          "https://www.linkedin.com/company/brandbasecapsule",
          "https://twitter.com/brandbasecapsule",
          "https://wa.me/91XXXXXXXXXX"
        ]
      },
      // FAQ Schema for AEO
      {
        "@type": "FAQPage",
        "@id": `${blogUrl}#faq`,
        "mainEntity": sections.slice(0, 5).map((section, index) => ({
          "@type": "Question",
          "name": section.title,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": section.content.join(' ')
          }
        }))
      },
      // How-To Schema for featured blog posts
      ...(metadata.isEditorPick ? [{
        "@type": "HowTo",
        "@id": `${blogUrl}#howto`,
        "name": `How to: ${metadata.title}`,
        "description": metadata.description,
        "step": sections.map((section, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "name": section.title,
          "text": section.content.join(' '),
          "image": metadata.featuredImage
        }))
      }] : [])
    ]
  };
}

/**
 * 🔵 PAGE COMPONENT
 */
export default async function BlogPage({ params }) {
  try {
    // Await the params object
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    
    // IMPORTANT: Use cache: 'no-store' to get fresh data on every request
    const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, {
      cache: 'no-store', // This ensures fresh data from DB
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`API Error: ${response.status}`);
      notFound();
    }
    
    const result = await response.json();
    const blogData = result.data;
    
    if (!blogData) {
      notFound();
    }

    // Generate JSON-LD
    const jsonLd = generateJsonLd(blogData);
    const { metadata } = blogData;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.brandbasecapsule.com';

    return (
      <>
        {/* Inject JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Additional Schema for Social Sharing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": metadata.title,
              "description": metadata.description,
              "image": metadata.featuredImage,
              "datePublished": metadata.publishDate,
              "dateModified": metadata.publishDate,
              "author": {
                "@type": "Person",
                "name": metadata.author.name,
                "url": `${siteUrl}/author/${metadata.author.name.toLowerCase().replace(/\s+/g, '-')}`
              },
              "publisher": {
                "@type": "Organization",
                "name": "Brandbase Capsule",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${siteUrl}/logo.png`
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${siteUrl}/blog/${metadata.category}/${metadata.slug}`
              }
            })
          }}
        />
        
        {/* Additional Breadcrumb for Rich Snippets */}
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
                  "item": siteUrl
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": `${siteUrl}/blog`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": metadata.category.charAt(0).toUpperCase() + metadata.category.slice(1),
                  "item": `${siteUrl}/blog/${metadata.category}`
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": metadata.title,
                  "item": `${siteUrl}/blog/${metadata.category}/${metadata.slug}`
                }
              ]
            })
          }}
        />
        
        {/* Pass the blog data as props to the BlogDetailPage component */}
        <BlogDetailPage blogData={blogData} />
      </>
    );
  } catch (error) {
    console.error('Error fetching blog data:', error);
    notFound();
  }
}