import HomePage from '@/pages/HomePage';
import { api } from '@/lib/api';
import { buildHomeJsonLd, buildHomeMetadata } from '@/lib/siteConfig';

export const revalidate = 10;

async function fetchHomepageData() {
  try {
    const response = await api.getHomepage();
    return response?.data || {};
  } catch {
    return {};
  }
}

async function fetchSliderBlogs() {
  try {
    const response = await api.getSliderBlogs();
    return response?.data || [];
  } catch {
    return [];
  }
}

export async function generateMetadata() {
  const fullData = await fetchHomepageData();
  return buildHomeMetadata(fullData.seoSettings || {});
}

export default async function Home() {
  const [fullData, sliderBlogs] = await Promise.all([
    fetchHomepageData(),
    fetchSliderBlogs(),
  ]);

  const jsonLd = buildHomeJsonLd(fullData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage initialData={fullData} sliderBlogs={sliderBlogs} />
    </>
  );
}
