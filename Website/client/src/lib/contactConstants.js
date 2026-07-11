/** Shared contact details used across Contact page, SEO, and schema */
export const CONTACT = {
  phone: '+91 7045390416',
  phoneMasked: '+91 ****** 0416',
  phoneTel: '+917045390416',
  email: 'info@brandbasecapsule.com',
  whatsapp: '917045390416',
  whatsappUrl: 'https://wa.me/917045390416',
  hours: 'Monday – Saturday: 10:30 AM – 7:30 PM IST',
  address: {
    street: 'Brandbase Capsule Pvt. Ltd, R-34A, Office No. 34, NESCO IT Park, Goregaon East',
    locality: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400063',
    country: 'IN',
    full: 'Brandbase Capsule Pvt. Ltd, R-34A, Office No. 34, NESCO IT Park, Goregaon East, Mumbai, Maharashtra 400063',
    footerDisplay:
      'Brandbase Capsule Pvt. Ltd, R-34A, Office No. 34,\nNESCO IT Park, Goregaon East,\nMumbai, Maharashtra 400063',
  },
  geo: {
    latitude: '19.1463',
    longitude: '72.8529',
  },
};

/** Public UI: hide phone & address — visitors use the contact form */
export const SHOW_PUBLIC_PHONE = false;
export const SHOW_PUBLIC_ADDRESS = false;
export const CONTACT_FORM_PROMPT =
  'Please use our contact form — we respond within 24 hours.';

export const CONTACT_FAQS = [
  {
    question: 'How can I contact Brandbase Capsule?',
    answer: `Email ${CONTACT.email}, message us on WhatsApp, or use the contact form on this page. We typically respond within 24 hours.`,
  },
  {
    question: 'What are your working hours?',
    answer: `${CONTACT.hours}. Emergency support for existing clients is available via WhatsApp.`,
  },
  {
    question: 'Where is Brandbase Capsule located?',
    answer: `We are based in Mumbai, India, and serve clients across India and internationally with partners in the USA, UK, Europe, Saudi Arabia, and Singapore. Use our contact form for office enquiries.`,
  },
  {
    question: 'Do you offer free consultations?',
    answer: 'Yes — we offer a free initial consultation to understand your project requirements. Book a slot via our appointment page or the contact form.',
  },
];

export const EVENT_CALENDAR_FAQS = [
  {
    question: 'What are the major upcoming exhibitions in Mumbai?',
    answer:
      'Major exhibitions in Mumbai include events at NESCO (Bombay Exhibition Centre) and Jio World Centre — covering pharma, automation, textiles, and more. Use our filters to browse by city and industry.',
  },
  {
    question: 'How do I book a stall designer for an upcoming expo?',
    answer: `Shortlist the exhibition you want to participate in, then reach out via our contact page or book a free consultation via our appointment page — ideally 3–4 weeks before the event for custom 3D design and fabrication.`,
  },
  {
    question: 'Do you list exhibitions in Delhi and Bangalore?',
    answer:
      'Yes — our calendar covers major trade shows across India, including Pragati Maidan (Delhi), BIEC (Bangalore), and venues in Hyderabad, Chennai, and other metros.',
  },
  {
    question: 'Can BrandBase help with stall design for any listed event?',
    answer:
      'We provide end-to-end stall design, fabrication, branding, and on-site management for exhibitions listed here and custom events. Reach out with your event name and booth requirements for a tailored quote.',
  },
];

export const APPOINTMENT_FAQS = [
  {
    question: 'How do I book an appointment with Brandbase Capsule?',
    answer: `Choose a date and time using the form on this page, or WhatsApp us anytime. For phone enquiries, visit our contact page. We confirm your slot within 24 hours.`,
  },
  {
    question: 'Is the initial consultation free?',
    answer: 'Yes — the first 30-minute discovery call is complimentary. We discuss your goals, timeline, and how we can help with exhibitions, digital, or branding projects.',
  },
  {
    question: 'What should I prepare for the call?',
    answer: 'Have your project brief, goals, target audience, budget range, and timeline ready. References, existing assets, or competitor examples are helpful too.',
  },
  {
    question: 'Can I reschedule my appointment?',
    answer: `Yes — contact us at ${CONTACT.email} or via WhatsApp at least 24 hours before your slot and we'll arrange a new time.`,
  },
  {
    question: 'Do you offer virtual meetings?',
    answer: 'Yes — we offer in-person meetings at our Mumbai office and virtual sessions via Google Meet, Zoom, or Microsoft Teams.',
  },
];
