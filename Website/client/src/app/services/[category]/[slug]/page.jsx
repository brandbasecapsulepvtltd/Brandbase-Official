import { notFound } from 'next/navigation';
import ServicesDetail from '@/pages/ServicesDetail';

const API_URL = 'https://brandbase.onrender.com/api';

// 1. Keep generateStaticParams (This makes the page Static)
export async function generateStaticParams() {
  try {
    const response = await fetch(`${API_URL}/services/all`, { 
       // Optional: Cache this list for a while so build is faster
       next: { revalidate: 10 } 
    });
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
    // 2. FIX: Remove 'cache: no-store'. Use revalidate instead.
    const response = await fetch(`${API_URL}/services/${category}/${slug}`, {
      next: { revalidate: 10 } // Checks for updates every 1 hour
    });
    
    if (!response.ok) return { title: 'Service Not Found' };
    
    const { data: service } = await response.json();
    
    if (!service) return { title: 'Service Not Found' };
    
    return {
      title: `${service.data.hero.headline} | ${category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
      description: service.data.hero.subHeadline,
      openGraph: {
        title: service.data.hero.headline,
        description: service.data.hero.subHeadline,
        type: 'website',
        url: `/services/${category}/${slug}`,
      },
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
    // 3. FIX: Remove 'cache: no-store'. Use revalidate instead.
    const response = await fetch(`${API_URL}/services/${category}/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 10 } // Checks for updates every 1 hour
    });
    
    if (!response.ok) {
      console.error(`API Error: ${response.status}`);
      notFound();
    }
    
    const { data: service } = await response.json();
    
    if (!service || !service.data) {
      notFound();
    }
    
    return <ServicesDetail data={service.data} />;
  } catch (error) {
    console.error('Error fetching service data:', error);
    notFound();
  }
}