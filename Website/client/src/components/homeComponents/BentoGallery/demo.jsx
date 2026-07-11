"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Maximize2, Minus, ArrowUpRight, BarChart3, Users, TrendingUp, Target } from "lucide-react"
import { cn } from "@/lib/utils"

// --- UPDATED DATA STRUCTURE ---
{/*
  {
    id: 1,
    companyLogo: "https://logo.clearbit.com/technova.com",
    companyName: "TechNova Solutions",
    industry: "Software & Technology",
    title: "Complete Digital Transformation & Brand Strategy",
    desc: "Led a comprehensive digital transformation including website redesign, digital marketing strategy, and brand positioning that resulted in significant market growth.",
    url: "https://images.unsplash.com/photo-1522071823991-b59fea12f45a?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522071823991-b59fea12f45a?w=800&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
    ],
    services: ["Digital Marketing", "Website Development", "Brand Strategy", "Social Media Management"],
    results: [
      { value: "300%", label: "Lead Increase" },
      { value: "65%", label: "Engagement Growth" },
      { value: "2.8X", label: "ROI" },
      { value: "40%", label: "Cost Reduction" },
    ],
    testimonial: {
      quote: "Brandbase Capsule transformed our digital presence completely. Their strategic approach and execution excellence delivered results beyond our expectations.",
      author: "Alex Johnson",
      role: "CEO, TechNova Solutions",
      avatar: "https://i.pravatar.cc/150?u=alex"
    },
    span: "md:col-span-2 md:row-span-2",
  },
*/}

