import React from 'react'
import { notFound } from 'next/navigation'
// import { portfolioData } from '@/Data/portfolioData' // REMOVE
import PortfolioDetailContent from '@/components/Portfolio/PorfolioDetail/PortfolioDetailContent'

// Helper function to fetch data
async function getPortfolio(slug) {
  try {
    const res = await fetch(`https://brandbase.onrender.com/api/portfolios/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '8c36f75937af6c0777eeda50d0a0ca4ab90e8ddc4b518c9dbe51a59f064392de'
      },
      next: { revalidate: 10 } // ISR
    });

    if (!res.ok) {
      console.error('Fetch failed for slug:', slug, 'Status:', res.status); // Log error
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch portfolio:', error);
    return null;
  }
}

// 2. Generate Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params
  const portfolioItem = await getPortfolio(slug)

  if (!portfolioItem) {
    return {
      title: 'Portfolio Not Found | BrandBase Capsule',
      description: 'The requested portfolio page could not be found.'
    }
  }

  const { metadata, hero } = portfolioItem;

  return {
    title: metadata?.title || `${hero?.title} | BrandBase Capsule Portfolio`,
    description: metadata?.description || hero?.description,
    keywords: metadata?.keywords || [],
    openGraph: {
      title: metadata?.title || hero?.title,
      description: metadata?.description || hero?.description,
      url: `https://www.brandbasecapsule.com/portfolio/${slug}`,
      siteName: 'BrandBase Capsule Portfolio',
      images: hero?.images && hero.images.length > 0 ? [
        {
          url: hero.images[0],
          width: 1200,
          height: 630,
          alt: hero.title
        }
      ] : [],
      type: 'website',
    },
  }
}

// 3. Main Page Component
export default async function PortfolioDetailPage({ params }) {
  const { slug } = await params

  const portfolioItem = await getPortfolio(slug)

  // Handle 404
  if (!portfolioItem) {
    notFound()
  }

  // Pass directly as schema matches frontend props
  return (
    <>
      <PortfolioDetailContent portfolioItem={portfolioItem} />
    </>
  )
}