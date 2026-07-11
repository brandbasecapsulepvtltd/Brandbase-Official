import TermsAndConditions from '@/pages/TermsAndConditions';
import LegalPolicyShell, { LegalPolicyEmpty } from '@/components/Legal/LegalPolicyShell';
import { api } from '@/lib/api';
import { enrichPolicyData, TERMS_PAGE } from '@/lib/legalPageData';
import { buildLegalPageJsonLd, buildLegalPageMetadata } from '@/lib/siteConfig';

export const metadata = buildLegalPageMetadata(TERMS_PAGE);

export default async function TermsAndConditionsPage() {
  let policyData = null;

  try {
    const response = await api.getPolicy(TERMS_PAGE.apiType);
    if (response.success) {
      policyData = enrichPolicyData(response.data);
    }
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);
  }

  if (!policyData) {
    return <LegalPolicyEmpty pageConfig={TERMS_PAGE} />;
  }

  const jsonLd = buildLegalPageJsonLd(TERMS_PAGE, policyData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TermsAndConditions data={policyData} pageConfig={TERMS_PAGE} />
    </>
  );
}
