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

const DigitalMarketing = () => {
  const [servicesData, setServicesData] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const subNavRef = useRef(null);
  const sectionRefs = useRef({});

  // Consolidated JSON data for all components
const pageData = {
  "hero": {
    "title": "Digital Marketing Solutions That Grow Your Business",
    "subtitle": "From SEO to paid ads, we help you attract the right audience, increase conversions, and scale your brand online.",
    "highlightedText": ["grow your business"],
    "description": "We build complete digital marketing systems that improve your visibility, generate high-quality leads, and deliver measurable business results.",
    "imgUrl": "https://ik.imagekit.io/vinayak06/digi-removebg-preview.png",
    "cta": {
      "primary": "Start Your Campaign",
      "secondary": "See Our Work"
    }
  },

  "visionBanner": {
    "heading": "Effective digital marketing is simple: reach the right people, at the right time, with the right message. We help you do exactly that with result-driven marketing strategies.",
    "imageUrl": "https://img.freepik.com/premium-photo/digital-marketing_1268156-393.jpg"
  },

  "comparisonTable": {
    "category": "Digital Marketing Solutions",
    "brand": {
      "logoUrl": "https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819",
      "features": [
        "Performance-focused digital marketing strategies",
        "SEO, ads, content, and social media managed in one place",
        "Data-driven approach for consistent month-on-month growth",
        "Dedicated marketing experts for every project",
        "Transparent reporting and real-time performance tracking"
      ]
    },
    "others": [
      {
        "title": "In-House Teams",
        "points": [
          "Limited expertise across all marketing channels",
          "Small teams struggle to manage SEO + ads + content together",
          "Slower execution and fewer creative resources",
          "Higher cost with limited scalability",
          "Inconsistent results due to skill limitations"
        ]
      },
      {
        "title": "Typical Agencies",
        "points": [
          "Focus mostly on vanity metrics, not new customers",
          "High dependency on templates and automated ads",
          "Weak SEO strategies and outdated content practices",
          "No long-term marketing plan or strategy alignment",
          "Limited transparency in reporting and spending"
        ]
      }
    ]
  },

  "websiteServices": {
    "title": "Digital Marketing Services",
    "subtitle": "Our Core Marketing Solutions",
    "description": "We help your business get found online, build trust, attract the right audience, and convert traffic into paying customers. Every service is backed by research, data, and long-term strategy.",
    "services": [
      {
        "title": "SEO Optimization",
        "description": "Improve your search rankings, increase visibility, and attract organic leads with on-page SEO, off-page SEO, technical SEO, and keyword-optimized content.",
        "image": "https://cdn-icons-png.flaticon.com/512/1048/1048942.png",
        "link": "#"
      },
      {
        "title": "Online Ads Campaigns",
        "description": "High-converting ad campaigns across Google, YouTube, Meta, and LinkedIn that bring instant traffic, more leads, and measurable ROI.",
        "image": "https://cdn-icons-png.flaticon.com/512/9332/9332703.png",
        "link": "#"
      },
      {
        "title": "Social Media Marketing",
        "description": "Grow your brand presence and engage the right audience with strategic social media marketing across Instagram, Facebook, LinkedIn, and more.",
        "image": "https://cdn-icons-png.flaticon.com/512/4922/4922073.png",
        "link": "#"
      },
      {
        "title": "Social Media Page Setup",
        "description": "Complete setup of professional social media pages with optimized bios, branding, highlights, CTAs, and visuals for a strong digital presence.",
        "image": "https://cdn-icons-png.flaticon.com/512/1084/1084582.png",
        "link": "#"
      },
      {
        "title": "Social Media Content Design",
        "description": "High-quality, scroll-stopping content created for brand awareness, engagement, and conversions across all major platforms.",
        "image": "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
        "link": "#"
      },
      {
        "title": "Professional Content Writing",
        "description": "SEO-friendly content for blogs, websites, social media, ads, and landing pages that improves authority and drives conversions.",
        "image": "https://cdn-icons-png.flaticon.com/512/1828/1828961.png",
        "link": "#"
      },
      {
        "title": "Content Marketing",
        "description": "Strategic content planning and publishing to attract, educate, and convert customers through blogs, articles, guides, and more.",
        "image": "https://cdn-icons-png.flaticon.com/512/7856/7856457.png",
        "link": "#"
      }
    ]
  },

  "webDesignAdvantages": {
    "mainTitle": "Advantages of Professional Digital Marketing",
    "sections": {
      "overview": {
        "id": "overview",
        "title": "Overview",
        "heading": "Why Digital Marketing Matters",
        "content": [
          {
            "type": "text",
            "value": "Digital marketing helps your business reach the right audience, generate leads, and build long-term brand trust. It ensures consistent growth and predictable revenue."
          },
          {
            "type": "text",
            "value": "Here are the top advantages of professional digital marketing:"
          },
          {
            "type": "list",
            "items": [
              "1. Increase visibility and brand awareness",
              "2. Generate high-quality leads",
              "3. Improve website traffic and conversions",
              "4. Build strong online presence",
              "5. Achieve long-term business growth"
            ]
          }
        ]
      },

      "conversionRate": {
        "id": "conversion-rate",
        "title": "1. Generate High-Quality Leads",
        "heading": "1. Generate High-Quality Leads",
        "content": [
          {
            "type": "text",
            "value": "Targeted digital marketing campaigns help you reach users actively searching for your services. This increases lead quality and improves conversion rates."
          },
          {
            "type": "image",
            "src": "https://media.licdn.com/dms/image/D5612AQFSiHWm5deCGw/article-cover_image-shrink_600_2000/0/1698757134347?e=2147483647&v=beta&t=TfvTld7eQ0WhXGByq2RLNQrZ2wwgdLEYPyzws6Ck55c",
            "alt": "Lead Generation Banner"
          },
          {
            "type": "text",
            "value": "With clear targeting, optimized landing pages, and strong messaging — you attract users who are ready to take action."
          }
        ]
      },

      "userExperience": {
        "id": "user-experience",
        "title": "2. Increase Your Online Visibility",
        "heading": "2. Increase Your Online Visibility",
        "content": [
          {
            "type": "text",
            "value": "SEO, social media, and content marketing help you appear where your potential customers spend their time. This increases traffic, awareness, and brand recall."
          },
          {
            "type": "image",
            "src": "https://cdn.prod.website-files.com/6088f9454cf6a741d3c3062c/64fa0f738d17e09215c468ae_SEO.png",
            "alt": "SEO Visibility Banner"
          },
          {
            "type": "text",
            "value": "Higher visibility leads to more trust, more engagement, and more conversions."
          }
        ]
      },

      "competitiveEdge": {
        "id": "competitive-edge",
        "title": "3. Strengthen Your Brand",
        "heading": "3. Strengthen Your Brand",
        "content": [
          {
            "type": "text",
            "value": "Consistent branding across ads, social media, content, and SEO helps your business build a recognizable identity that customers trust."
          },
          {
            "type": "image",
            "src": "https://blog.hubspot.com/hubfs/how-to-build-a-brand.png",
            "alt": "Brand Building Banner"
          },
          {
            "type": "text",
            "value": "Strong brands outperform competitors and win long-term customer loyalty."
          }
        ]
      },

      "searchRankings": {
        "id": "search-rankings",
        "title": "4. Improve Search Rankings",
        "heading": "4. Improve Search Rankings",
        "content": [
          {
            "type": "text",
            "value": "SEO ensures your website ranks for the keywords your customers search. This brings recurring organic traffic without paying for ads."
          },
          {
            "type": "image",
            "src": "https://cdn.searchenginejournal.com/wp-content/uploads/2023/05/google-ranking-factors-64644c38d4255-sej.png",
            "alt": "Search Ranking Banner"
          }
        ]
      },

      "digitalMarketing": {
        "id": "digital-marketing",
        "title": "5. Maximize Your Marketing ROI",
        "heading": "5. Maximize Your Marketing ROI",
        "content": [
          {
            "type": "text",
            "value": "With proper tracking, analytics, and optimization — digital marketing provides transparent and measurable returns on ad spend, SEO efforts, and content marketing."
          },
          {
            "type": "image",
            "src": "https://www.meltwater.com/sites/meltwater.com/files/2022-08/marketing-roi-benefits.png",
            "alt": "Marketing ROI Banner"
          },
          {
            "type": "text",
            "value": "Better insights lead to smarter decisions and consistent business growth."
          }
        ]
      }
    }
  },

  "whyBuildWithBcpl": {
    "title": "Why Market With BCPL",
    "subtitle": "A performance-driven digital marketing partner focused on growth, visibility, and measurable results.",
    "reasons": [
      { "id": 1, "reason": "End-to-end SEO, ads, content, and social media — all managed in-house." },
      { "id": 2, "reason": "Data-backed strategies designed to increase leads and conversions." },
      { "id": 3, "reason": "Full transparency with detailed analytics and reporting." },
      { "id": 4, "reason": "We focus on long-term brand growth, not temporary results." }
    ]
  },

  "pageMetadata": {
    "title": "Digital Marketing Solutions in Mumbai | SEO, Ads, SMM & Content Services",
    "description": "Result-driven digital marketing solutions including SEO, online ads, social media marketing, content writing, and content marketing. Improve visibility, get more leads, and grow your business online.",
    "keywords": [
      "digital marketing",
      "seo optimization",
      "social media marketing",
      "online ads",
      "content writing",
      "content marketing agency",
      "digital marketing agency mumbai"
    ]
  },

  "ctaData": {
    "title": "Want to grow your business digitally? Let's get started",
    "subheading": "Bring your marketing goals — we’ll create the perfect strategy to reach your audience and convert them into loyal customers."
  },

  "faqData": [
    {
      "question": "What digital marketing services do you offer?",
      "answer": "We offer SEO, online ads, social media marketing, content creation, page setup, and content marketing to help businesses grow online."
    },
    {
      "question": "How long does digital marketing take to show results?",
      "answer": "SEO takes 2–3 months for consistent growth, while online ads and social media can show results within days or weeks depending on your goals."
    },
    {
      "question": "Do you manage social media pages?",
      "answer": "Yes, we manage your social media pages including content creation, posting, brand design, and growth strategies."
    },
    {
      "question": "Can digital marketing increase my sales?",
      "answer": "Yes. With the right SEO, ads, and content strategy, digital marketing can bring more leads, boost conversions, and increase revenue."
    },
    {
      "question": "Do you run paid ad campaigns?",
      "answer": "Yes, we run high-performance ad campaigns on Google, Facebook, Instagram, YouTube, and LinkedIn."
    },
    {
      "question": "Will you provide performance reports?",
      "answer": "Yes, we share detailed reports on traffic, leads, engagement, conversions, and ROI to track performance clearly."
    },
    {
      "question": "Do you provide content creation services?",
      "answer": "Yes, we create SEO-friendly website content, blogs, social media posts, and ad content that attracts and converts customers."
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

export default DigitalMarketing;