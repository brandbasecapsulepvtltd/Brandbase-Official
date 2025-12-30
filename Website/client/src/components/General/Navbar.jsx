'use client';

import React, { useState, useEffect, useRef } from "react";
import { User, Search, Menu, X, ChevronDown, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GlobalSearch from "./GlobalSearch";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  
  // Ref to handle the closing timeout for a smooth "hover" experience
  const timeoutRef = useRef(null);

  useEffect(() => {
    const locationArr = ["/", "/services/events-exhibition/stall-design"];
    const onHome = locationArr.includes(pathname);
    setIsHome(onHome);

    const handleScroll = () => setScrolled(window.scrollY > 300);

    if (onHome) {
      setScrolled(window.scrollY > 300);
      window.addEventListener("scroll", handleScroll);
    } else {
      setScrolled(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  // Smooth hover handlers
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    // Small delay before closing to allow mouse to travel over gaps
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150); 
  };

  const navClasses = isHome
    ? scrolled
      ? "backdrop-blur-md bg-[#f8f8f0]/80 text-[#FF6600] shadow-sm border-b border-orange-100"
      : "bg-gradient-to-b from-black/60 to-transparent text-white"
    : "backdrop-blur-md bg-white text-[#FF6600] shadow-sm border-b border-orange-100";

  const textColor = isHome && !scrolled ? "text-white" : "text-[#FF6600]";
  const hoverColor = isHome && !scrolled ? "bg-white" : "bg-[#FF6600]";

  const services = [
    {
      category: "Digital Marketing Solutions",
      categoryLink: "/services/digital-marketing",
      items: [
        { name: "SEO Optimization", link: "/services/digital-marketing/seo-optimization" },
        { name: "Online Ads Campaigns", link: "/services/digital-marketing/online-ads-campaigns" },
        { name: "Social Media Marketing", link: "/services/digital-marketing/social-media-marketing" },
        { name: "Social Media Page Setup", link: "/services/digital-marketing/social-media-page-setup" },
        { name: "Social Media Content Design", link: "/services/digital-marketing/social-media-content-design" },
        { name: "Professional Content Writing", link: "/services/digital-marketing/content-writing" },
      ]
    },
    {
      category: "Website Development",
      categoryLink: "/services/website-development",
      items: [
        { name: "Business Website", link: "/services/website-development/business-website" },
        { name: "Portfolio Website", link: "/services/website-development/portfolio-website" },
        { name: "Landing Page Development", link: "/services/website-development/landing-page-development" },
        { name: "CMS Website", link: "/services/website-development/cms-website" },
        { name: "E-Commerce Websites", link: "/services/website-development/ecommerce-websites" },
        { name: "Dynamic and Static ", link: "/services/website-development/dynamic-static" }
      ]
    },
    {
      category: "Mobile App Development",
      categoryLink: "/services/mobile-app-development",
      items: [
        { name: "Android App Development", link: "/services/mobile-app-development/android-app-development" },
        { name: "iOS App Development", link: "/services/mobile-app-development/ios-app-development" },
        { name: "UI/UX for Apps", link: "/services/mobile-app-development/ui-ux-design" },
        { name: "Cross-platform App", link: "/services/mobile-app-development/cross-platform-app-development" },
        { name: "app maintenance support", link: "/services/mobile-app-development/app-maintenance-support" }
      ]
    },
    {
      category: "Event & Exhibition Management",
      categoryLink: "/services/events-exhibition",
      items: [
        { name: "Stall & Booth Design", link: "/services/events-exhibition/stall-design" },
        { name: "Event Planning & Management", link: "/services/events-exhibition/event-planning-management" },
        { name: "Wedding Service", link: "/services/events-exhibition/wedding-service" },
        { name: "Event Branding", link: "/services/events-exhibition/event-branding" },
        { name: "On-site Event Coordination", link: "/services/events-exhibition/onsite-event-coordination" }
      ]
    }
  ];

  const directLinkServices = [
    { category: "Branding & Creative Design", link: "/services/branding-design" },
    { category: "Audio & Video Production", link: "/services/av-production" }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-serif ${navClasses}`}>
      <div className="max-w-8xl mx-auto flex justify-between items-center px-6 sm:px-8 md:px-12 lg:px-16 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img 
            src={isHome && !scrolled ? "https://ik.imagekit.io/vinayak06/brandbasewhite-removebg-preview.png" : "https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819"}
            alt="Brandbase capsule Logo" 
            className="h-17 w-auto"
            width={180}
            height={60}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-xl relative">
          {["/", "/about"].map((path, i) => (
            <Link
              key={path}
              href={path}
              className={`relative group ${textColor} transition`}
            >
              {i === 0 ? "Home" : "About"}
              <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColor} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
          ))}
          
          {/* Services Dropdown - WRAPPER */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className={`relative group flex items-center gap-1 ${textColor} transition`}>
              Services
              <ChevronDown size={16} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColor} transition-all duration-300 group-hover:w-full`}></span>
            </button>

            {/* Dropdown Menu Container */}
            <div
              className={`absolute top-full left-1/2 transform -translate-x-1/2 pt-4 transition-all duration-300 ease-in-out ${
                servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}
              style={{ minWidth: "1000px" }}
            >
              {/* Inner content box */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-y-auto p-8" style={{ maxHeight: "70vh" }}>
                  <div className="grid grid-cols-4 gap-8 mb-8">
                    {services.map((service, index) => (
                      <div key={index} className="space-y-4">
                        <Link
                          href={service.categoryLink}
                          className="font-bold text-xl text-gray-900 border-b-2 border-orange-500 pb-2 hover:text-orange-600 transition-colors block"
                          onClick={handleLinkClick}
                        >
                          {service.category}
                        </Link>
                        <ul className="space-y-2">
                          {service.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                href={item.link}
                                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-lg block py-1 hover:pl-2 transition-all"
                                onClick={handleLinkClick}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <div className="grid grid-cols-2 gap-8">
                      {directLinkServices.map((service, index) => (
                        <Link
                          key={index}
                          href={service.link}
                          className="group flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-all duration-300 border border-transparent hover:border-orange-200"
                          onClick={handleLinkClick}
                        >
                          <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600">
                            {service.category}
                          </h3>
                          <div className="text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            →
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <Link
                    href="/services"
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-all"
                    onClick={handleLinkClick}
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
{/*"/careers" "Careers" */}
          {["/portfolio", "/blogs", "/contact"].map((path, i) => {
            const labels = ["Portfolio", "Blogs", "Contact Us"];
            return (
              <Link key={path} href={path} className={`relative group ${textColor} transition`}>
                {labels[i]}
                <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColor} transition-all duration-300 group-hover:w-full`}></span>
              </Link>
            );
          })}
        </div>

        {/* Icons + Mobile Toggle */}
        <div className={`flex items-center gap-6 sm:gap-7 ${textColor}`}>
          <a href="https://brandbase-nu.vercel.app/event-calendar" className="hover:opacity-70 transition">
            <Calendar size={24} />
          </a>
          <GlobalSearch/>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

