'use client';

import React, { useState, useEffect, useRef } from "react";
import { Search, Menu, X, ChevronDown, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GlobalSearch from "./GlobalSearch";
import ThemeToggle from "./ThemeToggle";
import TopBar from "./TopBar";
import { motion, AnimatePresence } from "framer-motion";
import {
  getDefaultNavbarServices,
  normalizeNavbarDirectLinks,
  normalizeNavbarServices,
} from "@/lib/navbarServices";

const Navbar = ({ data, topBarData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const pathname = usePathname();

  const timeoutRef = useRef(null);

  useEffect(() => {
    const locationArr = ["/", "/services/events-exhibition/stall-design"];
    const onHome = locationArr.includes(pathname);
    setIsHome(onHome);

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (onHome) {
        setScrolled(currentScrollY > 300);
      }

      // TopBar Logic
      if (currentScrollY < 50) {
        setShowTopBar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowTopBar(false); // Scrolling down
      } else {
        setShowTopBar(true); // Scrolling up
      }

      lastScrollY = currentScrollY;
    };

    if (onHome) {
      setScrolled(window.scrollY > 300);
    } else {
      setScrolled(true);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  const navClasses = isHome
    ? scrolled
      ? "backdrop-blur-md bg-[#f8f8f0]/95 dark:bg-black/90 text-[#FF6600] shadow-sm border-b border-orange-100 dark:border-zinc-800"
      : "backdrop-blur-md bg-gradient-to-b from-black/85 via-black/65 to-black/30 text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
    : "backdrop-blur-md bg-white/95 dark:bg-zinc-900/95 text-[#FF6600] shadow-sm border-b border-orange-100 dark:border-zinc-800";

  const navLinkClass =
    isHome && !scrolled
      ? "text-white font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
      : "text-[#FF6600] font-medium";

  const hoverColor = isHome && !scrolled ? "bg-white" : "bg-[#FF6600]";
  const showHeroLogo = isHome && !scrolled;

  const defaultServices = getDefaultNavbarServices();

  const services = normalizeNavbarServices(
    data?.services?.length ? data.services : defaultServices,
    data?.directLinkServices || []
  );
  const directLinkServices = normalizeNavbarDirectLinks();
  const logoLight = data?.logoLight || "https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819";
  const logoDark = data?.logoDark || "https://ik.imagekit.io/vinayak06/brandbasewhite-removebg-preview.png";

  const handleLinkClick = () => {
    setIsOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans flex flex-col ${navClasses}`}>
      <AnimatePresence>
        {showTopBar && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <TopBar data={topBarData} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-8xl mx-auto flex justify-between items-center px-6 sm:px-8 md:px-12 lg:px-16 py-4 w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src={logoLight}
            alt="BrandBase Capsule logo"
            className={`h-17 w-auto ${showHeroLogo ? "hidden" : "block dark:hidden"}`}
            width={180}
            height={60}
          />
          <img
            src={logoDark}
            alt="BrandBase Capsule logo"
            className={`h-17 w-auto ${showHeroLogo ? "block" : "hidden dark:block"}`}
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
              className={`relative group ${navLinkClass} transition`}
            >
              {i === 0 ? "Home" : "About"}
              <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColor} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
          ))}

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className={`relative group flex items-center gap-1 ${navLinkClass} transition`}>
              Services
              <ChevronDown size={16} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColor} transition-all duration-300 group-hover:w-full`}></span>
            </button>

            <div
              className={`absolute top-full left-1/2 transform -translate-x-1/2 pt-4 transition-all duration-300 ease-in-out ${servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"}`}
              style={{ minWidth: "920px" }}
            >
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
                <div className="p-8">
                  <div className="grid grid-cols-5 gap-6 items-start">
                    {services.map((service, index) => (
                      <div key={index} className="flex flex-col">
                        <Link
                          href={service.categoryLink}
                          className="min-h-[4.75rem] flex flex-col justify-end font-bold text-lg leading-tight text-gray-900 dark:text-gray-100 border-b-2 border-orange-500 pb-2.5 mb-3 hover:text-orange-600 transition-colors"
                          onClick={handleLinkClick}
                        >
                          {service.category}
                        </Link>
                        <ul className="space-y-1.5">
                          {service.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                href={item.link}
                                className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 transition-colors duration-200 text-base block py-1 hover:pl-2 transition-all"
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

                  {directLinkServices.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 mt-6">
                    <div className="grid grid-cols-2 gap-6">
                      {directLinkServices.map((service, index) => (
                        <Link
                          key={index}
                          href={service.link}
                          className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg hover:bg-orange-50 dark:hover:bg-zinc-700 transition-all duration-300 border border-transparent hover:border-orange-200"
                          onClick={handleLinkClick}
                        >
                          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-orange-600">
                            {service.category}
                          </h3>
                          <div className="text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            →
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 dark:bg-zinc-800 p-4">
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

          {["/portfolio", "/blogs", "/contact"].map((path, i) => {
            const labels = ["Portfolio", "Blogs", "Contact Us"];
            return (
              <Link key={path} href={path} className={`relative group ${navLinkClass} transition`}>
                {labels[i]}
                <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${hoverColor} transition-all duration-300 group-hover:w-full`}></span>
              </Link>
            );
          })}
        </div>

        {/* Icons + Mobile Toggle */}
        <div className={`flex items-center gap-6 sm:gap-7 ${navLinkClass}`}>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <a href="/event-calendar" className="hover:opacity-70 transition">
            <Calendar size={24} />
          </a>
          <GlobalSearch />
          <div className="flex items-center md:hidden">
            <button className="" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 h-screen w-full md:hidden transform transition-transform duration-300 ease-in-out z-[60] ${isOpen ? "translate-x-0" : "translate-x-full"
          } text-black dark:text-white flex flex-col`}
      >
        <div className="relative flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-zinc-800 bg-[#f8f8f0] dark:bg-black mt-20 flex-shrink-0">
          <ThemeToggle />
          <h2 className="text-2xl font-bold text-[#FF6600]">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
            className="text-[#FF6600] hover:opacity-70 transition"
          >
            <X size={26} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#f8f8f0]/90 dark:bg-black/95">
          <div className="flex flex-col items-center px-6 py-6 gap-5 text-lg text-[#FF6600]">
            {["/", "/about"].map((path, i) => (
              <Link
                key={path}
                href={path}
                onClick={handleLinkClick}
                className="w-full py-3 border-b border-gray-300 dark:border-zinc-800 hover:text-orange-400 transition text-center font-medium"
              >
                {i === 0 ? "Home" : "About"}
              </Link>
            ))}

            {/* Mobile Services Accordion */}
            <div className="w-full border-b border-gray-300 dark:border-zinc-800">
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

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${mobileServicesOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="py-4 space-y-6">
                  {services.map((service, index) => (
                    <div key={index} className="space-y-2">
                      <Link
                        href={service.categoryLink}
                        className="font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 border-l-4 border-orange-500 pl-3 hover:text-orange-600 transition-colors block"
                        onClick={handleLinkClick}
                      >
                        {service.category}
                      </Link>
                      <ul className="space-y-1 pl-4">
                        {service.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={item.link}
                              className="text-gray-600 dark:text-gray-300 dark:text-gray-400 hover:text-orange-600 transition-colors duration-200 text-sm block py-1 hover:pl-2 transition-all"
                              onClick={handleLinkClick}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
                    {directLinkServices.map((service, index) => (
                      <Link
                        key={index}
                        href={service.link}
                        className="block font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 border-l-4 border-orange-500 pl-3 py-2 hover:text-orange-600 transition-colors bg-gray-50 dark:bg-zinc-900 dark:bg-zinc-800 rounded-r-lg"
                        onClick={handleLinkClick}
                      >
                        {service.category}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-300 dark:border-zinc-800 mt-4">
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

            {["/portfolio", "/blogs", "/contact"].map((path, i) => {
              const labels = ["Portfolio", "Blogs", "Contact Us"];
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={handleLinkClick}
                  className="w-full py-3 border-b border-gray-300 dark:border-zinc-800 hover:text-orange-400 transition text-center font-medium"
                >
                  {labels[i]}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-gray-700 dark:border-zinc-800 text-center text-sm text-gray-900 dark:text-gray-100 dark:text-gray-400 bg-[#f8f8f0]/90 dark:bg-black/95 flex-shrink-0">
          © {new Date().getFullYear()} Brandbase Capsule
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