const imageItems = [

  {
    id: 2,
    companyLogo: "https://logo.clearbit.com/stripe.com",
    companyName: "SwiftPay FinTech",
    industry: "Financial Services",
    title: "Mobile Wallet UI/UX Overhaul",
    desc: "Redesigning the payment experience for over 2 million users, focusing on security, speed, and intuitive navigation.",
    url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=800&q=80"
    ],
    services: ["UI/UX Design", "Mobile Development", "FinTech Strategy"],
    results: [
      { value: "92%", label: "User Satisfaction" },
      { value: "15s", label: "Avg Transaction" },
      { value: "4.9", label: "App Store Rating" },
      { value: "22%", label: "Churn Reduction" },
    ],
    testimonial: {
      quote: "The new interface is a game changer for our customers. Adoption rates skyrocketed within the first month of launch.",
      author: "Sarah Chen",
      role: "Product Lead, SwiftPay",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 3,
    companyLogo: "https://logo.clearbit.com/nike.com",
    companyName: "Velocity Sportswear",
    industry: "E-commerce & Retail",
    title: "Global Omnichannel Marketing",
    desc: "A worldwide campaign integrating offline retail experiences with a seamless online purchasing journey.",
    url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
    ],
    services: ["E-commerce Strategy", "Content Production", "SEO/SEM"],
    results: [
      { value: "140%", label: "Online Sales" },
      { value: "3.5M", label: "Reach" },
      { value: "25%", label: "Retention" },
      { value: "18%", label: "CAC Reduction" },
    ],
    testimonial: {
      quote: "Our brand voice has never been clearer. The omnichannel approach drove foot traffic and web sales simultaneously.",
      author: "Marcus Thorne",
      role: "Marketing Director",
      avatar: "https://i.pravatar.cc/150?u=marcus"
    },
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 4,
    companyLogo: "https://logo.clearbit.com/tesla.com",
    companyName: "EcoCurrent Energy",
    industry: "Renewable Energy",
    title: "Renewable Energy Brand Identity",
    desc: "Rebranding a traditional energy provider into a future-facing green energy leader through visual storytelling.",
    url: "https://images.unsplash.com/photo-1466611653911-95282fc3656b?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1466611653911-95282fc3656b?w=800&q=80",
      "https://images.unsplash.com/photo-1509391366360-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
    ],
    services: ["Brand Identity", "Motion Graphics", "Web Design"],
    results: [
      { value: "50k+", label: "New Subs" },
      { value: "85%", label: "Brand Recall" },
      { value: "12", label: "Design Awards" },
      { value: "200%", label: "PR Coverage" },
    ],
    testimonial: {
      quote: "The visual language developed for EcoCurrent perfectly captures our mission for a sustainable future.",
      author: "Elena Rodriguez",
      role: "Sustainability Officer",
      avatar: "https://i.pravatar.cc/150?u=elena"
    },
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 5,
    companyLogo: "https://logo.clearbit.com/coursera.org",
    companyName: "EduPulse Learning",
    industry: "EdTech",
    title: "Interactive LMS Platform",
    desc: "Developing a custom Learning Management System with gamified features to increase student engagement.",
    url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
    ],
    services: ["Full-stack Development", "UX Research", "Gamification"],
    results: [
      { value: "75%", label: "Completion Rate" },
      { value: "3x", label: "User Session Time" },
      { value: "1M+", label: "Active Learners" },
      { value: "90%", label: "Teacher Approval" },
    ],
    testimonial: {
      quote: "Learning has become an addiction for our students. The platform is intuitive and incredibly fun to use.",
      author: "Dr. Julian Voss",
      role: "Dean of Innovation",
      avatar: "https://i.pravatar.cc/150?u=julian"
    },
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 6,
    companyLogo: "https://logo.clearbit.com/airbnb.com",
    companyName: "Wanderlust Travel",
    industry: "Travel & Hospitality",
    title: "AI-Powered Travel Itineraries",
    desc: "Integrating machine learning to provide personalized travel recommendations based on user behavior.",
    url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80"
    ],
    services: ["AI/ML Integration", "Cloud Architecture", "Product Design"],
    results: [
      { value: "45%", label: "Booking Conv." },
      { value: "120%", label: "User Growth" },
      { value: "4.2m", label: "Queries/Day" },
      { value: "15%", label: "Lower API Costs" },
    ],
    testimonial: {
      quote: "The AI recommendations feel like they know our users better than they know themselves. Conversion is through the roof.",
      author: "Emily Zhao",
      role: "CTO, Wanderlust",
      avatar: "https://i.pravatar.cc/150?u=emily"
    },
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 7,
    companyLogo: "https://logo.clearbit.com/wholefoodsmarket.com",
    companyName: "GustoBites",
    industry: "Food & Beverage",
    title: "DTC Subscription Model Launch",
    desc: "Scaling a local organic food delivery service into a nationwide subscription-based powerhouse.",
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80"
    ],
    services: ["Growth Marketing", "Web Development", "Logistics Strategy"],
    results: [
      { value: "$2M", label: "Monthly Rev" },
      { value: "80%", label: "Repeat Customers" },
      { value: "5/5", label: "Freshness Rating" },
      { value: "35%", label: "Waste Reduction" },
    ],
    testimonial: {
      quote: "Scaling from 100 to 10,000 customers was only possible with the robust backend and growth engine they built.",
      author: "Chef Gordon L.",
      role: "Founder, GustoBites",
      avatar: "https://i.pravatar.cc/150?u=gordon"
    },
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 8,
    companyLogo: "https://logo.clearbit.com/zillow.com",
    companyName: "PrimeSpace Reality",
    industry: "Real Estate",
    title: "Virtual Property Tours 2.0",
    desc: "An immersive WebGL-based property viewing platform that allows buyers to explore homes in 3D from anywhere.",
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80"
    ],
    services: ["3D Rendering", "Frontend Dev", "VR Strategy"],
    results: [
      { value: "400%", label: "Time on Site" },
      { value: "50%", label: "Faster Closing" },
      { value: "10k", label: "Monthly Tours" },
      { value: "28%", label: "Intl. Sales" },
    ],
    testimonial: {
      quote: "Our international buyers can now close deals with confidence without ever stepping foot on the property.",
      author: "Robert Sterling",
      role: "Sales Lead",
      avatar: "https://i.pravatar.cc/150?u=robert"
    },
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 9,
    companyLogo: "https://logo.clearbit.com/nvidia.com",
    companyName: "NeuralCore AI",
    industry: "Artificial Intelligence",
    title: "SaaS Product Growth Engine",
    desc: "Optimizing the conversion funnel for a B2B AI analytics tool through data-driven A/B testing and SEO.",
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
    ],
    services: ["Performance Marketing", "Data Analytics", "Conversion Optimization"],
    results: [
      { value: "210%", label: "MQL Increase" },
      { value: "12%", label: "LTV Increase" },
      { value: "4.5X", label: "ROAS" },
      { value: "30%", label: "Lower CPA" },
    ],
    testimonial: {
      quote: "The technical precision of their marketing strategy is exactly what a deep-tech company like ours needed.",
      author: "Dr. Aris Thorne",
      role: "Head of Growth",
      avatar: "https://i.pravatar.cc/150?u=aris"
    },
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 10,
    companyLogo: "https://logo.clearbit.com/caterpillar.com",
    companyName: "BuiltRight",
    industry: "Construction",
    title: "Field-to-Office CRM Sync",
    desc: "A custom mobile-first CRM for construction workers to log progress and sync with project managers in real-time.",
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=800&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
    ],
    services: ["Mobile App Dev", "Cloud Infrastructure", "Systems Integration"],
    results: [
      { value: "0", label: "Data Lag" },
      { value: "20h", label: "Saved Weekly" },
      { value: "100%", label: "Compliance" },
      { value: "$150k", label: "Annual Savings" },
    ],
    testimonial: {
      quote: "Communication between the job site and the office has never been this smooth. No more paperwork errors.",
      author: "Frank Miller",
      role: "Operations Manager",
      avatar: "https://i.pravatar.cc/150?u=frank"
    },
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: 11,
    companyLogo: "https://logo.clearbit.com/crowdstrike.com",
    companyName: "ShieldGuard",
    industry: "Cybersecurity",
    title: "Brand Authority & Content Strategy",
    desc: "Establishing a new cybersecurity firm as a thought leader through high-impact technical whitepapers and PR.",
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
      "https://images.unsplash.com/photo-1510511459019-5dee2c1a7eaa?w=800&q=80"
    ],
    services: ["Content Marketing", "Public Relations", "SEO"],
    results: [
      { value: "15", label: "Top-tier Press" },
      { value: "200k", label: "Organic Visits" },
      { value: "50+", label: "Fortune 500 Leads" },
      { value: "88%", label: "Auth Score" },
    ],
    testimonial: {
      quote: "We went from unknown to being quoted in the Wall Street Journal in under six months.",
      author: "Kevin H.",
      role: "VP of Sales",
      avatar: "https://i.pravatar.cc/150?u=kevin"
    },
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 12,
    companyLogo: "https://logo.clearbit.com/vogue.com",
    companyName: "VelvetThread",
    industry: "Fashion & Apparel",
    title: "Influencer-Led Branding",
    desc: "Creating a viral buzz for a luxury streetwear brand launch via social-first content and creator partnerships.",
    url: "https://images.unsplash.com/photo-1445205170230-053b830c6050?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1445205170230-053b830c6050?w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
    ],
    services: ["Social Media", "Video Production", "Influencer Strategy"],
    results: [
      { value: "20M", label: "Impressions" },
      { value: "Sold Out", label: "Launch Status" },
      { value: "450k", label: "New Followers" },
      { value: "12%", label: "Engagement" },
    ],
    testimonial: {
      quote: "The hype they built was incredible. Our site crashed from traffic 5 minutes after the drop—in a good way!",
      author: "Sasha Kim",
      role: "Creative Director",
      avatar: "https://i.pravatar.cc/150?u=sasha"
    },
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 13,
    companyLogo: "https://logo.clearbit.com/bmw.com",
    companyName: "Velocity Motors",
    industry: "Automotive",
    title: "Digital Showroom Experience",
    desc: "A high-end web platform where customers can customize their dream car and book home test drives.",
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80"
    ],
    services: ["Custom Web App", "API Integration", "UX Strategy"],
    results: [
      { value: "60%", label: "Conversion" },
      { value: "5k", label: "Monthly Leads" },
      { value: "4.8/5", label: "User Rating" },
      { value: "20%", label: "Ops Efficiency" },
    ],
    testimonial: {
      quote: "They managed to replicate the premium feel of our physical showrooms in a digital browser.",
      author: "Hans Weber",
      role: "Digital Transformation Lead",
      avatar: "https://i.pravatar.cc/150?u=hans"
    },
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 14,
    companyLogo: "https://logo.clearbit.com/sephora.com",
    companyName: "GlowAura",
    industry: "Cosmetics",
    title: "Virtual Makeup Try-On",
    desc: "Using Augmented Reality (AR) to let users try on lipstick and eyeshadow shades through their smartphone camera.",
    url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=800&q=80"
    ],
    services: ["AR Development", "UI Design", "Mobile Web"],
    results: [
      { value: "3.5x", label: "Basket Size" },
      { value: "40%", label: "Return Decr." },
      { value: "1M+", label: "Try-ons" },
      { value: "25%", label: "AOV Increase" },
    ],
    testimonial: {
      quote: "Returns were our biggest cost. The AR tool has almost eliminated 'shade regret' for our customers.",
      author: "Michelle Tan",
      role: "E-comm Manager",
      avatar: "https://i.pravatar.cc/150?u=michelle"
    },
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 15,
    companyLogo: "https://logo.clearbit.com/charitywater.org",
    companyName: "HeartFound",
    industry: "Non-Profit",
    title: "Global Donation Ecosystem",
    desc: "Building a transparent, blockchain-based donation platform that tracks every dollar from donor to project.",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80"
    ],
    services: ["Web3 / Blockchain", "UX Design", "Global Scaling"],
    results: [
      { value: "$12M", label: "Raised" },
      { value: "100%", label: "Transparency" },
      { value: "50+", label: "Countries" },
      { value: "0", label: "Fee Leakage" },
    ],
    testimonial: {
      quote: "Trust is the currency of charity. This platform has made us the most trusted non-profit in our sector.",
      author: "David G.",
      role: "Executive Director",
      avatar: "https://i.pravatar.cc/150?u=david"
    },
    span: "md:col-span-2 md:row-span-1",
  }
];

