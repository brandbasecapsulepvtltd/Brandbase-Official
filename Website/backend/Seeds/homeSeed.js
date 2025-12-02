const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// HomePage Schema (same as your model)
const slideSchema = new mongoose.Schema({
  id: Number,
  title: String,
  subtext: String,
  image: String
});

const videoSchema = new mongoose.Schema({
  url: String
});

const heroSectionSchema = new mongoose.Schema({
  slides: [slideSchema],
  video: videoSchema
});

const serviceItemSchema = new mongoose.Schema({
  category: String,
  items: [String],
  icon: String,
  image: String
});

const brandElevationSchema = new mongoose.Schema({
  services: [serviceItemSchema]
});

const workSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String
});

const recentWorkSchema = new mongoose.Schema({
  works: [workSchema],
  spanClasses: [String]
});

const clientSchema = new mongoose.Schema({
  id: Number,
  logo: String,
  name: String,
  description: String,
  projectImage: String,
  service: String,
  location: String,
  date: String,
  results: String
});

const clientsSchema = new mongoose.Schema({
  clientData: [clientSchema]
});

const testimonialSchema = new mongoose.Schema({
  logo: String,
  text: String,
  name: String,
  role: String,
  avatar: String
});

const testimonialsSchema = new mongoose.Schema({
  testimonials: [testimonialSchema]
});

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  image: String,
  hasImage: Boolean
});

const faqsSchema = new mongoose.Schema({
  faqs: [faqSchema]
});

const homePageSchema = new mongoose.Schema({
  heroSection: heroSectionSchema,
  brandElevation: brandElevationSchema,
  recentWork: recentWorkSchema,
  clients: clientsSchema,
  testimonials: testimonialsSchema,
  faqs: faqsSchema
}, {
  timestamps: true
});

const HomePage = mongoose.model('HomePage', homePageSchema);

