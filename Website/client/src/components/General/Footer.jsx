import React from 'react';
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  MapPin,
  Mail,
  Phone,
  Shield,
  FileText
} from 'lucide-react';
import Link from 'next/link';

const Footer = ({ data }) => {
  const description = data?.description || "Helping startups transform ideas into reality with cutting-edge technology solutions.";
  const contactInfo = data?.contactInfo || {
    address: "Brandbase Capsule Pvt. Ltd \nOffice #204 2nd Floor, Near Bus Depot Pimpleshwar Temple, \nGulmohar Complex, Goregaon Railway Station, \nGoregaon East.",
    email: "info@brandbasecapsule.com",
    phone: "+91-9892211456"
  };
  const copyright = data?.copyright || "© 2025 Brandbase Capsule. All rights reserved.";
  const gstin = data?.gstin || "27AAFCB8754H1Z7";

  return (
    <footer className="bg-white dark:bg-zinc-900 dark:bg-black pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819"
                  alt="Brandbase Capsule Logo"
                  className="h-auto w-[40%] lg:w-[70%] block dark:hidden"
                />
                <img
                  src="https://ik.imagekit.io/vinayak06/brandbasewhite-removebg-preview.png"
                  alt="Brandbase Capsule Logo Dark"
                  className="h-auto w-[40%] lg:w-[70%] hidden dark:block"
                />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              {description}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Github size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Dynamic Columns */}
          {data?.columns && data.columns.length > 0 ? (
            data.columns.map((col, idx) => (
              <div key={idx}>
                <h3 className="text-gray-900 dark:text-gray-100 font-bold mb-6 text-xl">{col.title}</h3>
                <ul className="space-y-4 text-md">
                  {col.links.map((link, lIdx) => (
                    <FooterLink key={lIdx} href={link.href}>{link.label}</FooterLink>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <>
              {/* Column 2: Services (Fallback) */}
              <div>
                <h3 className="text-gray-900 dark:text-gray-100 font-bold mb-6 text-xl">Services</h3>
                <ul className="space-y-4 text-md">
                  <FooterLink>Digital Marketing Solutions</FooterLink>
                  <FooterLink>Website Development</FooterLink>
                  <FooterLink>App Development</FooterLink>
                  <FooterLink>Event & Exhibition Management</FooterLink>
                  <FooterLink>Data Engineering</FooterLink>
                  <FooterLink>Audio & Video Production</FooterLink>
                  <FooterLink>Branding & Creative Design</FooterLink>
                </ul>
              </div>

              {/* Column 3: Company (Fallback) */}
              <div>
                <h3 className="text-gray-900 dark:text-gray-100 font-bold mb-6 text-xl">Company</h3>
                <ul className="space-y-4 text-md">
                  <FooterLink href="/about">About Us</FooterLink>
                  <FooterLink href="/about">Team</FooterLink>
                  <FooterLink href="/services">Services</FooterLink>
                  <FooterLink href="/blogs">Blog</FooterLink>
                  <FooterLink href="/careers">Careers</FooterLink>
                  <FooterLink href="/contact">Contact Us</FooterLink>
                </ul>
              </div>
            </>
          )}

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 font-bold mb-6 text-xl">Contact</h3>
            <ul className="space-y-5">

              {/* Address */}
              <li className="flex items-start gap-3 text-gray-500 dark:text-gray-400 text-md group cursor-pointer">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-gray-400 group-hover:text-orange-400 transition-colors"
                />
                <span className="relative leading-relaxed whitespace-pre-line">
                  {contactInfo.address}
                </span>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm group cursor-pointer">
                <Mail
                  size={18}
                  className="shrink-0 text-gray-400 group-hover:text-orange-400 transition-colors"
                />
                <Link href={`mailto:${contactInfo.email}`} className="relative">
                  {contactInfo.email}
                </Link>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm group cursor-pointer">
                <Phone
                  size={18}
                  className="shrink-0 text-gray-400 group-hover:text-orange-400 transition-colors"
                />
                <Link href={`tel:${contactInfo.phone}`} className="relative">
                  {contactInfo.phone}
                </Link>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom Section with Links and Copyright */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {(data?.legalLinks && data.legalLinks.length > 0 ? data.legalLinks : [
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy-policy" }
              ]).map((link, idx, arr) => (
                <React.Fragment key={idx}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-orange-400 transition-colors text-sm group"
                  >
                    {link.label === "Privacy Policy" ? <Shield size={16} className="group-hover:text-orange-400 transition-colors" /> : <FileText size={16} className="group-hover:text-orange-400 transition-colors" />}
                    <span>{link.label}</span>
                  </Link>
                  {idx < arr.length - 1 && <div className="h-4 w-px bg-gray-300"></div>}
                </React.Fragment>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {copyright}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Registered in India | GSTIN: {gstin}
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

// Reusable Component for Links
const FooterLink = ({ children, href = "#" }) => {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-800 dark:text-gray-200 text-sm inline-block relative group"
      >
        <span className="group-hover:text-orange-400 transition-colors duration-300">
          {children}
        </span>
        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-orange-400 transition-all duration-300 ease-out group-hover:w-full"></span>
      </Link>
    </li>
  );
};

// Social Icon Component
const SocialIcon = ({ icon }) => {
  return (
    <a
      href="#"
      className="bg-white dark:bg-zinc-900 dark:bg-black border border-gray-100 p-2.5 rounded-xl text-gray-500 dark:text-gray-400 shadow-sm 
                 hover:text-orange-400 hover:shadow-md hover:-translate-y-1 
                 transition-all duration-300"
    >
      {icon}
    </a>
  );
};

export default Footer;
