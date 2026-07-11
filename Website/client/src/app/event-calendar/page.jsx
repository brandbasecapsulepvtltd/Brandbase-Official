import EventCalendarContent from "@/components/ExhibitionCal/EventCalendarContent";
import { api } from "@/lib/api";
import {
  buildEventCalendarMetadata,
  buildEventCalendarJsonLd,
} from "@/lib/siteConfig";
import { EVENT_CALENDAR_FAQS } from "@/lib/contactConstants";

export const metadata = buildEventCalendarMetadata();

export const revalidate = 10;

async function getEvents() {
  try {
    const response = await api.getEvents({ revalidate: 10 });
    return response?.success ? response.data || [] : [];
  } catch {
    return [];
  }
}

export default async function EventCalendarPage() {
  const events = await getEvents();
  const asOfDate = new Date().toISOString();
  const jsonLd = buildEventCalendarJsonLd(events, EVENT_CALENDAR_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventCalendarContent initialEvents={events} asOfDate={asOfDate} />
    </>
  );
}
