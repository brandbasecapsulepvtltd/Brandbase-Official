import React, { useState, useEffect } from "react";
import { User, Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onHome = location.pathname === "/";
    setIsHome(onHome);

    const handleScroll = () => setScrolled(window.scrollY > 100);

    if (onHome) {
      setScrolled(window.scrollY > 100);
      window.addEventListener("scroll", handleScroll);
    } else {
      setScrolled(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const navClasses = isHome
    ? scrolled
      ? "backdrop-blur-md bg-[#f8f8f0]/80 text-[#FF6600] shadow-sm border-b border-orange-100"
      : "bg-gradient-to-b from-black/60 to-transparent text-white"
    : "backdrop-blur-md bg-white text-[#FF6600] shadow-sm border-b border-orange-100";

  const textColor = isHome && !scrolled ? "text-white" : "text-[#FF6600]";
  const hoverColor = isHome && !scrolled ? "bg-white" : "bg-[#FF6600]";

  // Services data structure
  const services = [
    {
      category: "Digital Marketing",
      items: [
        "SEO Optimization",
        "Online Ads Campaigns",
        "Social Media Marketing",
        "Social Media Page Setup",
        "Social Media Content Design",
        "Professional Content Writing",
        "Content Marketing"
      ]
    },
    {
      category: "Branding & Creative Design",
      items: [
        "Brand Development",
        "Brand Identity Messaging",
        "Brand Guidelines",
        "Rebranding Services",
        "Logo Design",
        "Social Media Design",
        "Ad Creative Design",
        "Presentation Design",
        "Email Design",
        "Illustrations & Iconography",
      ]
    },
    {
      category: "Audio & Video Production",
      items: [
        "Corporate A/V Production",
        "Corporate Films",
        "Promotional Videos",
        "Event Videos",
        "Wedding Videos",
        "Product Videos",
        "Motion Graphics",
        "Digital Ads (Reels/Shorts)",
        "Video Editing"
      ]
    },
    {
      category: "Website Development",
      items: [
        "Business Website",
        "Portfolio Website",
        "Landing Page Development",
        "CMS Website",
        "E-Commerce Websites",
        "Full E-Commerce Setup"
      ]
    },
    {
      category: "Mobile App Development",
      items: [
        "Android App Development",
        "iOS App Development",
        "Hybrid App Development",
        "UI/UX for Apps",
        "Backend API Development"
      ]
    }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-serif ${navClasses}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 md:px-10 py-4">
        {/* Logo - Conditionally rendered based on route and scroll state */}
        <Link to="/" className="flex items-center">
          {isHome && !scrolled ? (
            // Special logo for home page when not scrolled
            <img 
              src="https://ik.imagekit.io/vinayak06/ChatGPT_Image_Nov_19__2025__11_18_45_AM-removebg-preview.png?updatedAt=1763531380777"
              alt="Brandbase capsule Logo" 
              className="h-20 w-auto"
            />
          ) : (
            // Default logo for all other cases
            <img 
              src="https://www.brandbasecapsule.com/assets/img/logo.png"
              alt="Brandbase capsule Logo" 
              className="h-17 w-auto"
            />
          )}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-xl relative">
          {["/", "/about"].map((path, i) => {
            const labels = ["Home", "About"];
            return (
              <Link
                key={path}
                to={path}
                className={`relative group ${textColor} transition`}
              >
                {labels[i]}
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColor} transition-all duration-300 group-hover:w-full`}
                ></span>
              </Link>
            );
          })}
          
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={`relative group flex items-center gap-1 ${textColor} transition`}
            >
              Services
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
              />
              <span
                className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColor} transition-all duration-300 group-hover:w-full`}
              ></span>
            </button>

            {/* Dropdown Menu - With max height and scroll */}
            <div
              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-500 ease-in-out ${
                servicesOpen 
                  ? "opacity-100 visible translate-y-0 scale-100" 
                  : "opacity-0 invisible -translate-y-4 scale-95 pointer-events-none"
              }`}
              style={{ minWidth: "1200px", maxHeight: "calc(100vh - 100px)" }}
            >
              <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                <div className="p-8 grid grid-cols-5 gap-8">
                  {services.map((service, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="font-bold text-lg text-gray-900 border-b-2 border-orange-500 pb-2">
                        {service.category}
                      </h3>
                      <ul className="space-y-2">
                        {service.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              to="/services"
                              className="text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm block py-1"
                              onClick={() => setServicesOpen(false)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* View All Services Button - Fixed at bottom */}
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <Link
                  to="/services"
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
                  onClick={() => setServicesOpen(false)}
                >
                  View All Services
                </Link>
              </div>
            </div>
          </div>

          {/* Other Menu Items */}
          {["/blogs", "/contact"].map((path, i) => {
            const labels = ["Blogs", "Contact Us"];
            return (
              <Link
                key={path}
                to={path}
                className={`relative group ${textColor} transition`}
              >
                {labels[i]}
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColor} transition-all duration-300 group-hover:w-full`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Icons + Mobile Toggle */}
        <div className={`flex items-center gap-4 sm:gap-5 ${textColor}`}>
          <button className="hover:opacity-70 transition">
            <User size={22} />
          </button>
          <button className="hover:opacity-70 transition">
            <Search size={22} />
          </button>
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <>{/*empty*/}</> : <Menu size={26} />}
          </button>
        </div>
      </div>

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
                to={path}
                onClick={() => setIsOpen(false)}
                className="w-full py-2 border-b border-gray-700 hover:text-orange-400 transition text-center"
              >
                {labels[i]}
              </Link>
            );
          })}
          
          {/* Mobile Services Accordion */}
          <div className="w-full border-b border-gray-700">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full py-2 flex items-center justify-between hover:text-orange-400 transition"
            >
              <span className="translate-x-35">Services</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            {/* Mobile Services Dropdown */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                servicesOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-4 space-y-6">
                {services.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-bold text-gray-900 border-l-4 border-orange-500 pl-3">
                      {service.category}
                    </h3>
                    <ul className="space-y-1 pl-4">
                      {service.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link
                            to="/services"
                            className="text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm block py-1"
                            onClick={() => {
                              setIsOpen(false);
                              setServicesOpen(false);
                            }}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* Mobile View All Button */}
              <div className="pt-4 border-t border-gray-300">
                <Link
                  to="/services"
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                  onClick={() => {
                    setIsOpen(false);
                    setServicesOpen(false);
                  }}
                >
                  View All Services
                </Link>
              </div>
            </div>
          </div>

          {/* Other Mobile Menu Items */}
          {["/offers", "/contact"].map((path, i) => {
            const labels = ["Offers", "Contact Us"];
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className="w-full py-2 border-b border-gray-700 hover:text-orange-400 transition text-center"
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