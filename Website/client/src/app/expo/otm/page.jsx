import ExhibitionContent from '@/pages/ExhibitionContent';
import { EXPO_OTM_PAGE } from '@/lib/expoPageData';
import { buildExpoPageMetadata, buildExpoPageJsonLd } from '@/lib/siteConfig';

export const metadata = buildExpoPageMetadata(EXPO_OTM_PAGE);

export default function ExpoOtmPage() {
  const jsonLd = buildExpoPageJsonLd(EXPO_OTM_PAGE);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExhibitionContent pageData={EXPO_OTM_PAGE} />
    </>
  );
}
