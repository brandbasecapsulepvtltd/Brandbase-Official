import { notFound } from 'next/navigation';
import ServicesDetail from '@/pages/ServicesDetail';
import { api } from '@/lib/api';
import {
  buildServiceDetailJsonLd,
  buildServiceDetailMetadata,
} from '@/lib/corePagesSeo';

export async function generateStaticParams() {
  try {
    const response = await api.getServices();
    const services = response.data || [];
    return services.map((service) => ({
      category: service.category,
      slug: service.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;

  try {
    const response = await api.getServiceByCategorySlug(category, slug);
    const rawData = response.data;
    const serviceWrapper = Array.isArray(rawData) ? rawData[0] : rawData;
    const service = serviceWrapper?.data;
    return buildServiceDetailMetadata(category, slug, service);
  } catch {
    return buildServiceDetailMetadata(category, slug, null);
  }
}

async function fetchService(category, slug) {
  const response = await api.getServiceByCategorySlug(category, slug);
  const rawData = response.data;
  const serviceWrapper = Array.isArray(rawData) ? rawData[0] : rawData;
  return serviceWrapper?.data || null;
}

export default async function ServiceDetailPage({ params }) {
  const { category, slug } = await params;

  let service;
  try {
    service = await fetchService(category, slug);
  } catch {
    service = null;
  }

  if (!service) {
    notFound();
  }

  const jsonLd = buildServiceDetailJsonLd(category, slug, service);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ServicesDetail data={service} category={category} slug={slug} />
    </>
  );
}