// --- RESPONSIVE MODAL COMPONENT ---
// --- REPLACED MODAL COMPONENT (MATCHING CLIENTS STYLE) ---
const ImageModal = ({ item, onClose }) => {
  const [currentImg, setCurrentImg] = useState(0);

  // Gallery slider logic
  const hasMultipleImages = item.galleryImages && item.galleryImages.length > 1;

  const nextImg = (e) => {
    e?.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImg((prev) => (prev + 1) % item.galleryImages.length);
    }
  };

  const prevImg = (e) => {
    e?.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImg((prev) => (prev - 1 + item.galleryImages.length) % item.galleryImages.length);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-black relative rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable Container */}
        <div className="overflow-y-auto custom-scrollbar">

          {/* Modal Header / Image Section */}
          <div className="relative group">
            <figure className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImg}
                  src={item.galleryImages?.[currentImg] || item.url}
                  alt={`${item.companyName} project showcase`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </figure>

            {/* Slider Controls (Only if multiple images) */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {item.galleryImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${currentImg === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black rounded-full p-2 transition-all duration-300 hover:scale-110 shadow-sm z-10 text-gray-900 dark:text-white"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Floating Logo Badge (Transparent Background) */}
            <div className="absolute -bottom-6 left-5 md:bottom-4 md:left-4 z-20">
              <img
                src={item.companyLogo}
                alt={item.companyName}
                className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Modal Content */}
          <div className="pt-10 px-5 pb-8 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                  {item.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#FF6600] text-white rounded-full text-xs md:text-sm font-medium">
                    {item.industry}
                  </span>
                  {item.services.slice(0, 3).map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-full text-xs md:text-sm font-medium border border-gray-200 dark:border-zinc-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results Highlight */}
              {item.results && item.results.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 min-w-[140px] text-center md:text-left">
                  <div className="text-green-600 dark:text-green-400 font-bold text-xl md:text-2xl">
                    {item.results[0].value}
                  </div>
                  <div className="text-green-800 dark:text-green-300 text-xs md:text-sm font-medium mt-1">
                    {item.results[0].label}
                  </div>
                </div>
              )}
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-600 dark:text-gray-300 md:text-gray-400 text-base md:text-lg leading-relaxed text-left">
                {item.desc}
              </p>
            </div>

            {/* Key Achievements Grid */}
            {item.results && item.results.some(r => r.value && r.label) && (
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
                role="list"
                aria-label="Key achievements"
              >
                {item.results
                  .filter(res => res.value && res.label)
                  .map((res, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center p-3 md:p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl md:rounded-2xl border border-gray-100 dark:border-zinc-800"
                      role="listitem"
                    >
                      <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                        {res.value}
                      </div>
                      <div className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400 font-medium leading-tight text-center mt-1">
                        {res.label}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Removed CTA Button as requested */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN GALLERY COMPONENT ---
export default function InteractiveImageBentoGallery({ data }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dragConstraint, setDragConstraint] = useState(0);
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const targetRef = useRef(null);

  // Use data from props or fallback to imageItems (static data)
  // Check if data is provided and has caseStudies array with items
  const displayItems = data?.caseStudies && data.caseStudies.length > 0 ? data.caseStudies : imageItems;

  useEffect(() => {
    const calculateConstraints = () => {
      if (gridRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const gridWidth = gridRef.current.scrollWidth;
        const constraint = Math.min(0, containerWidth - gridWidth - 32);
        setDragConstraint(constraint);
      }
    };

    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  return (
    <section ref={targetRef} className="relative w-full overflow-hidden bg-white dark:bg-black py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {data?.heading || 'Case Studies'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          {data?.subHeading || 'Explore our digital transformation projects across industries'}
        </p>
      </div>

      <div ref={containerRef} className="relative w-full cursor-grab active:cursor-grabbing">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8"
        >
          {displayItems.map((item) => (
            <motion.div
              key={item.id ?? item.companyName}
              className={cn(
                "relative h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500"
              )}
              onClick={() => setSelectedItem(item)}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={item.url}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded bg-white dark:bg-black/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                      <img src={item.companyLogo} alt="logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-orange-300 text-xs font-bold uppercase tracking-wider">
                      {item.companyName}
                    </span>
                  </div>
                  <h3 className="text-white text-lg sm:text-xl font-bold leading-tight mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between">
                  {/*                  <span className="text-white/70 text-xs font-medium px-3 py-1 bg-white dark:bg-zinc-900 dark:bg-black/10 backdrop-blur-sm rounded-full">
                    View Case Study
                  </span>*/}
                  <div className="w-8 h-8 rounded-full bg-black dark:bg-black/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-orange-500 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="flex justify-center mt-8 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-8 h-2 rounded-full bg-orange-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedItem && <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </section >
  );
}
