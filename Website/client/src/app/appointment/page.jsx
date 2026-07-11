import AppointmentContent from '@/components/Appointment/AppointmentContent';
import { buildAppointmentPageJsonLd, buildAppointmentPageMetadata } from '@/lib/corePagesSeo';

export const metadata = buildAppointmentPageMetadata();

export default function AppointmentPage() {
  const jsonLd = buildAppointmentPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppointmentContent />
    </>
  );
}
