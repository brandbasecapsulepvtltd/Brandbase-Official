const mongoose = require('mongoose');
const Event = require('../models/Event');

const masterData = [
  {
    id: '1',
    name: 'India Tech Summit 2026',
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
    name: 'Pharma Expo India',
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
    similarEvents: ['1', '7', '8']
  },
  {
    id: '3',  
    name: 'Auto Expo 2026',
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
    name: 'Food & Hospitality Expo',
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
    portfolioItems: [],
    similarEvents: ['1', '5', '8']
  },
  {
    id: '5',
    name: 'Fashion Forward India',
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
    portfolioItems: [],
    similarEvents: ['4', '8', '2']
  },
  {
    id: '6',
    name: 'Manufacturing Tech Show',
    startDate: new Date(2026, 1, 18),
    endDate: new Date(2026, 1, 20),
    venue: 'HITEX',
    city: 'Hyderabad',
    organizer: 'CII',
    organizerWebsite: 'https://cii.in',
    industry: 'manufacturing',
    isIndoor: true,
    expectedFootfall: 30000,
    stallSizes: ['6x3', '6x6', '9x6', '12x9'],
    description: 'Showcasing cutting-edge manufacturing technologies and Industry 4.0 solutions.',
    whyParticipate: 'Demonstrate your manufacturing solutions to key industry decision makers.',
    portfolioItems: [],
    similarEvents: ['1', '3', '7']
  },
  {
    id: '7',
    name: 'Healthcare Innovation Summit',
    startDate: new Date(2026, 1, 25),
    endDate: new Date(2026, 1, 27),
    venue: 'Chennai Trade Centre',
    city: 'Chennai',
    organizer: 'FICCI',
    organizerWebsite: 'https://ficci.in',
    industry: 'healthcare',
    isIndoor: true,
    expectedFootfall: 20000,
    stallSizes: ['3x3', '6x3', '6x6'],
    description: 'Bringing together healthcare providers, technology companies, and policymakers.',
    whyParticipate: 'Position your brand at the forefront of healthcare innovation in India.',
    portfolioItems: [],
    similarEvents: ['2', '8', '1']
  },
  {
    id: '8',
    name: 'Retail India Expo',
    startDate: new Date(2026, 2, 5),
    endDate: new Date(2026, 2, 7),
    venue: 'Jio World Convention Centre',
    city: 'Mumbai',
    organizer: 'RAI',
    organizerWebsite: 'https://rai.net.in',
    industry: 'retail',
    isIndoor: true,
    expectedFootfall: 45000,
    stallSizes: ['3x3', '6x3', '6x6', '9x6'],
    description: 'India\'s largest retail trade show featuring store design and technology.',
    whyParticipate: 'Connect with top retailers and showcase your retail solutions.',
    portfolioItems: [],
    similarEvents: ['5', '4', '2']
  },
    {
    id: '9',
    name: 'India Tech Summit 2026',
    startDate: new Date(2026, 0, 13),
    endDate: new Date(2026, 0, 15),
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
    id: '10',
    name: 'India Tech Summit 2026',
    startDate: new Date(2026, 0, 10),
    endDate: new Date(2026, 0, 14),
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