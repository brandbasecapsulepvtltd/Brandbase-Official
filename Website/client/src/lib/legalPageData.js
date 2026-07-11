import { CONTACT, CONTACT_FORM_PROMPT, SHOW_PUBLIC_ADDRESS, SHOW_PUBLIC_PHONE } from '@/lib/contactConstants';
import { ORG, SITE_URL } from '@/lib/siteConfig';

export const PRIVACY_PAGE = {
  slug: 'privacy-policy',
  apiType: 'privacy-policy',
  breadcrumbLabel: 'Privacy Policy',
  badge: 'Data Protection Policy',
  heroTitle: 'Our Commitment to Your Privacy',
  heroSubtitle: 'Transparent practices for trusted partnerships',
  relatedPage: { label: 'Terms & Conditions', href: '/terms' },
  seo: {
    title: 'Privacy Policy | BrandBase Capsule — Data Protection & Security',
    description:
      'Learn how BrandBase Capsule collects, uses, and protects your personal data. Our privacy policy covers cookies, your rights, and how to contact us.',
    keywords: [
      'privacy policy',
      'data protection',
      'BrandBase Capsule privacy',
      'GDPR India',
      'cookie policy',
    ],
    canonicalPath: '/privacy-policy',
  },
};

export const TERMS_PAGE = {
  slug: 'terms',
  apiType: 'terms-and-conditions',
  breadcrumbLabel: 'Terms & Conditions',
  badge: 'Legal Agreement',
  heroTitle: 'Terms & Conditions',
  heroTitleAccent: 'Conditions',
  heroSubtitle: 'Governing your use of our digital services and platform',
  relatedPage: { label: 'Privacy Policy', href: '/privacy-policy' },
  seo: {
    title: 'Terms & Conditions | BrandBase Capsule — Legal Agreement',
    description:
      'Read the Terms & Conditions for using BrandBase Capsule services and website. Legal agreement, service usage, and contact information.',
    keywords: [
      'terms and conditions',
      'terms of service',
      'BrandBase Capsule legal',
      'service agreement India',
    ],
    canonicalPath: '/terms',
  },
};

/** Normalize CMS contact blocks to current org details */
export function enrichPolicyData(data) {
  if (!data) return null;

  return {
    ...data,
    sections: (data.sections || []).map((section) => ({
      ...section,
      content: (section.content || []).map((block) => {
        if (block.type !== 'contact') return block;

        const details = block.contactDetails || {};
        return {
          ...block,
          contactDetails: {
            ...details,
            company: ORG.legalName,
            tagline: details.tagline || 'Event, Exhibition & Digital Agency',
            email: details.email || ORG.email,
            privacyEmail: details.privacyEmail || ORG.email,
            phone: SHOW_PUBLIC_PHONE ? CONTACT.phoneMasked : CONTACT_FORM_PROMPT,
            website: SITE_URL,
            address: SHOW_PUBLIC_ADDRESS ? CONTACT.address.full : CONTACT_FORM_PROMPT,
          },
        };
      }),
    })),
  };
}