{/*          <button className="hover:opacity-70 transition"><Search size={24} /></button>*/}          
        </div>
      </div>

      {/* Mobile Menu (unchanged logic, applied handleLinkClick) */}
      {/* ... keeping your mobile logic for consistency ... */}
     {/* Mobile Menu */}
      <div
        className={`fixed inset-0 h-screen w-full md:hidden transform transition-transform duration-300 ease-in-out z-[60] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } text-black flex flex-col`}
      >
        <div className="relative flex justify-center items-center px-6 py-4 border-b border-gray-700 bg-[#f8f8f0]/90 mt-20 flex-shrink-0">
          <h2 className="text-2xl font-bold text-[#FF6600]">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
            className="absolute right-6 text-[#FF6600] hover:opacity-70 transition"
          >
            <X size={26} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#f8f8f0]/90">
          <div className="flex flex-col items-center px-6 py-6 gap-5 text-lg text-[#FF6600]">
            {["/", "/about"].map((path, i) => {
              const labels = ["Home", "About"];
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={handleLinkClick}
                  className="w-full py-3 border-b border-gray-300 hover:text-orange-400 transition text-center font-medium"
                >
                  {labels[i]}
                </Link>
              );
            })}
            
            {/* Mobile Services Accordion */}
            <div className="w-full border-b border-gray-300">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full py-3 flex items-center justify-center gap-2 hover:text-orange-400 transition font-medium relative"
              >
                <span>Services</span>
                <ChevronDown 
                  size={18} 
                  className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''} absolute right-4`}
                />
              </button>
              
              {/* Mobile Services Dropdown */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  mobileServicesOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="py-4 space-y-6">
                  {/* Main services */}
                  {services.map((service, index) => (
                    <div key={index} className="space-y-2">
                      <Link
                        href={service.categoryLink}
                        className="font-bold text-gray-900 border-l-4 border-orange-500 pl-3 hover:text-orange-600 transition-colors block"
                        onClick={handleLinkClick}
                      >
                        {service.category}
                      </Link>
                      <ul className="space-y-1 pl-4">
                        {service.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={item.link}
                              className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm block py-1 hover:pl-2 transition-all"
                              onClick={handleLinkClick}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Direct link services */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    {directLinkServices.map((service, index) => (
                      <Link
                        key={index}
                        href={service.link}
                        className="block font-bold text-gray-900 border-l-4 border-orange-500 pl-3 py-2 hover:text-orange-600 transition-colors bg-gray-50 rounded-r-lg"
                        onClick={handleLinkClick}
                      >
                        {service.category}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Mobile View All Button */}
                <div className="pt-4 border-t border-gray-300 mt-4">
                  <Link
                    href="/services"
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                    onClick={handleLinkClick}
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </div>

            {/* Other Mobile Menu Items "/careers" "Careers" */}
            {["/portfolio", "/blogs", "/contact"].map((path, i) => {
              const labels = ["Portfolio", "Blogs", "Contact Us"];
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={handleLinkClick}
                  className="w-full py-3 border-b border-gray-300 hover:text-orange-400 transition text-center font-medium"
                >
                  {labels[i]}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-gray-700 text-center text-sm text-gray-900 bg-[#f8f8f0]/90 flex-shrink-0">
          © {new Date().getFullYear()} Brandbase Capsule
        </div>
      </div>


    </nav>
  );
};

export default Navbar;