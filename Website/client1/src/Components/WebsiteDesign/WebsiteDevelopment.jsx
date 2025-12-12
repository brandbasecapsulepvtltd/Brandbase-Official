'use client';

import { useState, useRef } from 'react';
import axios from '../../sections/utils/axios';
import WDHero from './WDHero';
import OtherServicesAndCalculator from './OtherServicesAndCalculator';
import WhyBuildWithBcpl from './WhyBuildWithBcpl';
import ComparisonTable from './ComparisonTable';
import WebDesignAdvantages from './WebDesignAdvantages';
import VisionBanner from './VisionBanner';
import WebsiteServices from './WebsiteServices';
import Faq from './Faq';
import CtaSection from './CtaSection';
import WeCreate from './WeCreate';

const WebsiteDevelopment = () => {
  const [servicesData, setServicesData] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const subNavRef = useRef(null);
  const sectionRefs = useRef({});

  // Consolidated JSON data for all components including WeCreate
  const pageData = {
    hero: {
      title: "Website Design & Development Services",
      subtitle: "From business websites to full-scale e-commerce solutions, we build websites that convert.",
      highlightedText: ["websites that convert"],
      description:
        "Whether you need a static website, a CMS platform, or a full online store, we build it with performance and growth in mind.",
      imgUrl: "https://static.vecteezy.com/system/resources/previews/005/283/061/original/web-development-concept-in-3d-isometric-design-designer-works-with-code-interface-engineering-programming-settings-and-optimizes-pages-template-with-people-scene-illustration-for-webpage-vector.jpg",
      cta: {
        primary: "Start Your Project",
        secondary: "Explore Our Work",
      },
    },

    visionBanner: {
      heading:
        "A good website is fast, clear, and easy to use. We build user-friendly, high-performance websites that help you get more leads and customers.",
      imageUrl:
        "https://wallpaperbat.com/img/216799-free-download-3d-web-design-wallpaper-1024x768-for-your-desktop.jpg",
    },

    comparisonTable: {
      category: "Website Development",
      brand: {
        logoUrl:
          "https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819",
        features: [
          "End-to-end web design + development + marketing in one place",
          "Websites built strategically to increase conversions and revenue",
          "Dedicated experts who understand your business and industry",
          "Experience of 1,000+ successful website projects",
          "We use modern tech stacks to ensure long-term success and scalability",
        ],
      },
      others: [
        {
          title: "In-House Teams",
          points: [
            "Small teams with limited design and marketing expertise",
            "Often lack advanced technology needed for growth-focused websites",
            "Limited exposure leads to less innovative and strategic designs",
            "Lower experience in high-impact UI/UX design",
            "Restricted tools and collaboration capabilities",
          ],
        },
        {
          title: "Typical Web Design Agencies",
          points: [
            "Most agencies do not integrate marketing with design",
            "Focus is often on visuals instead of business results & conversions",
            "Inconsistent account management and project communication",
            "Industry-specific expertise may be limited",
            "Basic tools and outdated workflows reduce performance potential",
          ],
        },
      ],
    },

    websiteServices: {
      title: "Website Development Services",
      subtitle: "Our Core Website Solutions",
      description:
        "We build modern, responsive, and high-converting websites tailored to your business goals. From portfolio websites to e-commerce stores, we deliver custom solutions for every industry.",
      services: [
        {
          title: "Business Website",
          description:
            "Professional corporate websites designed for brand credibility, lead generation, and strong online presence. Perfect for service-based businesses and organizations.",
          image:
            "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/Business-removebg-preview.png",
          link: "#",
        },
        {
          title: "Portfolio Website",
          description:
            "Creative websites to showcase your work, case studies, and achievements. Ideal for designers, photographers, studios, and agencies.",
          image:
            "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/portfolioWeb-removebg-preview.png",
          link: "#",
        },
        {
          title: "Landing Page Development",
          description:
            "High-converting landing pages created for marketing campaigns, ads, and product launches — with strong CTAs and optimized UX.",
          image:
            "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/LandingPage-removebg-preview.png",
          link: "#",
        },
        {
          title: "CMS Website",
          description:
            "Easy-to-manage CMS websites with blog support, admin dashboards, and seamless content editing. Built using WordPress, Webflow, or custom CMS.",
          image:
            "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/CMS-removebg-preview.png",
          link: "#",
        },
        {
          title: "E-Commerce Websites",
          description:
            "Full-featured online stores with product pages, payments, cart systems, shipping options, coupons, and analytics. Built using Shopify, WooCommerce, or custom stacks.",
          image:
            "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/E-commerce-removebg-preview.png",
          link: "#",
        },
        {
          title: "Full E-Commerce Setup",
          description:
            "A complete e-commerce ecosystem including inventory management, marketing automation, CRM integration, multi-channel selling, and analytics dashboards.",
          image:
            "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/Dynamic-removebg-preview.png",
          link: "#",
        },
      ],
    },

    webDesignAdvantages: {
      mainTitle: "Advantages of Professional Website Design & Development",
      sections: {
        overview: {
          id: "overview",
          title: "Overview",
          heading: "Why Professional Web Design Matters",
          content: [
            {
              type: "text",
              value:
                "Professional website design directly impacts your conversion rate, user experience, search ranking, and overall brand perception. A well-designed website helps your business increase leads, sales, and customer engagement.",
            },
            {
              type: "text",
              value: "Here are the top benefits of professional website design:",
            },
            {
              type: "list",
              items: [
                "1. Increase your conversion rate",
                "2. Improve your user experience",
                "3. Gain a competitive advantage",
                "4. Rank higher on search engines",
                "5. Enhance your digital marketing performance",
              ],
            },
          ],
        },

        conversionRate: {
          id: "conversion-rate",
          title: "1. Increase your conversion rate",
          heading: "1. Increase Your Conversion Rate",
          content: [
            {
              type: "text",
              value:
                "Conversions include actions like purchases, form submissions, booking appointments, or newsletter sign-ups. A well-designed website guides users smoothly toward taking these actions.",
            },
            {
              type: "text",
              value:
                "Since most conversions start with an online interaction, your website needs to be fast, clean, modern, and intuitive.",
            },
            {
              type: "image",
              src: "https://dy3ctaqqzdwfd.cloudfront.net/2025/02/web-conversion-rate-cover.png",
              alt: "Conversion Rate Banner",
            },
            {
              type: "text",
              value:
                "A modern, user-friendly website creates a strong first impression and encourages users to trust your business — increasing the chances of them converting.",
            },
          ],
        },

        userExperience: {
          id: "user-experience",
          title: "2. Optimize your user experience",
          heading: "2. Optimize Your User Experience (UX)",
          content: [
            {
              type: "text",
              value:
                "User experience determines how easy and enjoyable your website is to use. Good UX lowers bounce rates, increases session duration, and improves customer satisfaction.",
            },
            {
              type: "image",
              src: "https://blog.cubos.academy/content/images/2023/02/Designer-UI.jpg",
              alt: "User Experience Banner",
            },
            {
              type: "text",
              value:
                "We optimize navigation, page speed, mobile responsiveness, accessibility, and visual clarity — helping users find what they need instantly.",
            },
          ],
        },

        competitiveEdge: {
          id: "competitive-edge",
          title: "3. Maximize your competitive edge",
          heading: "3. Gain a Competitive Advantage",
          content: [
            {
              type: "text",
              value:
                "A custom-designed website sets you apart from competitors using basic templates. Your website becomes a strong branding asset that highlights your strengths.",
            },
            {
              type: "image",
              src: "https://firmao.net/blog_net/wp-content/uploads/2023/04/blog-7.png",
              alt: "Competitive Edge Banner",
            },
            {
              type: "text",
              value:
                "With better design, structure, SEO, and visuals — you can outperform competitors and win more customers.",
            },
          ],
        },

        searchRankings: {
          id: "search-rankings",
          title: "4. Improve your search rankings",
          heading: "4. Improve Your Search Rankings",
          content: [
            {
              type: "text",
              value:
                "Over 80% of users search online before making a decision. If your website does not appear on the first page of Google, you lose potential customers.",
            },
            {
              type: "text",
              value:
                "We combine SEO with smart web design to help your website rank for relevant keywords, drive organic traffic, and generate leads.",
            },
            {
              type: "image",
              src: "https://bs.uenicdn.com/blog/wp-content/uploads/2020/03/how_to_rank_higher_in_google-768x432.jpg",
              alt: "SEO Ranking Banner",
            },
          ],
        },

        digitalMarketing: {
          id: "digital-marketing",
          title: "5. Enhance your digital marketing strategy",
          heading: "5. Strengthen Your Digital Marketing Strategy",
          content: [
            {
              type: "text",
              value:
                "Your website is the core of your digital marketing. All paid ads, social media campaigns, and email marketing efforts lead users back to your website.",
            },
            {
              type: "image",
              src: "https://www.notiontechnologies.com/blog/wp-content/uploads/2023/07/digital-marketing-advantages.webp",
              alt: "Digital Marketing Banner",
            },
            {
              type: "text",
              value:
                "A well-designed website improves ad quality scores, reduces cost per click, and increases conversions across all marketing channels.",
            },
          ],
        },
      },
    },

    whyBuildWithBcpl: {
      title: "Why Build With BCPL",
      subtitle:
        "A trusted development partner delivering performance, scalability, and long-term digital growth.",
      reasons: [
        { id: 1, reason: "100% in-house full-stack engineering — no outsourcing." },
        { id: 2, reason: "UI/UX design systems that focus on conversions and performance." },
        { id: 3, reason: "Scalable technology stacks built for future growth." },
        { id: 4, reason: "You own the complete source code — zero vendor lock-in." },
      ],
    },

    weCreate: {
      header: {
        titleOrange: "WEBSITE",
        titleBlack: "DEVELOPMENT",
        description:
          "We create high-quality, responsive, business-driven websites designed to convert visitors into customers.",
      },
      leftFeatured: {
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
        title: "Premium Website Development",
        subtitle:
          "From UI/UX to deployment — we build sleek, fast, and scalable websites for brands that want to stand out.",
        tags: [
          { label: "RESPONSIVE", type: "primary" },
          { label: "SEO OPTIMIZED", type: "secondary" },
          { label: "FAST PERFORMANCE", type: "secondary" },
        ],
      },
      rightColumnItems: [
        {
          title: "Custom Business Websites",
          subtitle: "Built for conversion, speed & brand identity",
          image:
            "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1600&auto=format&fit=crop",
          tags: [
            { label: "BRANDING", type: "primary" },
            { label: "PERFORMANCE", type: "secondary" },
            { label: "UX FIRST", type: "secondary" },
          ],
        },
        {
          title: "E-Commerce Development",
          subtitle:
            "High-converting online stores with seamless checkout",
          image:
            "https://th.bing.com/th/id/OIP.zOQEjy6gq7QyUPNDLNaKzQHaEo?rs=1&pid=ImgDetMain",
          tags: [
            { label: "SHOPIFY", type: "primary" },
            { label: "MERN", type: "secondary" },
          ],
        },
      ],
    },

    pageMetadata: {
      title: "Website Design & Development Services in Mumbai | Custom Websites & E-Commerce",
      description:
        "Professional website design and development company in Mumbai. We build fast, responsive, SEO-optimized, and high-converting business websites, e-commerce stores, and custom web platforms.",
      keywords: [
        "website development",
        "website design company",
        "web design Mumbai",
        "best website developer",
        "ecommerce website development",
        "custom website design",
        "responsive web design",
        "web design agency in Mumbai",
      ],
    },

    ctaData: {
      title: "Want to elevate your brand experience? Get in touch",
      subheading: "Just bring your creative business idea or communication problem. Let us craft the solution together with a powerful web presence.",
    },

    faqData: [
      {
        "question": "What services do you offer in website design and development?",
        "answer": "We provide complete website design and development services including UI/UX design, responsive layouts, SEO setup, AEO optimization, content structuring, website speed optimization, and full deployment."
      },
      {
        "question": "How long does it take to build a website?",
        "answer": "Most business websites take 10–20 days to build depending on the number of pages, features, content, and design complexity."
      },
      {
        "question": "How much does a website cost?",
        "answer": "The cost depends on your requirements such as design, features, number of pages, and customization. We provide pricing after understanding your exact needs."
      },
      {
        "question": "Will my website be mobile-friendly?",
        "answer": "Yes, all websites we build are fully responsive and optimized for mobile, tablet, and desktop."
      },
      {
        "question": "Do you create SEO-friendly websites?",
        "answer": "Yes, every website we build includes SEO best practices like proper structure, metadata, fast loading speed, responsive design, and AEO-friendly content."
      },
      {
        "question": "Can you redesign my existing website?",
        "answer": "Yes, we can redesign your existing website to improve design, performance, SEO, and overall user experience."
      },
      {
        "question": "Will I be able to edit my website later?",
        "answer": "Yes, we provide easy-to-use CMS or admin panels so you can update content, images, and pages anytime."
      },
      {
        "question": "Do you provide website maintenance?",
        "answer": "Yes, we offer monthly and yearly maintenance plans that include updates, backups, bug fixes, and performance monitoring."
      },
      {
        "question": "Can you build an e-commerce website?",
        "answer": "Yes, we develop complete e-commerce websites with product management, payment integration, order tracking, and more."
      },
      {
        "question": "Will you integrate analytics?",
        "answer": "Yes, we integrate Google Analytics and Search Console to help you track visitors and measure website performance."
      }
    ]
  };

  return (
    <div className="bg-white text-gray-800 mt-[70px]">
      <WDHero data={pageData.hero} />
      <VisionBanner data={pageData.visionBanner} />
      <ComparisonTable data={pageData.comparisonTable} />
      <WebsiteServices data={pageData.websiteServices} />
      <WebDesignAdvantages data={pageData.webDesignAdvantages} />
      <WhyBuildWithBcpl data={pageData.whyBuildWithBcpl} />
      <WeCreate data={pageData.weCreate} />
      <OtherServicesAndCalculator />
      <CtaSection data={pageData.ctaData} />
      <Faq data={pageData.faqData} />
    </div>
  );
};

export default WebsiteDevelopment;