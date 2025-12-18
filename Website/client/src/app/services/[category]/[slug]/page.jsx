import { notFound } from 'next/navigation';
import ServicesDetail from '@/pages/ServicesDetail';
import { api } from '@/lib/api';

// Generate static params
export async function generateStaticParams() {
  try {
    const response = await api.getServices();
    const services = response.data || [];
    
    return services.map((service) => ({
      category: service.category,
      slug: service.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  
  try {
    const response = await api.getServiceByCategorySlug(category, slug);
    
    // Normalize data: handle both Array and Object responses
    const rawData = response.data;
    const serviceWrapper = Array.isArray(rawData) ? rawData[0] : rawData;
    const service = serviceWrapper?.data;
    
    if (!service || !service.hero) {
      return { title: 'Service Details | BrandBase' };
    }
    
    const formattedCategory = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      title: `${service.hero.headline} | ${formattedCategory}`,
      description: service.hero.subHeadline,
    };
  } catch (error) {
    return { title: 'Service Details | BrandBase' };
  }
}

// Main page component
export default async function ServiceDetailPage({ params }) {
  const { category, slug } = await params;
  
  try {
    const response = await api.getServiceByCategorySlug(category, slug);
    
    // 1. Identify if we have data at all
    const rawData = response.data;
    
    // 2. Normalize the data: If it's an array, take the first item. If not, use it directly.
    const serviceWrapper = Array.isArray(rawData) ? rawData[0] : rawData;

    console.log('Processed Service Data:', {
      found: !!serviceWrapper,
      hasNestedData: !!serviceWrapper?.data
    });

    // 3. Validation: Check if the "data" property exists inside the wrapper
    if (!serviceWrapper || !serviceWrapper.data) {
      console.error('Service data structure invalid or missing');
      notFound();
    }
    
    // Pass the nested data object to ServicesDetail
    return <ServicesDetail data={serviceWrapper.data} />;
    
  } catch (error) {
    console.error('Error fetching service data:', error);
    notFound();
  }
}