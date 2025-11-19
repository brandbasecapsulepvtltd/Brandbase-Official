import React, { useState, useEffect } from "react";
import { User, Search, ShoppingCart, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [scrolled, setScrolled] = useState(false);
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
        <div className="hidden md:flex gap-8 text-xl">
          {["/", "/about", "/services", "/offers", "/contact"].map((path, i) => {
            const labels = ["Home", "About", "Services", "Offers", "Contact Us"];
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
        className={`fixed inset-0 h-full w-full md:hidden transform transition-transform duration-300 ease-in-out z-[60] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } text-black`}
      >
        <div className="relative flex justify-center items-center px-6 py-4 border-b border-gray-700 bg-[#f8f8f0]/90 mt-20">
          <h2 className="text-2xl font-bold text-[#FF6600]">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
            className="absolute right-6 text-[#FF6600] hover:opacity-70 transition"
          >
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col items-center px-6 py-6 gap-5 text-lg bg-[#f8f8f0]/90 text-[#FF6600]">
          {["/", "/about", "/services", "/offers", "/contact"].map((path, i) => {
            const labels = ["Home", "About", "Services", "Offers", "Contact Us"];
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

        <div className="mt-auto p-6 border-t border-gray-700 text-center text-sm text-gray-900 bg-[#f8f8f0]/90">
          © {new Date().getFullYear()} Brandbase Capsule
        </div>
      </div>
    </nav>
  );
};

export default Navbar;