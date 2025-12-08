import { notFound } from 'next/navigation';
import ServicesDetail from '@/pages/ServicesDetail';
import { servicesData, getServiceData } from '@/Data/masterData';

// Generate static params for SSG
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    category: service.category,
    slug: service.slug,
  }));
}

// Generate metadata for SEO - params is still a Promise here
export async function generateMetadata({ params }) {
  const { category, slug } = await params; // ✅ Add 'await' back!
  
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

// ✅ Corrected component - params is a Promise in Next.js 15
export default async function ServiceDetailPage({ params }) {
  const { category, slug } = await params; // ✅ MUST use 'await'
  
  // Get the specific service data
  const serviceData = getServiceData(category, slug);
  
  if (!serviceData) {
    notFound();
  }
  
  return <ServicesDetail data={serviceData} />;
}