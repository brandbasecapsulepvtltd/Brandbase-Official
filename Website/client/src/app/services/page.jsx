import ServicesPageContent from '@/components/Services/ServicesPageContent';
import { apiCall } from '@/lib/api';
import { buildServicesListingJsonLd, buildServicesListingMetadata } from '@/lib/corePagesSeo';
import { resolveServicesList } from '@/lib/serviceDefaults';

export const metadata = buildServicesListingMetadata();
export const revalidate = 10;

async function getServiceCategories() {
  try {
    const response = await apiCall('/service-categories?active=true', {
      cache: 'no-store',
      silent: true,
    });
    return response?.data || [];
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const categories = await getServiceCategories();
  const services = resolveServicesList(categories);
  const jsonLd = buildServicesListingJsonLd(services);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPageContent services={services} />
    </>
  );
}
