const mongoose = require('mongoose');
const Event = require('../models/Event');

const masterData = [
  {
    id: '1',
    name: 'India Tech Summit 2026',
    slug: 'india-tech-summit-2026',
    seoTitle: 'India Tech Summit 2026 | New Delhi Technology Expo & Conference',
    seoDescription: 'Join the premier technology exhibition in India. Network with 500+ tech leaders, explore AI & Cloud innovations, and attend keynote sessions at India Tech Summit 2026.',
    seoKeywords: ['Tech Summit 2026', 'Technology Exhibition Delhi', 'AI Conference India', 'Cloud Computing Expo', 'IoT Innovation Showcase'],
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "India Tech Summit 2026",
      "startDate": "2026-01-15",
      "endDate": "2026-01-17",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Pragati Maidan",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mathura Road",
          "addressLocality": "New Delhi",
          "postalCode": "110001",
          "addressCountry": "IN"
        }
      },
      "image": [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
      ],
      "description": "The premier technology exhibition in India featuring AI, Cloud, and IoT innovations.",
      "organizer": {
        "@type": "Organization",
        "name": "NASSCOM",
        "url": "https://nasscom.in"
      }
    }),
    startDate: new Date(2026, 0, 15),
    endDate: new Date(2026, 0, 17),
    venue: 'Pragati Maidan',
    city: 'Delhi',
    organizer: 'NASSCOM',
    organizerWebsite: 'https://nasscom.in',
    industry: 'tech',
    isIndoor: true,
    expectedFootfall: 50000,
    stallSizes: ['3x3', '6x3', '6x6', '9x6'],
    description: 'The premier technology exhibition in India featuring AI, Cloud, and IoT innovations.',
    whyParticipate: 'Connect with 500+ tech leaders, showcase your innovations to 50,000+ visitors, and generate high-quality B2B leads.',
    status: 'published',
    portfolioItems: [
      {
        id: 'p1',
        eventId: '1',
        eventName: 'India Tech Summit 2024',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
        stallSize: '6x6',
        industry: 'tech',
        clientTestimonial: 'Exceptional design that perfectly represented our brand. We received 3x more leads than the previous year!',
        clientName: 'Rajesh Kumar',
        clientCompany: 'TechVision India',
      }
    ],
    similarEvents: ['2', '4', '6']
  },
  {
    id: '2',
    name: 'Pharma Expo India 2026',
    slug: 'pharma-expo-india-2026',
    seoTitle: 'Pharma Expo India 2026 | Pharmaceutical Exhibition Mumbai',
    seoDescription: 'Discover the latest in pharmaceutical machinery, lab equipment, and packaging at Pharma Expo India 2026. The leading healthcare trade show in Mumbai.',
    seoKeywords: ['Pharma Expo India', 'Pharmaceutical Exhibition Mumbai', 'Pharma Machinery Expo', 'Healthcare Trade Show', 'Lab Equipment Expo'],
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Pharma Expo India 2026",
      "startDate": "2026-01-20",
      "endDate": "2026-01-22",
      "location": {
        "@type": "Place",
        "name": "Bombay Exhibition Centre",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mumbai",
          "addressCountry": "IN"
        }
      },
      "description": "India's largest pharmaceutical and healthcare exhibition.",
      "organizer": {
        "@type": "Organization",
        "name": "IDMA",
        "url": "https://idma-assn.org"
      }
    }),
    startDate: new Date(2026, 0, 20),
    endDate: new Date(2026, 0, 22),
    venue: 'Bombay Exhibition Centre',
    city: 'Mumbai',
    organizer: 'IDMA',
    organizerWebsite: 'https://idma-assn.org',
    industry: 'pharma',
    isIndoor: true,
    expectedFootfall: 35000,
    stallSizes: ['3x3', '6x3', '6x6'],
    description: 'India\'s largest pharmaceutical and healthcare exhibition.',
    whyParticipate: 'Meet key decision makers from top pharma companies and expand your market presence.',
    status: 'published',
    portfolioItems: [
      {
        id: 'p2',
        eventId: '2',
        eventName: 'Pharma Expo 2024',
        imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop',
        stallSize: '9x6',
        industry: 'pharma',
        clientTestimonial: 'The stall design was clean, professional, and aligned with pharmaceutical industry standards.',
        clientName: 'Dr. Priya Sharma',
        clientCompany: 'MedLife Pharmaceuticals',
      }
    ],
    faqs: [
      {
        question: "What are the exhibition timings?",
        answer: "The exhibition is open from 10:00 AM to 6:00 PM on all three days."
      },
      {
        question: "Is there parking available?",
        answer: "Yes, ample parking space is available at the Bombay Exhibition Centre for visitors and exhibitors."
      },
      {
        question: "How can I register as a visitor?",
        answer: "Visitor registration can be done online through our website or at the registration counters at the venue."
      }
    ],
    sections: [
      {
        id: 'section-1',
        title: 'Why Attend Pharma Expo India 2026?',
        content: [
          'Pharma Expo India is the leading pharmaceutical exhibition in the country, bringing together the brightest minds and most innovative companies in the pharmaceutical and healthcare sectors.',
          'This year\'s expo promises to be bigger and better, featuring cutting-edge machinery, advanced lab equipment, and the latest packaging solutions. Whether you\'re a manufacturer, distributor, or healthcare professional, this event offers unparalleled networking and business opportunities.'
        ],
        listItems: [],
        media: []
      },
      {
        id: 'section-2',
        title: 'Key Highlights of the Exhibition',
        content: [
          'The exhibition floor will showcase over 300 exhibitors from across the globe, presenting the latest innovations in pharmaceutical technology.'
        ],
        listItems: [
          'Advanced pharmaceutical machinery and equipment',
          'Laboratory automation solutions',
          'Innovative packaging technologies',
          'Quality control and testing equipment',
          'Regulatory compliance solutions'
        ],
        media: [{
          type: 'image',
          url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
          caption: 'Modern pharmaceutical manufacturing facility'
        }]
      },
      {
        id: 'section-3',
        title: 'Networking and Business Opportunities',
        content: [
          'Connect with industry leaders, potential partners, and clients from around the world. The expo features dedicated networking zones, business matching services, and expert-led panel discussions.',
          'Don\'t miss the opportunity to expand your professional network and explore new business ventures in the rapidly growing pharmaceutical sector.'
        ],
        listItems: [],
        media: []
      }
    ],
    similarEvents: ['1', '7', '8']
  },
  {
    id: '3',
    name: 'Auto Expo 2026',
    slug: 'auto-expo-2026',
    seoTitle: 'Auto Expo 2026 | New Delhi Automotive Show',
    seoDescription: 'Experience the future of mobility at Auto Expo 2026. See concept cars, electric vehicles, and automotive technology at India Expo Mart.',
    seoKeywords: ['Auto Expo 2026', 'Car Show Delhi', 'Automotive Exhibition India', 'EV Expo', 'Concept Cars'],
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Auto Expo 2026",
      "startDate": "2026-01-25",
      "endDate": "2026-01-28",
      "location": {
        "@type": "Place",
        "name": "India Expo Mart",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Greater Noida",
          "addressCountry": "IN"
        }
      },
      "description": "The biennial automotive exhibition showcasing latest vehicles and technology.",
      "organizer": {
        "@type": "Organization",
        "name": "SIAM",
        "url": "https://siam.in"
      }
    }),
    startDate: new Date(2026, 0, 25),
    endDate: new Date(2026, 0, 28),
    venue: 'India Expo Mart',
    city: 'Delhi',
    organizer: 'SIAM',
    organizerWebsite: 'https://siam.in',
    industry: 'auto',
    isIndoor: false,
    expectedFootfall: 100000,
    stallSizes: ['9x6', '12x9', '18x12', 'Custom'],
    description: 'The biennial automotive exhibition showcasing latest vehicles and technology.',
    whyParticipate: 'Showcase to 100,000+ automotive enthusiasts and industry professionals.',
    status: 'published',
    portfolioItems: [
      {
        id: 'p3',
        eventId: '3',
        eventName: 'Auto Expo 2024',
        imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
        stallSize: '12x9',
        industry: 'auto',
        clientTestimonial: 'Our automotive display stall was the talk of the show. Fantastic execution!',
        clientName: 'Amit Patel',
        clientCompany: 'AutoTech Solutions',
      }
    ],
    similarEvents: ['6', '4', '8']
  },
  {
    id: '4',
    name: 'Food & Hospitality Expo 2026',
    slug: 'food-hospitality-expo-2026',
    seoTitle: 'Food & Hospitality Expo 2026 | Bangalore F&B Event',
    seoDescription: 'The biggest food service and hospitality event in Bangalore. Meet top suppliers, chefs, and industry experts at Food & Hospitality Expo 2026.',
    seoKeywords: ['Food Expo Bangalore', 'Hospitality Exhibition India', 'F&B Trade Show', 'Culinary Event', 'Restaurant Supplies Expo'],
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Food & Hospitality Expo 2026",
      "startDate": "2026-02-05",
      "endDate": "2026-02-07",
      "location": {
        "@type": "Place",
        "name": "BIEC",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bangalore",
          "addressCountry": "IN"
        }
      },
      "description": "The complete food service and hospitality trade show.",
      "organizer": {
        "@type": "Organization",
        "name": "FHRAI",
        "url": "https://fhrai.com"
      }
    }),
    startDate: new Date(2026, 1, 5),
    endDate: new Date(2026, 1, 7),
    venue: 'BIEC',
    city: 'Bangalore',
    organizer: 'FHRAI',
    organizerWebsite: 'https://fhrai.com',
    industry: 'food',
    isIndoor: true,
    expectedFootfall: 25000,
    stallSizes: ['3x3', '6x3', '6x6'],
    description: 'The complete food service and hospitality trade show.',
    whyParticipate: 'Network with hoteliers, restaurateurs, and F&B industry leaders.',
    status: 'published',
    portfolioItems: [],
    similarEvents: ['1', '5', '8']
  },
  {
    id: '5',
    name: 'Fashion Forward India 2026',
    slug: 'fashion-forward-india-2026',
    seoTitle: 'Fashion Forward India 2026 | Mumbai Fashion Trade Show',
    seoDescription: 'Explore the latest trends in fashion and lifestyle at Fashion Forward India 2026. A must-attend event for retailers, designers, and buyers in Mumbai.',
    seoKeywords: ['Fashion Trade Show', 'Clothing Exhibition Mumbai', 'Lifestyle Event', 'Textile Expo', 'Retail Fashion'],
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Fashion Forward India 2026",
      "startDate": "2026-02-12",
      "endDate": "2026-02-14",
      "location": {
        "@type": "Place",
        "name": "NESCO",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mumbai",
          "addressCountry": "IN"
        }
      },
      "description": "India's premier fashion and lifestyle trade exhibition.",
      "organizer": {
        "@type": "Organization",
        "name": "CMAI",
        "url": "https://cmai.in"
      }
    }),
    startDate: new Date(2026, 1, 12),
    endDate: new Date(2026, 1, 14),
    venue: 'NESCO',
    city: 'Mumbai',
    organizer: 'CMAI',
    organizerWebsite: 'https://cmai.in',
    industry: 'fashion',
    isIndoor: true,
    expectedFootfall: 40000,
    stallSizes: ['3x3', '6x3', '6x6', '9x6'],
    description: 'India\'s premier fashion and lifestyle trade exhibition.',
    whyParticipate: 'Connect with 2000+ buyers and expand your retail network.',
    status: 'published',
    portfolioItems: [],
    similarEvents: ['4', '8', '2']
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect("mongodb+srv://vinayakandhere4:niUjtjP7piNusVwA@cluster0.vtovevf.mongodb.net/brandbase?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert new data
    await Event.insertMany(masterData);
    console.log(`Inserted ${masterData.length} events`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();