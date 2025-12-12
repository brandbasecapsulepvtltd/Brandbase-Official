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

const EventsExhibition = () => {
  const [servicesData, setServicesData] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const subNavRef = useRef(null);
  const sectionRefs = useRef({});

  // Consolidated JSON data for all components
const pageData = {
  "hero": {
    "title": "Event & Exhibition Management That Elevates Your Brand",
    "subtitle": "From stall design to full event execution, we manage everything to make your event impactful, memorable, and professional.",
    "highlightedText": ["elevates your brand"],
    "description": "We design and manage events, exhibitions, and brand activations that attract visitors, communicate your brand message, and drive real business results.",
    "imgUrl": "https://img.freepik.com/premium-photo/virtual-networking-events_839035-745104.jpg",
    "cta": {
      "primary": "Plan Your Event",
      "secondary": "View Our Work"
    }
  },

  "visionBanner": {
    "heading": "Great events don’t happen by chance — they happen with the right planning, design, and execution. We deliver seamless event experiences that leave lasting impressions.",
    "imageUrl": "https://wallpapercave.com/wp/wp7488228.jpg"
  },

  "comparisonTable": {
    "category": "Event & Exhibition Management",
    "brand": {
      "logoUrl": "https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819",
      "features": [
        "Custom stall & exhibition booth design",
        "End-to-end event planning & on-site coordination",
        "Creative branding and design for maximum impact",
        "Quick execution with experienced event managers",
        "Transparent timelines, updates, and cost control"
      ]
    },
    "others": [
      {
        "title": "Freelancers",
        "points": [
          "Limited design and event experience",
          "No complete event management support",
          "Unreliable timelines and execution",
          "Quality varies greatly",
          "Lack of professional setup and crew"
        ]
      },
      {
        "title": "Typical Event Vendors",
        "points": [
          "Focus only on physical setup, not branding",
          "Little to no design expertise",
          "No strategy or end-to-end management",
          "Poor coordination and communication",
          "Inconsistent execution during live events"
        ]
      }
    ]
  },

  "websiteServices": {
    "title": "Event & Exhibition Management Services",
    "subtitle": "Everything You Need for a Successful Event",
    "description": "We manage every part of your event or exhibition — from planning, design, and branding to on-site execution. Our process ensures smooth operations and impactful experiences.",
    "services": [
      {
        "title": "Stall & Booth Design",
        "description": "Custom-designed exhibition stalls and booths that reflect your brand and attract visitors. Built for functionality, visibility, and high engagement.",
        "image": "https://cdn-icons-png.flaticon.com/512/847/847968.png",
        "link": "#"
      },
      {
        "title": "Event Planning & Management",
        "description": "Complete event planning including logistics, scheduling, vendor management, coordination, and execution for smooth and stress-free events.",
        "image": "https://cdn-icons-png.flaticon.com/512/3649/3649462.png",
        "link": "#"
      },
      {
        "title": "Exhibition Stand Design",
        "description": "Professional exhibition stands designed to maximize brand presence and visitor interaction with creative layouts and high-end fabrication.",
        "image": "https://cdn-icons-png.flaticon.com/512/1019/1019709.png",
        "link": "#"
      },
      {
        "title": "Event Branding",
        "description": "End-to-end branding for events including banners, signages, stage design, digital creatives, packaging, and promotional materials.",
        "image": "https://cdn-icons-png.flaticon.com/512/2810/2810094.png",
        "link": "#"
      },
      {
        "title": "On-site Event Coordination",
        "description": "Dedicated on-ground event coordination team to ensure perfect setup, smooth flow, crowd management, and real-time support.",
        "image": "https://cdn-icons-png.flaticon.com/512/955/955707.png",
        "link": "#"
      }
    ]
  },

  "webDesignAdvantages": {
    "mainTitle": "Advantages of Professional Event & Exhibition Management",
    "sections": {
      "overview": {
        "id": "overview",
        "title": "Overview",
        "heading": "Why Professional Event Management Matters",
        "content": [
          {
            "type": "text",
            "value": "Events and exhibitions are powerful opportunities to connect with your audience, showcase your brand, and generate business. Professional management ensures everything runs smoothly and leaves a lasting impression."
          },
          {
            "type": "text",
            "value": "Here are the top advantages of working with expert event managers:"
          },
          {
            "type": "list",
            "items": [
              "1. Stress-free planning and execution",
              "2. Strong brand visibility and high engagement",
              "3. Professional stall and stand designs",
              "4. Organized logistics and seamless coordination",
              "5. Higher ROI from events and exhibitions"
            ]
          }
        ]
      },

      "conversionRate": {
        "id": "professional-design",
        "title": "1. Professional Stall & Stand Designs",
        "heading": "1. Professional Stall & Stand Designs",
        "content": [
          {
            "type": "text",
            "value": "A professionally designed stall helps you attract more visitors, display your products effectively, and create a strong brand impression."
          },
          {
            "type": "image",
            "src": "https://www.vfairs.com/wp-content/uploads/2022/10/Exhibition-Booth_Ideas.png",
            "alt": "Stall Design Banner"
          }
        ]
      },

      "userExperience": {
        "id": "smooth-execution",
        "title": "2. Smooth Execution & Planning",
        "heading": "2. Smooth Execution & Planning",
        "content": [
          {
            "type": "text",
            "value": "Proper planning prevents delays, mistakes, and confusion. Our team manages logistics, vendors, timelines, and every detail before and during the event."
          },
          {
            "type": "image",
            "src": "https://cdn.create.vista.com/api/media/small/471618374/stock-photo-event-manager-coordinator-standing-stage",
            "alt": "Event Planning Banner"
          }
        ]
      },

      "competitiveEdge": {
        "id": "branding",
        "title": "3. Strong Brand Visibility",
        "heading": "3. Strong Brand Visibility",
        "content": [
          {
            "type": "text",
            "value": "With professional event branding, your business stands out and remains memorable. High-quality visuals and consistent messaging improve trust and engagement."
          },
          {
            "type": "image",
            "src": "https://cdn.prod.website-files.com/5fc77a6843ccf14a343be27e/65f7034ef3e3f2ef183513df_event-branding.jpg",
            "alt": "Event Branding Banner"
          }
        ]
      },

      "searchRankings": {
        "id": "visitor-engagement",
        "title": "4. Better Visitor Engagement",
        "heading": "4. Better Visitor Engagement",
        "content": [
          {
            "type": "text",
            "value": "Interactive stalls, strong visuals, and efficient coordination help engage visitors more effectively, resulting in better business outcomes."
          },
          {
            "type": "image",
            "src": "https://cdn.prod.website-files.com/64074d2f1b5a0ce39e2d1e46/6530c0b029cd2276620e8b7d_engagement.png",
            "alt": "Exhibition Engagement Banner"
          }
        ]
      },

      "digitalMarketing": {
        "id": "roi",
        "title": "5. Higher ROI From Your Events",
        "heading": "5. Higher ROI From Your Events",
        "content": [
          {
            "type": "text",
            "value": "Efficient management, strong branding, and well-designed stalls help you get better leads, more visibility, and better returns from exhibitions and events."
          },
          {
            "type": "image",
            "src": "https://cdn.prod.website-files.com/602ddfc86f17b4df5a978ca7/612ebbaec0e2a77f4a32b246_return-on-investment.webp",
            "alt": "Event ROI Banner"
          }
        ]
      }
    }
  },

  "whyBuildWithBcpl": {
    "title": "Why Host Your Event With BCPL",
    "subtitle": "We design, plan, and execute events that deliver measurable impact and brand visibility.",
    "reasons": [
      { "id": 1, "reason": "Creative stall and booth designs that attract visitors." },
      { "id": 2, "reason": "Complete event planning, logistics, and on-ground coordination." },
      { "id": 3, "reason": "Strong branding for high visibility and recognition." },
      { "id": 4, "reason": "Experienced team for seamless and professional execution." }
    ]
  },

  "pageMetadata": {
    "title": "Event & Exhibition Management in Mumbai | Stall Design, Branding & Event Planning",
    "description": "Professional event and exhibition management services including stall design, event planning, exhibition stand design, event branding, and on-site coordination. Create impactful, memorable, and high-performing events.",
    "keywords": [
      "event management",
      "exhibition management",
      "stall design",
      "booth design",
      "event branding",
      "exhibition stand design",
      "event planners mumbai"
    ]
  },

  "ctaData": {
    "title": "Ready to make your event unforgettable?",
    "subheading": "Share your event goals — we’ll create a complete plan that brings your brand to life."
  },

  "faqData": [
    {
      "question": "What event and exhibition services do you offer?",
      "answer": "We offer stall and booth design, event planning, exhibition stand design, event branding, and full on-site coordination for smooth execution."
    },
    {
      "question": "Do you design custom exhibition stalls?",
      "answer": "Yes, we create fully customized stalls and booths designed to attract visitors and match your brand identity."
    },
    {
      "question": "Do you handle complete event management?",
      "answer": "Yes, we manage everything from planning, logistics, vendor coordination, branding, and setup to on-ground execution."
    },
    {
      "question": "Can you design branding materials for events?",
      "answer": "Yes, we design banners, signages, stage elements, digital creatives, standees, and more for consistent event branding."
    },
    {
      "question": "Do you provide on-site coordination during events?",
      "answer": "Yes, our team handles on-site execution including setup, scheduling, crowd management, and problem-solving."
    },
    {
      "question": "Do you work with both small and large events?",
      "answer": "Yes, we manage events of all sizes, from small brand activations to large-scale exhibitions and corporate events."
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
      <OtherServicesAndCalculator />
      <CtaSection data={pageData.ctaData} />
      <Faq data={pageData.faqData} />
    </div>
  );
};

export default EventsExhibition;