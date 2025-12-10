import { notFound } from 'next/navigation';
import ServicesDetail from '@/pages/ServicesDetail';

{/*
process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_API_URL 
  :  
*/}

const API_URL = 'https://brandbase.onrender.com/api';

// Generate static params for SSG - Fetch from API
export async function generateStaticParams() {
  try {
    const response = await fetch(`${API_URL}/services/all`);
    const { data } = await response.json();
    
    const services = data || [];
    
    return services.map((service) => ({
      category: service.category,
      slug: service.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  
  try {
    const response = await fetch(`${API_URL}/services/${category}/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return {
        title: 'Service Not Found',
        description: 'The requested service could not be found.'
      };
    }
    
    const { data: service } = await response.json();
    
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Service',
      description: 'Service details'
    };
  }
}

export default async function ServiceDetailPage({ params }) {
  const { category, slug } = await params;
  
  try {
    const response = await fetch(`${API_URL}/services/${category}/${slug}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      notFound();
    }
    
    const { data: service } = await response.json();
    
    if (!service || !service.data) {
      console.error('Service data is null or undefined');
      notFound();
    }
    
    console.log("Page Component - Data fetched successfully:", {
      category,
      slug,
      headline: service.data.hero?.headline,
      hasData: !!service.data
    });
    
    return <ServicesDetail data={service.data} />;
  } catch (error) {
    console.error('Error fetching service data:', error);
    notFound();
  }
}