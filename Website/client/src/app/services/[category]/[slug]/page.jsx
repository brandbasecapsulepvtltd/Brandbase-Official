// app/services/[category]/[slug]/page.js
import { notFound } from 'next/navigation';
import ServicesDetail from '@/pages/ServicesDetail'; // Make sure this is the correct path
import { getServiceData } from '@/Data/masterData';

// Generate static params for SSG
export async function generateStaticParams() {
  const { servicesData } = await import('@/Data/masterData');
  
  return servicesData.map((service) => ({
    category: service.category,
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  
  const { servicesData } = await import('@/Data/masterData');
  
  const service = servicesData.find(
    s => s.category === category && s.slug === slug
  );
  
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.'
    };
  }
  
  return {
    title: `${service.data.hero.headline} | ${category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
    description: service.data.hero.subHeadline,
    openGraph: {
      title: service.data.hero.headline,
      description: service.data.hero.subHeadline,
      type: 'website',
      url: `/services/${category}/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: service.data.hero.headline,
      description: service.data.hero.subHeadline,
    }
  };
}

export default async function ServiceDetailPage({ params }) {
  const { category, slug } = await params;
  
  const serviceData = getServiceData(category, slug);
  
  console.log("Page Component - Data being passed:", {
    category,
    slug,
    headline: serviceData?.hero?.headline,
    hasData: !!serviceData
  });
  
  if (!serviceData) {
    notFound();
  }
  
  return <ServicesDetail data={serviceData} />;
}