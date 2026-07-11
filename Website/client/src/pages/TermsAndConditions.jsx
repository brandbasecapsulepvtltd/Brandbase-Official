'use client';
import React from "react";
import {
  FileText,
  Scale,
  Shield,
  AlertCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LegalPolicyShell from '@/components/Legal/LegalPolicyShell';
import { TERMS_PAGE } from '@/lib/legalPageData';
import { CONTACT_FORM_PROMPT, SHOW_PUBLIC_ADDRESS, SHOW_PUBLIC_PHONE } from '@/lib/contactConstants';

const IconMap = {
  FileText: <FileText className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  AlertCircle: <AlertCircle className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TermsAndConditions = ({ data, pageConfig = TERMS_PAGE }) => {
  if (!data) return null;

  return (
    <LegalPolicyShell pageConfig={pageConfig} lastUpdated={data.lastUpdated}>
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative overflow-hidden bg-gradient-to-r from-orange-50 to-white dark:from-orange-950/20 dark:to-black pb-12 lg:pb-16"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-[#FF6600] dark:text-orange-400 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold mb-4 lg:mb-6">
              <Scale className="w-3 h-3 lg:w-4 lg:h-4" aria-hidden="true" />
              {pageConfig.badge}
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4 leading-tight">
              Terms & <span className="text-[#FF6600]">{pageConfig.heroTitleAccent || 'Conditions'}</span>
            </h1>
            <p className="text-base lg:text-xl text-gray-600 dark:text-gray-400 mb-6 lg:mb-8 leading-relaxed">
              {pageConfig.heroSubtitle}
            </p>
            <div className="inline-flex items-center gap-3 bg-white dark:bg-zinc-900 rounded-lg px-4 lg:px-6 py-2 lg:py-3 shadow-sm border border-gray-200 dark:border-zinc-800 text-sm lg:text-base">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Last Updated:</span>
              <span className="text-gray-900 dark:text-white font-semibold">{data.lastUpdated}</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Legal Notice */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8"
      >
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl lg:rounded-2xl p-4 lg:p-6">
          <div className="flex items-start gap-3 lg:gap-4">
            <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-amber-900 dark:text-amber-200 mb-1 lg:mb-2">
                Important Legal Notice
              </h3>
              <p className="text-sm lg:text-base text-amber-800 dark:text-amber-300">
                These Terms constitute a legally binding agreement between you and BrandBase Capsule Pvt. Ltd.
                By accessing or using our services, you acknowledge that you have read, understood, and agree to
                be bound by these Terms.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
        {/* Introduction */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white dark:bg-zinc-900 rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-8 mb-8 lg:mb-12 border border-gray-100 dark:border-zinc-800"
        >
          <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl lg:rounded-xl w-fit lg:w-auto">
              <Shield className="w-6 h-6 lg:w-6 lg:h-6 text-[#FF6600]" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">
                Agreement Overview
              </h2>
              <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {data.intro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-100 dark:border-zinc-800">
                <div className="text-center p-3 lg:p-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                    <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-[#FF6600]" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">Legal Contract</h4>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1">Binding agreement between you and our company</p>
                </div>
                <div className="text-center p-3 lg:p-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                    <Globe className="w-5 h-5 lg:w-6 lg:h-6 text-[#FF6600]" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">Global Standards</h4>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1">Complies with international legal frameworks</p>
                </div>
                <div className="text-center p-3 lg:p-4 sm:col-span-2 lg:col-span-1">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3">
                    <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#FF6600]" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">Clear Guidelines</h4>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1">Transparent rules for service usage</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8 lg:space-y-12">
          {data.sections.map((section, index) => (
            <motion.section
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="scroll-mt-20"
              id={`section-${index + 1}`}
            >
              <div className="bg-white dark:bg-zinc-900 rounded-xl lg:rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-zinc-800 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors duration-300">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-orange-50 to-white dark:from-orange-900/10 dark:to-zinc-900 px-4 lg:px-8 py-4 lg:py-6 border-b border-gray-100 dark:border-zinc-800">
                  <div className="flex items-start lg:items-center gap-3 lg:gap-4">
                    {section.iconName && IconMap[section.iconName] && (
                      <div className="bg-[#FF6600] text-white p-2 lg:p-3 rounded-lg lg:rounded-xl">
                        {IconMap[section.iconName]}
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {section.heading}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 lg:gap-3 mt-1 lg:mt-2">
                        <span className="text-xs lg:text-sm font-semibold text-[#FF6600] dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2 lg:px-3 py-0.5 lg:py-1 rounded-full">
                          Clause {index + 1}
                        </span>
                        <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                          Effective {data.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Content */}
                <div className="p-4 lg:p-8">
                  <div className="space-y-4 lg:space-y-6">
                    {section.content.map((item, i) => {
                      if (item.type === 'paragraph') {
                        return (
                          <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                            {item.text}
                          </p>
                        );
                      }

                      if (item.type === 'subheading') {
                        return (
                          <h3 key={i} className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mt-4 lg:mt-6 mb-3 lg:mb-4">
                            {item.text}
                          </h3>
                        );
                      }

                      if (item.type === 'list') {
                        return (
                          <div key={i} className="mt-4 lg:mt-6">
                            <div className="space-y-3 lg:space-y-4">
                              {item.items.map((listItem, idx) => (
                                <div key={idx} className="border-l-4 border-[#FF6600]/30 dark:border-orange-900/50 pl-3 lg:pl-4 py-1.5 lg:py-2">
                                  {listItem.term ? (
                                    <>
                                      <dt className="font-semibold text-gray-900 dark:text-white text-base lg:text-lg mb-0.5 lg:mb-1">
                                        {listItem.term}
                                      </dt>
                                      <dd className="text-gray-700 dark:text-gray-300 text-sm lg:text-base">
                                        {listItem.definition}
                                      </dd>
                                    </>
                                  ) : (
                                    <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base">
                                      {listItem.text}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      if (item.type === 'warning') {
                        return (
                          <div key={i} className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg lg:rounded-xl p-4 lg:p-5 mt-3 lg:mt-4">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <p className="text-red-800 dark:text-red-200 font-medium text-sm lg:text-base">
                                {item.text}
                              </p>
                            </div>
                          </div>
                        );
                      }

                      if (item.type === 'contact') {
                        const details = item.contactDetails;
                        return (
                          <div
                            key={i}
                            className="bg-gradient-to-br from-gray-50 to-white dark:from-zinc-800/50 dark:to-zinc-900 rounded-xl lg:rounded-xl p-4 lg:p-8 border border-gray-200 dark:border-zinc-700 mt-4 lg:mt-6"
                          >
                            <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
                              {section.heading}
                            </h3>

                            <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-8">
                              <div>
                                <div className="flex items-center gap-3 mb-4 lg:mb-6">
                                  <div className="bg-[#FF6600] text-white p-2 lg:p-3 rounded-lg lg:rounded-xl">
                                    <FileText className="w-4 h-4 lg:w-6 lg:h-6" />
                                  </div>
                                  <div>
                                    <h3 className="text-base lg:text-lg font-bold text-gray-900 dark:text-white">
                                      {details.company}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">Legal Department</p>
                                  </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base">
                                  For legal inquiries, contractual matters, or concerns regarding these Terms.
                                </p>
                              </div>

                              <div className="space-y-3 lg:space-y-4">
                                <div className="flex items-center gap-3">
                                  <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-[#FF6600]" aria-hidden="true" />
                                  <div>
                                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">Legal Inquiries</p>
                                    <a
                                      href={`mailto:${details.email}`}
                                      className="text-gray-900 dark:text-white font-medium hover:text-[#FF6600] transition-colors text-sm lg:text-base"
                                    >
                                      {details.email}
                                    </a>
                                  </div>
                                </div>

                                {SHOW_PUBLIC_PHONE ? (
                                <div className="flex items-center gap-3">
                                  <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-[#FF6600]" aria-hidden="true" />
                                  <div>
                                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">Phone Support</p>
                                    <Link
                                      href="/contact"
                                      className="text-gray-900 dark:text-white font-medium text-sm lg:text-base hover:text-[#FF6600] transition-colors"
                                    >
                                      {details.phone}
                                    </Link>
                                  </div>
                                </div>
                                ) : (
                                <div className="flex items-center gap-3">
                                  <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-[#FF6600]" aria-hidden="true" />
                                  <div>
                                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">Contact</p>
                                    <Link
                                      href="/contact#contact-form"
                                      className="text-gray-900 dark:text-white font-medium text-sm lg:text-base hover:text-[#FF6600] transition-colors"
                                    >
                                      {CONTACT_FORM_PROMPT}
                                    </Link>
                                  </div>
                                </div>
                                )}

                                {SHOW_PUBLIC_ADDRESS ? (
                                <div className="flex items-start gap-3">
                                  <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-[#FF6600] mt-1" aria-hidden="true" />
                                  <div>
                                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">Registered Office</p>
                                    <span className="text-gray-900 dark:text-white text-sm lg:text-base">
                                      {details.address}
                                    </span>
                                  </div>
                                </div>
                                ) : (
                                <div className="flex items-start gap-3">
                                  <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-[#FF6600] mt-1" aria-hidden="true" />
                                  <div>
                                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">Registered Office</p>
                                    <Link
                                      href="/contact#contact-form"
                                      className="text-gray-900 dark:text-white text-sm lg:text-base hover:text-[#FF6600] transition-colors"
                                    >
                                      {CONTACT_FORM_PROMPT}
                                    </Link>
                                  </div>
                                </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </main>
    </LegalPolicyShell>
  );
};

export default TermsAndConditions;
