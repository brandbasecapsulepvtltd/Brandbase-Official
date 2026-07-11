import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import EventDetailContent from "@/components/ExhibitionCal/EventDetailContent";
import {
  buildEventDetailMetadata,
  buildEventDetailJsonLd,
} from "@/lib/siteConfig";

export const revalidate = 10;

async function getEvent(slug) {
  try {
    const response = await api.getEvent(slug, { revalidate: 10 });
    if (!response?.success) return null;
    return response.data;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const response = await api.getEvents({ revalidate: 10 });
    return (response.data || []).map((event) => ({
      slug: event.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  return buildEventDetailMetadata(event, slug);
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const asOfDate = new Date().toISOString();
  const jsonLd = buildEventDetailJsonLd(event, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventDetailContent event={event} asOfDate={asOfDate} />
    </>
  );
}
