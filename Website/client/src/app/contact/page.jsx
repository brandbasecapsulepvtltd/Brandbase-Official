import ContactPage from '@/components/Contact/ContactPage';
import { buildContactPageJsonLd, buildContactPageMetadata } from '@/lib/corePagesSeo';

export const metadata = buildContactPageMetadata();

export default function Contact() {
  const jsonLd = buildContactPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPage />
    </>
  );
}
