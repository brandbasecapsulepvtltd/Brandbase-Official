'use client';

import { useState, useRef } from 'react';
import axios from '../../utils/axios';
import WDHero from './WDHero';
import OtherServicesAndCalculator from './OtherServicesAndCalculator';
import WhyBuildWithBcpl from './WhyBuildWithBcpl';
import ComparisonTable from './ComparisonTable';
import WebDesignAdvantages from './WebDesignAdvantages';
import VisionBanner from './VisionBanner';
import WebsiteServices from './WebsiteServices';
import Faq from './Faq';
import CtaSection from './CtaSection';

const AppDevelopment = () => {
  const [servicesData, setServicesData] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const subNavRef = useRef(null);
  const sectionRefs = useRef({});

  // Consolidated JSON data for all components
const pageData ={
  "hero": {
    "title": "Mobile App Development Services",
    "subtitle": "We build high-performance iOS, Android, and cross-platform mobile apps that scale with your business.",
    "highlightedText": ["high-performance mobile apps"],
    "description": "Whether you need a native iOS app, Android app, or a cross-platform solution, we design and develop mobile applications built for speed, usability, security, and long-term growth.",
    "imgUrl": "https://ik.imagekit.io/vinayak06/app_dev-removebg-preview.png",
    "cta": {
      "primary": "Start Your App Project",
      "secondary": "Explore Our Work"
    }
  },

  "visionBanner": {
    "heading": "A successful mobile app is fast, intuitive, and user-centered. We create seamless app experiences that help you increase engagement, retention, and revenue.",
    "imageUrl": "https://wallpaperaccess.com/full/9228148.jpg"
  },

  "comparisonTable": {
    "category": "Mobile App Development",
    "brand": {
      "logoUrl": "https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819",
      "features": [
        "End-to-end app design, development, and post-launch support",
        "Apps built for performance, engagement, and business growth",
        "Dedicated mobile app experts specializing in iOS, Android, and cross-platform",
        "Experience delivering 500+ successful mobile applications",
        "Modern app tech stacks ensuring scalability, security, and long-term stability"
      ]
    },
    "others": [
      {
        "title": "Freelancers / Small In-House Teams",
        "points": [
          "Limited expertise in both design and advanced mobile development",
          "Outdated tech stack and lack of enterprise-level architecture",
          "Slow delivery due to smaller team size",
          "Limited experience with App Store & Play Store optimization",
          "Minimal support after app launch"
        ]
      },
      {
        "title": "Typical Mobile App Agencies",
        "points": [
          "Focus more on development than product strategy",
          "Weak UI/UX foundation affecting engagement and retention",
          "Inconsistent communication throughout the project",
          "Limited experience with large-scale apps",
          "Basic tools and workflows leading to performance limitations"
        ]
      }
    ]
  },

  "websiteServices": {
    "title": "Mobile App Development Services",
    "subtitle": "Our Core Mobile App Solutions",
    "description": "We build secure, scalable, and user-friendly mobile applications tailored to your industry. From prototype to full-scale development, we deliver apps that users love.",
    "services": [
      {
        "title": "iOS App Development",
        "description": "Native iOS applications built using Swift and modern Apple frameworks. Optimized for performance, security, and smooth user experience.",
        "image": "https://cdn-icons-png.flaticon.com/512/831/831276.png",
        "link": "#"
      },
      {
        "title": "Android App Development",
        "description": "High-quality Android apps built using Kotlin and the latest Google technologies. Compatible with all screen sizes and devices.",
        "image": "https://cdn-icons-png.flaticon.com/512/226/226770.png",
        "link": "#"
      },
      {
        "title": "Cross-Platform App Development",
        "description": "Flutter and React Native apps that work seamlessly on both iOS and Android—cutting development time and cost without compromising quality.",
        "image": "https://cdn-icons-png.flaticon.com/512/5969/5969128.png",
        "link": "#"
      },
      {
        "title": "UI/UX Design for Mobile",
        "description": "Modern, intuitive, and conversion-focused app interfaces designed to maximize user retention and engagement.",
        "image": "https://cdn-icons-png.flaticon.com/512/1029/1029183.png",
        "link": "#"
      },
      {
        "title": "MVP Development",
        "description": "Launch fast with a Minimum Viable Product. Validate your idea, attract early users, and secure investment with a functional MVP.",
        "image": "https://cdn-icons-png.flaticon.com/512/11104/11104882.png",
        "link": "#"
      },
      {
        "title": "App Maintenance & Support",
        "description": "Ongoing app updates, bug fixes, performance improvements, OS upgrades, and security enhancements for long-term success.",
        "image": "https://cdn-icons-png.flaticon.com/512/1048/1048949.png",
        "link": "#"
      }
    ]
  },

  "webDesignAdvantages": {
    "mainTitle": "Advantages of Professional Mobile App Development",
    "sections": {
      "overview": {
        "id": "overview",
        "title": "Overview",
        "heading": "Why Professional Mobile App Development Matters",
        "content": [
          {
            "type": "text",
            "value": "Mobile apps directly influence engagement, revenue, customer retention, and brand experience. A well-developed app helps you attract more users and increase long-term customer value."
          },
          {
            "type": "text",
            "value": "Here are the top benefits of professional mobile app development:"
          },
          {
            "type": "list",
            "items": [
              "1. Increase user retention and engagement",
              "2. Deliver a seamless user experience",
              "3. Gain an edge over competitors",
              "4. Improve brand credibility",
              "5. Boost conversions and customer lifetime value"
            ]
          }
        ]
      },

      "conversionRate": {
        "id": "conversion-rate",
        "title": "1. Boost your conversions",
        "heading": "1. Boost Your Conversions",
        "content": [
          {
            "type": "text",
            "value": "High-performing mobile apps lead to more signups, purchases, bookings, and repeat usage. We build apps that guide users smoothly through every action."
          },
          {
            "type": "image",
            "src": "https://miro.medium.com/v2/resize:fit:1358/1*QdqoNf4iAfDdc_1Ji4VluA.png",
            "alt": "Mobile App Conversion Banner"
          },
          {
            "type": "text",
            "value": "A fast, intuitive mobile app encourages users to trust your brand and complete desired actions—boosting overall conversion rates."
          }
        ]
      },

      "userExperience": {
        "id": "user-experience",
        "title": "2. Optimize user experience",
        "heading": "2. Deliver a Better User Experience (UX)",
        "content": [
          {
            "type": "text",
            "value": "User experience is the core of successful mobile apps. We optimize flow, navigation, gestures, and usability to improve engagement and reduce uninstall rates."
          },
          {
            "type": "image",
            "src": "https://cdn.dribbble.com/users/879147/screenshots/16942756/media/d6a915d554e3c8820a99faaeb2e17b2c.png",
            "alt": "Mobile UX Banner"
          },
          {
            "type": "text",
            "value": "Our apps are designed to be smooth, intuitive, and delightful to use—ensuring users stay longer and return more often."
          }
        ]
      },

      "competitiveEdge": {
        "id": "competitive-edge",
        "title": "3. Maximize competitive edge",
        "heading": "3. Gain a Competitive Advantage",
        "content": [
          {
            "type": "text",
            "value": "A custom mobile app helps you stand out in crowded markets. With superior design, speed, and functionality, your app becomes a strong differentiator."
          },
          {
            "type": "image",
            "src": "https://www.appkode.com/wp-content/uploads/2024/01/mobile-app-development-1.png",
            "alt": "Mobile Competitive Edge Banner"
          },
          {
            "type": "text",
            "value": "Better performance, smoother user flows, and modern UI help you outperform competitors and increase your market share."
          }
        ]
      },

      "searchRankings": {
        "id": "search-rankings",
        "title": "4. Improve brand visibility",
        "heading": "4. Improve Your Brand Visibility",
        "content": [
          {
            "type": "text",
            "value": "A professionally built mobile app increases your brand presence across app stores, search engines, and social platforms."
          },
          {
            "type": "text",
            "value": "We optimize your app for App Store Optimization (ASO), helping you get more downloads organically."
          },
          {
            "type": "image",
            "src": "https://miro.medium.com/v2/resize:fit:1100/1*eJc-jpNmpNy_2jdK5HwZjg.png",
            "alt": "ASO Ranking Banner"
          }
        ]
      },

      "digitalMarketing": {
        "id": "digital-marketing",
        "title": "5. Enhance marketing performance",
        "heading": "5. Strengthen Your Digital Marketing Strategy",
        "content": [
          {
            "type": "text",
            "value": "Mobile apps improve the performance of all marketing campaigns by offering personalized user experiences, push notifications, and in-app engagement."
          },
          {
            "type": "image",
            "src": "https://www.smarther.co/wp-content/uploads/2023/02/mobile-app-marketing-company.jpg",
            "alt": "Mobile Marketing Banner"
          },
          {
            "type": "text",
            "value": "Apps increase customer lifetime value, improve retention, and create direct communication channels with users."
          }
        ]
      }
    }
  },

  "whyBuildWithBcpl": {
    "title": "Why Build Your Mobile App with BCPL",
    "subtitle": "A trusted mobile app development partner delivering performance, scalability, and high-quality user experiences.",
    "reasons": [
      { "id": 1, "reason": "100% in-house iOS, Android, and cross-platform development team — no outsourcing." },
      { "id": 2, "reason": "User-focused mobile UI/UX designs built for engagement and retention." },
      { "id": 3, "reason": "Scalable app architecture and modern tech stacks for long-term success." },
      { "id": 4, "reason": "You own the complete source code, intellectual property, and backend." }
    ]
  },

  "pageMetadata": {
    "title": "Mobile App Development Services in Mumbai | iOS, Android & Cross-Platform Apps",
    "description": "Top mobile app development company in Mumbai. We build high-performance iOS apps, Android apps, and cross-platform mobile applications with modern UI/UX, scalable architecture, and end-to-end support.",
    "keywords": [
      "mobile app development",
      "iOS app development",
      "android app development",
      "cross platform app development",
      "best mobile app development company",
      "app development Mumbai",
      "mobile UI UX design",
      "app development agency"
    ]
  },

  "ctaData": {
    "title": "Want to develop a high-performance mobile app? Get in touch",
    "subheading": "Share your app idea or business challenge. We’ll help you build a scalable, user-friendly mobile app that delivers real business results."
  },

  "faqData": [
    {
      "question": "What mobile app development services do you offer?",
      "answer": "We build iOS apps, Android apps, cross-platform apps, UI/UX for mobile, MVPs, and provide maintenance, updates, and long-term support."
    },
    {
      "question": "How long does it take to develop a mobile app?",
      "answer": "Most apps take 4–12 weeks depending on features, UI/UX complexity, backend requirements, and platform selection."
    },
    {
      "question": "Do you build both iOS and Android apps?",
      "answer": "Yes, we develop native apps for iOS and Android as well as cross-platform apps using Flutter or React Native."
    },
    {
      "question": "How much does mobile app development cost?",
      "answer": "App development cost depends on features, tech stack, design complexity, API integrations, and platform choice. Pricing is provided after understanding your requirements."
    },
    {
      "question": "Do you help with App Store and Play Store publishing?",
      "answer": "Yes, we handle complete app store submission, optimization, screenshots, descriptions, and compliance."
    },
    {
      "question": "Can you develop an MVP for my startup?",
      "answer": "Yes, we build functional MVPs to help you validate your idea, attract users, and raise funding faster."
    },
    {
      "question": "Will you maintain my app after launch?",
      "answer": "Yes, we offer ongoing maintenance, bug fixes, OS updates, security patches, and performance enhancements."
    },
    {
      "question": "Can you integrate APIs, payments, and third-party tools?",
      "answer": "Yes, we integrate payment gateways, GPS, chat systems, analytics, authentication, CRMs, and any required third-party service."
    },
    {
      "question": "Do I own the source code?",
      "answer": "Yes. You get full ownership of the entire source code, design assets, and backend."
    },
    {
      "question": "How do you ensure the security of the app?",
      "answer": "We follow industry security standards including encryption, secure APIs, authentication layers, and regular code reviews."
    }
  ]
}



  return (
    <div className="bg-white text-gray-800 mt-[70px]">
      <WDHero data={pageData.hero} />
      <VisionBanner data={pageData.visionBanner} />
      <ComparisonTable data={pageData.comparisonTable} />
      <WebsiteServices data={pageData.websiteServices} />
      <WebDesignAdvantages data={pageData.webDesignAdvantages} />
      <WhyBuildWithBcpl data={pageData.whyBuildWithBcpl} />
      <OtherServicesAndCalculator />
      <CtaSection data={pageData.ctaData} />
      <Faq data={pageData.faqData} />
    </div>
  );
};

export default AppDevelopment;