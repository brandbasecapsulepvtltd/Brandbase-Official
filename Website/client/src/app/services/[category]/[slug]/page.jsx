import { notFound } from 'next/navigation';
import ServicesDetail from '@/pages/ServicesDetail';
import { api } from '@/lib/api';

// 1. Keep generateStaticParams (This makes the page Static)
export async function generateStaticParams() {
  try {
    // Use the API client
    const servicesData = await api.getServices();
    const services = servicesData.data || [];
    
    return services.map((service) => ({
      category: service.category,
      slug: service.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// 2. Generate Metadata
export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  
  try {
    // Fetch service data
    const serviceData = await api.getService(`${category}/${slug}`);
    
    if (!serviceData.success || !serviceData.data) {
      return { 
        title: 'Service Not Found',
        description: 'The requested service could not be found.' 
      };
    }
    
    const service = serviceData.data;
    
    // Format category for title (e.g., "web-development" → "Web Development")
    const formattedCategory = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      title: `${service.title} | ${formattedCategory} | BrandBase`,
      description: service.description || service.subHeadline || `${service.title} services from BrandBase`,
      keywords: service.keywords || [category, service.title, 'services'].join(', '),
      openGraph: {
        title: service.title,
        description: service.description || service.subHeadline || '',
        type: 'website',
        url: `/services/${category}/${slug}`,
        images: service.image ? [{ url: service.image }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: service.title,
        description: service.description || service.subHeadline || '',
        images: service.image ? [service.image] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Service Details | BrandBase',
      description: 'View detailed information about our services'
    };
  }
}

// 3. Main Page Component
export default async function ServiceDetailPage({ params }) {
  const { category, slug } = await params;
  
  try {
    // Fetch service data using API client
    const response = await api.getService(`${category}/${slug}`);
    
    if (!response.success) {
      console.error('API Error:', response.message);
      notFound();
    }
    
    const service = response.data;
    
    if (!service) {
      notFound();
    }
    
    return <ServicesDetail data={service} category={category} slug={slug} />;
  } catch (error) {
    console.error('Error fetching service data:', error);
    notFound();
  }
}