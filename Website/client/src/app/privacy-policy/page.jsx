import PrivacyPolicy from '@/pages/PrivacyPolicy';
import LegalPolicyShell, { LegalPolicyEmpty } from '@/components/Legal/LegalPolicyShell';
import { api } from '@/lib/api';
import { enrichPolicyData, PRIVACY_PAGE } from '@/lib/legalPageData';
import { buildLegalPageJsonLd, buildLegalPageMetadata } from '@/lib/siteConfig';

export const metadata = buildLegalPageMetadata(PRIVACY_PAGE);

export default async function PrivacyPolicyPage() {
  let policyData = null;

  try {
    const response = await api.getPolicy(PRIVACY_PAGE.apiType);
    if (response.success) {
      policyData = enrichPolicyData(response.data);
    }
  } catch (error) {
    console.error('Error fetching privacy policy:', error);
  }

  if (!policyData) {
    return <LegalPolicyEmpty pageConfig={PRIVACY_PAGE} />;
  }

  const jsonLd = buildLegalPageJsonLd(PRIVACY_PAGE, policyData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PrivacyPolicy data={policyData} pageConfig={PRIVACY_PAGE} />
    </>
  );
}