// Seed Data
const homePageData = {
  heroSection: {
    slides: [
      {
        id: 1,
        title: "Create Experiences That Stand Out",
        subtext: "From exhibitions to large-scale events, we craft immersive experiences that leave a lasting impact on your audience.",
        image: "https://ik.imagekit.io/vinayak06/11.jpg?updatedAt=1763372433537"
      },
      {
        id: 2,
        title: "Expert Web & App Development Solutions",
        subtext: "Get world-class website development, app creation, and modern interface design tailored to your business goals.",
        image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"
      },
      {
        id: 3,
        title: "Build a Brand That Truly Stands Out",
        subtext: "We craft powerful brand identities with strategic design, strong messaging, and visuals that leave a lasting impression.",
        image: "https://images.squarespace-cdn.com/content/v1/522ea6f5e4b074ba686e497c/1625541238887-BISTJ5IEUBKLV409GM31/Crowdstrike+_+NYCD-100+_+06-29-21+_+-20.jpg?format=1500w"
      },
      {
        id: 4,
        title: "Grow Faster in the Digital World",
        subtext: "We handle everything—from SEO and social ads to social media setup, content design, and content marketing—to elevate your brand online.",
        image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg"
      },
      {
        id: 5,
        title: "Create Stories That Captivate",
        subtext: "High-quality audio and video production services that bring your brand's vision to life with cinematic visuals and crystal-clear sound.",
        image: "https://images.pexels.com/photos/8412361/pexels-photo-8412361.jpeg"
      }
    ],
    video: {
      url: "https://res.cloudinary.com/dkoqcp1g9/video/upload/Untitled_video_-_Made_with_Clipchamp_61_ib2uys_d2e8e7.mp4"
    }
  },
  brandElevation: {
    services: [
      {
        category: "Web Design",
        items: [
          "Website Design & Development",
          "WordPress Development",
          "E-commerce Development",
          "Website Maintenance & Hosting",
          "Landing Page Design",
          "Shopify Development"
        ],
        icon: "💻",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
      },
      {
        category: "Graphic Design",
        items: [
          "Brand Identity Design",
          "Logo & Visual Systems",
          "Marketing Collateral",
          "Packaging Design",
          "Print & Digital Assets"
        ],
        icon: "🎨",
        image: "https://cdn.wallpapersafari.com/42/65/YlVLzy.jpg"
      },
      {
        category: "Digital Marketing",
        items: [
          "Social Media Marketing",
          "SEO Optimization",
          "Content Strategy",
          "PPC Advertising",
          "Email Marketing"
        ],
        icon: "📱",
        image: "https://tse2.mm.bing.net/th/id/OIP.4haPry3S_usS7LZ_KdjIhgHaE8?pid=ImgDet&w=474&h=316&rs=1&o=7&rm=3"
      },
      {
        category: "Web Development",
        items: [
          "Custom Website Design",
          "E-commerce Solutions",
          "Web Applications",
          "Mobile Responsive",
          "Performance Optimization"
        ],
        icon: "🔧",
        image: "https://tse2.mm.bing.net/th/id/OIP.FC4TBhC6mLp8WOfZex3IrgHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain&o=7&rm=3"
      },
      {
        category: "Video Production",
        items: [
          "Brand Videos",
          "Social Media Content",
          "Product Demos",
          "Animation & Motion",
          "Video Advertising"
        ],
        icon: "🎥",
        image: "https://tse4.mm.bing.net/th/id/OIP.CcA6fg-ieoi3-WzmDltB7AHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3"
      },
      {
        category: "Brand Strategy",
        items: [
          "Market Research",
          "Brand Positioning",
          "Competitive Analysis",
          "Audience Personas",
          "Growth Strategy"
        ],
        icon: "🚀",
        image: "https://www.ey.com/content/dam/ey-unified-site/ey-com/en-gl/campaigns/transformation-realized/images/ey-transformations-film-billboards-still-3840px-v2.jpg"
      }
    ]
  },
  recentWork: {
    works: [
      {
        image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/6.jpg",
        name: "Brand Identity",
        description: "Complete brand redesign for tech startup"
      },
      {
        image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/1.jpg",
        name: "Web Platform",
        description: "E-commerce solution with advanced features"
      },
      {
        image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/8.jpg",
        name: "Mobile App",
        description: "Cross-platform mobile application"
      },
      {
        image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/9.jpg",
        name: "Marketing Campaign",
        description: "Digital marketing strategy implementation"
      },
      {
        image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/10.jpg",
        name: "UI/UX Design",
        description: "User-centered interface design"
      },
      {
        image: "https://www.brandbasecapsule.com/assets/img/Recent%20Work/11.jpg",
        name: "Content Strategy",
        description: "Strategic content development plan"
      }
    ],
    spanClasses: [
      "col-span-2 md:col-span-1 md:row-span-2",
      "col-span-2 md:col-span-1 md:row-span-1",
      "col-span-2 md:col-span-1 md:row-span-2",
      "col-span-2 md:col-span-1 md:row-span-2",
      "col-span-2 md:col-span-1 md:row-span-1",
      "col-span-2 md:col-span-1 md:row-span-1"
    ]
  },
  clients: {
    clientData: [
      {
        id: 1,
        logo: "https://ik.imagekit.io/tgvg79dv2g/BrandBase/clients%20section/Maldives.png?updatedAt=1763185882506",
        name: "Maldives Tourism",
        description: "We developed a comprehensive digital marketing campaign that increased their international tourist bookings by 45% within 6 months through targeted social media advertising and SEO optimization.",
        projectImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "Digital Marketing",
        location: "Maldives",
        date: "March 15, 2024",
        results: "45% increase in bookings"
      },
      {
        id: 2,
        logo: "https://ik.imagekit.io/tgvg79dv2g/BrandBase/clients%20section/Dynalog.png?updatedAt=1763186566545",
        name: "Dynalog Systems",
        description: "Complete website redesign and development with integrated CRM system. The new platform improved user engagement by 60% and reduced bounce rate by 35%.",
        projectImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "Web Development",
        location: "Mumbai",
        date: "January 20, 2024",
        results: "60% engagement increase"
      },
      {
        id: 3,
        logo: "https://ik.imagekit.io/tgvg79dv2g/BrandBase/clients%20section/Jindal.png?updatedAt=1763186852154",
        name: "Jindal Industries",
        description: "Managed their annual corporate event with 500+ attendees. Provided end-to-end event management including digital invitations, live streaming, and post-event analytics.",
        projectImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "Event Management",
        location: "Delhi",
        date: "November 20, 2023",
        results: "500+ attendees"
      },
      {
        id: 4,
        logo: "https://hybec.net/wp-content/uploads/2024/07/hybec-1-01-1536x525.png",
        name: "Hybec Technologies",
        description: "Developed a custom mobile application for their service platform, resulting in 200% growth in user base and 4.8-star rating on app stores.",
        projectImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "App Development",
        location: "Bangalore",
        date: "February 10, 2024",
        results: "200% user growth"
      },
      {
        id: 5,
        logo: "https://datalog.co.in/wp-content/uploads/2025/07/datalog_logo.png",
        name: "DataLog Solutions",
        description: "Implemented advanced SEO strategy that moved them from page 4 to top 3 positions on Google for 15+ key search terms within 4 months.",
        projectImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "SEO Optimization",
        location: "Pune",
        date: "December 5, 2023",
        results: "Top 3 Google rankings"
      },
      {
        id: 6,
        logo: "https://vigneto.in/cdn/shop/files/vigneto_TRANSPARENT_b2e1522f-b15f-4142-8935-ceb13fcd10b8.png?v=1645980179&width=180",
        name: "Vigneto Wines",
        description: "Created and managed their e-commerce platform with integrated inventory management, resulting in 300% increase in online sales.",
        projectImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "E-commerce Development",
        location: "Nashik",
        date: "October 15, 2023",
        results: "300% sales increase"
      },
      {
        id: 7,
        logo: "https://media.licdn.com/dms/image/v2/C560BAQHIFCrhNO4Y4Q/company-logo_200_200/company-logo_200_200/0/1635166882858?e=1764806400&v=beta&t=NY1Ps_0c1Oyrs06TeiJrqBRM9P_w6F9s21B7gpPHt6o",
        name: "TechNova Solutions",
        description: "Managed their product launch event with international press coverage and live demonstrations across multiple cities.",
        projectImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "Event Management",
        location: "Hyderabad",
        date: "September 8, 2023",
        results: "International press coverage"
      },
      {
        id: 8,
        logo: "https://tse3.mm.bing.net/th/id/OIP.D4bhXlJvEhwQRdsmcjh7GgHaHZ?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        name: "Global Enterprises",
        description: "Complete digital transformation including website, mobile app, and cloud infrastructure migration.",
        projectImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "Digital Transformation",
        location: "Chennai",
        date: "August 22, 2023",
        results: "Complete digital overhaul"
      },
      {
        id: 9,
        logo: "https://www.mobil.co.in/-/media/project/wep/mobil/mobil-in/new-mobil-logo.png",
        name: "Mobil Energy",
        description: "Corporate rebranding and website development with focus on sustainability and modern energy solutions.",
        projectImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "Branding & Web Development",
        location: "Gurgaon",
        date: "July 30, 2023",
        results: "Successful rebranding"
      },
      {
        id: 10,
        logo: "https://www.elgi.com/in/wp-content/themes/ELGi/images/elgi__logo.png",
        name: "ELGI Industries",
        description: "Managed their international dealer conference with participants from 25+ countries and live product demonstrations.",
        projectImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "International Event",
        location: "Coimbatore",
        date: "June 12, 2023",
        results: "25+ countries participation"
      },
      {
        id: 11,
        logo: "https://tapariaroofings.com/wp-content/uploads/2023/04/Untitled-design.png",
        name: "Taparia Roofings",
        description: "E-commerce platform development with advanced product customization features and real-time inventory tracking.",
        projectImage: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "E-commerce Development",
        location: "Ahmedabad",
        date: "May 5, 2023",
        results: "Real-time inventory system"
      },
      {
        id: 12,
        logo: "https://mahalaxmiloomspares.com/wp-content/uploads/2023/12/FINAL-LOGO2.png",
        name: "Mahalaxmi Looms",
        description: "Digital marketing campaign focusing on export market expansion with multilingual content and international SEO.",
        projectImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        service: "International Marketing",
        location: "Surat",
        date: "April 18, 2023",
        results: "Export market expansion"
      }
    ]
  },
  testimonials: {
    testimonials: [
      {
        "logo": "https://logodix.com/logo/2003989.png",
        "text": "I Am writing to express my sincere appreciation for your hard work & your contribution have been invaluable to our team & we are grateful for all that you do. Once again, thank you for all that you do & appreciated by our visitors too.",
        "name": "Hitesh Ahuja",
        "role": "CEO, M/s Brandbase Capsule Pvt. Ltd.",
        "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
      },
      {
        "logo": "https://logodix.com/logo/2003989.png",
        "text": "This is certify that M/S Brandbase Capsule Pvt.Ltd. was awarded the stall design and fabrication for Distribuelec Exhibition, Which was held at Bombay Exhibition Centre, Goregaon, Mumbai from 16th to 18th of January 2024.",
        "name": "Michael V",
        "role": "Dy GM, Marketing",
        "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
      },
      {
        "logo": "https://logodix.com/logo/2003989.png",
        "text": "M/s Brandbase Capsule Pvt. Ltd. did the fabrication for our booth in Professional Beauty Expo at Bombay Exhibition Center, NESCO, Mumbai. They provided timely handover of the complete booth.",
        "name": "Bikram Sapra",
        "role": "Director",
        "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
      },
      {
        "logo": "https://logodix.com/logo/2003989.png",
        "text": "We thank Brandbase Capsule Pvt. Ltd. for giving us the entire ready stall well in advance and also for their co-operation all the time.",
        "name": "Haresh Gada",
        "role": "Director",
        "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
      },
      {
        "logo": "https://logodix.com/logo/2003989.png",
        "text": "This is to certify that M/s. Brandbase Capsule Pvt. Ltd. (mumbai), has performed their job of executing stall designing at the highest level of Standards in the IIJS Exhibition at Mumbai.",
        "name": "Ghanshyam Gems",
        "role": "Proprietor",
        "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
      },
      {
        "logo": "https://logodix.com/logo/2003989.png",
        "text": "We were pleased with the creative booth design, the timely handover of the complete booth and the professionalism of the Brandbase Capsule team.",
        "name": "Triveni Glass International",
        "role": "",
        "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
      },
      {
        "logo": "https://logodix.com/logo/2003989.png",
        "text": "We appreciate you for your effort by which you presented a wonderful stall for us during excon event. The timely completion of the same should be very much highlighted. Thanking you once again. all the wishes for the team Brandbase Capsule. if we participate in bauma expo we shall appoint you as our stall fabricator.",
        "name": "Anto Sebastian",
        "role": "CEO",
        "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
      },
      {
        "logo": "https://logodix.com/logo/2003989.png",
        "text": "Brandbase capsule pvt. Ltd., Mumbai, upon the successfully design & construct of the customized and complete stall A-31 at Excon - 2022 Bangalore between 17th May-22 to 21 May-22. Brandbase was responsible for Designing, Fabrication and dismantling of stall at Excon-2022. We would like to appreciate Brandbase on their services as well as assistance in the smooth running of operations during the said event and in contribution towards making show wonderful. We wish them the best luck for all future endeavors.",
        "name": "Ravi Angane",
        "role": "",
        "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
      },
      {
        "logo": "https://logodix.com/logo/2003989.png",
        "text": "M/s.Brandbase capsule Private Limited Mumbai, upon the successfully design and Construct of the customized and complete STALL A-111 AT INDIA MED EXPO AT HITEC City Hyderabad between 9th December to 11th 2022 M/s. Brandbase was responsible for designing, Fabrication And dismantling of Stall at India med expo 2022. We would like to appreciate brandbase on their service as well as assistance in the smooth running of operatios during the said event and in contribution toward masking show wonderful We wish them the best Luck for all future endeavors",
        "name": "Ritesh Ranjan",
        "role": "",
        "avatar": "https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-set-concept_1013341-130978.jpg"
      }
    ]
  },
  faqs: {
    faqs: [
      {
        question: "How is BrandBase different from other digital marketing agencies?",
        answer: "Unlike traditional agencies, BrandBase offers 360° marketing solutions with a focus on data-driven results. We combine creative strategy with advanced analytics to deliver measurable ROI.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        hasImage: true
      },
      {
        question: "What's your typical project timeline?",
        answer: "Most projects are delivered within 4-8 weeks, depending on scope. Website development takes 3-6 weeks, while comprehensive marketing campaigns typically run for 3+ months.",
        hasImage: false
      },
      {
        question: "Do you work with startups and small businesses?",
        answer: "Absolutely! We offer scalable solutions for businesses of all sizes. Our startup packages are designed to deliver maximum impact with budget-friendly pricing.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        hasImage: true
      },
      {
        question: "What industries do you specialize in?",
        answer: "We have extensive experience across e-commerce, SaaS, healthcare, real estate, and manufacturing. Our adaptable strategies work for any industry looking to grow their digital presence.",
        hasImage: false
      },
      {
        question: "How do you measure campaign success?",
        answer: "We track KPIs like conversion rates, ROI, engagement metrics, and customer acquisition costs. You'll receive detailed monthly reports through our client dashboard.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        hasImage: true
      },
      {
        question: "Do you provide ongoing support?",
        answer: "Yes, we offer comprehensive support and maintenance packages. From website updates to continuous campaign optimization, we're here to ensure your long-term success.",
        hasImage: false
      }
    ]
  }
};

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://vinayakandhere4:niUjtjP7piNusVwA@cluster0.vtovevf.mongodb.net/brandbase?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await HomePage.deleteMany({});
    console.log('✅ Cleared existing home page data');

    // Insert new data
    const result = await HomePage.create(homePageData);
    console.log('✅ Home page data seeded successfully');
    console.log(`📊 Seeded data with ID: ${result._id}`);

    // Count documents for verification
    const count = await HomePage.countDocuments();
    console.log(`📈 Total home page documents: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();