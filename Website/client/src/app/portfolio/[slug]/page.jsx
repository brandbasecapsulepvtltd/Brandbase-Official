import React from 'react'
import { notFound } from 'next/navigation'
import { portfolioData } from '@/Data/portfolioData'
// Import the presentation component
import PortfolioDetailContent from '@/components/Portfolio/PorfolioDetail/PortfolioDetailContent'

// Helper function to get portfolio data by slug
const getPortfolioDataBySlug = (slug) => {
  return portfolioData[Object.keys(portfolioData).find(key => 
    portfolioData[key].slug === slug
  )]
}

// 1. Generate Static Params (for Static Site Generation)
export async function generateStaticParams() {
  return Object.values(portfolioData).map((item) => ({
    slug: item.slug,
  }))
}

// 2. Generate Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params
  const portfolioItem = getPortfolioDataBySlug(slug)

  if (!portfolioItem) {
    return {
      title: 'Portfolio Not Found | BrandBase Capsule',
      description: 'The requested portfolio page could not be found.'
    }
  }

  const { metadata } = portfolioItem
  
  return {
    title: metadata?.title || `${portfolioItem.hero.title} | BrandBase Capsule`,
    description: metadata?.description || portfolioItem.hero.description,
    keywords: metadata?.keywords || [],
    openGraph: {
      title: metadata?.title || portfolioItem.hero.title,
      description: metadata?.description || portfolioItem.hero.description,
      url: `https://www.brandbasecapsule.com/portfolio/${slug}`,
      siteName: 'BrandBase Capsule Portfolio',
      images: portfolioItem.hero.images.slice(0, 3).map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: portfolioItem.hero.title
      })),
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata?.title || portfolioItem.hero.title,
      description: metadata?.description || portfolioItem.hero.description,
      images: [portfolioItem.hero.images[0]],
    },
    alternates: {
      canonical: `https://www.brandbasecapsule.com/portfolio/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  }
}

// 3. Main Page Component
export default async function PortfolioDetailPage({ params }) {
  // FIX: Await params here to solve the "Invalid source map" / "Promise" error
  const { slug } = await params
  
  const portfolioItem = getPortfolioDataBySlug(slug)

  // Handle 404
  if (!portfolioItem) {
    notFound()
  }

  const { hero, bento } = portfolioItem

  // Construct JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": hero.title,
    "description": hero.description,
    "provider": {
      "@type": "Organization",
      "name": "BrandBase Capsule",
      "url": "https://www.brandbasecapsule.com",
      "logo": "https://www.brandbasecapsule.com/logo.png",
      "sameAs": [
        "https://www.instagram.com/brandbasecapsule",
        "https://www.linkedin.com/company/brandbasecapsule",
        "https://twitter.com/brandbasecapsule"
      ]
    },
    "serviceType": bento.mainHeading,
    "areaServed": {
      "@type": "Country",
      "name": "Global"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services Included",
      "itemListElement": bento.services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        },
        "position": index + 1
      }))
    }
  }

  const breadcrumbLd = {
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
        "name": "Portfolio",
        "item": "https://www.brandbasecapsule.com/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": hero.title,
        "item": `https://www.brandbasecapsule.com/portfolio/${slug}`
      }
    ]
  }

  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Render the content component and pass the data */}
      <PortfolioDetailContent portfolioItem={portfolioItem} />
    </>
  )
}