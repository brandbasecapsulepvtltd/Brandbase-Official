import ExhibitionContent from '@/pages/ExhibitionContent';
import { EXPO_GENERAL_PAGE } from '@/lib/expoPageData';
import { buildExpoPageMetadata, buildExpoPageJsonLd } from '@/lib/siteConfig';

export const metadata = buildExpoPageMetadata(EXPO_GENERAL_PAGE);

export default function ExpoPage() {
  const jsonLd = buildExpoPageJsonLd(EXPO_GENERAL_PAGE);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExhibitionContent pageData={EXPO_GENERAL_PAGE} />
    </>
  );
}
