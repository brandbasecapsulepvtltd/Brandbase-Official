import AboutUsContent from '@/pages/AboutUsContent';
import { apiCall } from '@/lib/api';
import { buildAboutJsonLd, buildAboutMetadata } from '@/lib/siteConfig';

export const revalidate = 10;

export const metadata = buildAboutMetadata();

async function getAboutPageData() {
  try {
    const response = await apiCall('/about-section', {
      revalidate: 10,
      silent: true,
    });
    return response?.data || null;
  } catch {
    return null;
  }
}

export default async function About() {
  const pageData = await getAboutPageData();
  const jsonLd = buildAboutJsonLd(pageData || {});

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutUsContent initialData={pageData} />
    </>
  );
}
