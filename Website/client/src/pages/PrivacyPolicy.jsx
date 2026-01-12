'use client';
import React from 'react';
import {
  Shield,
  Lock,
  Eye,
  Mail,
  Globe,
  Phone,
  MapPin,
  FileText,
  Scale,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const IconMap = {
  Eye: <Eye className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Lock: <Lock className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  AlertCircle: <AlertCircle className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PrivacyPolicy = ({ data }) => {
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-black">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative overflow-hidden bg-gradient-to-r from-orange-50 to-white dark:from-orange-950/20 dark:to-black pt-24 pb-12 md:py-20 mt-25"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-6">
              <Lock className="w-3 h-3 md:w-4 md:h-4" />
              Data Protection Policy
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {data.title.includes('Our Commitment') ? data.title : (
                <>Our Commitment to <span className="text-orange-600 dark:text-orange-500">Your Privacy</span></>
              )}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Transparent practices for trusted partnerships
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white dark:bg-zinc-900 rounded-lg px-6 py-3 shadow-sm border border-gray-200 dark:border-zinc-800">
              <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">Last Updated:</span>
              <span className="text-gray-900 dark:text-white font-semibold text-sm">{data.lastUpdated}</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
        {/* Introduction */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-8 mb-8 md:mb-12 border border-gray-100 dark:border-zinc-800"
        >
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl flex-shrink-0">
              <Shield className="w-6 h-6 text-orange-600 dark:text-orange-500" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">Our Privacy Philosophy</h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {data.intro}
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  This policy applies to all information collected through our website, services, and communications.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-8 md:space-y-12">
          {data.sections.map((section, index) => (
            <motion.section
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="scroll-mt-24"
              id={`section-${index + 1}`}
            >
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-zinc-800 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors duration-300">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-orange-50 to-white dark:from-orange-900/10 dark:to-zinc-900 px-5 py-4 md:px-8 md:py-6 border-b border-gray-100 dark:border-zinc-800">
                  <div className="flex items-start md:items-center gap-4">
                    {section.iconName && IconMap[section.iconName] && (
                      <div className="bg-orange-600 text-white p-2.5 md:p-3 rounded-xl flex-shrink-0 mt-1 md:mt-0">
                        {IconMap[section.iconName]}
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                        {section.heading}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-2">
                        <span className="text-xs md:text-sm font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-orange-100 dark:border-orange-900/50">
                          Section {index + 1}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
                          Updated {data.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Content */}
                <div className="p-5 md:p-8">
                  <div className="space-y-5 md:space-y-6">
                    {section.content.map((block, i) => {
                      if (block.type === 'paragraph') {
                        return (
                          <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                            {block.text}
                          </p>
                        );
                      }
                      if (block.type === 'list') {
                        return (
                          <div key={i} className="space-y-3 pl-1">
                            <ul className="space-y-3">
                              {block.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-1 mt-1.5 flex-shrink-0">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-600 dark:bg-orange-500 rounded-full"></div>
                                  </div>
                                  <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{item.text}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      if (block.type === 'contact') {
                        const contact = block.contactDetails;
                        return (
                          <div
                            key={i}
                            className="bg-gradient-to-br from-gray-50 to-white dark:from-zinc-800/50 dark:to-zinc-900 rounded-xl p-5 md:p-8 border border-gray-200 dark:border-zinc-700 mt-6"
                          >
                            <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="bg-orange-600 text-white p-3 rounded-xl">
                                    <Mail className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{contact.company}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{contact.tagline}</p>
                                  </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base">
                                  Our dedicated team is committed to protecting your privacy and ensuring transparent data practices.
                                </p>
                              </div>

                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <Mail className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">General Inquiries</p>
                                    <a
                                      href={`mailto:${contact.email}`}
                                      className="text-gray-900 dark:text-white text-sm md:text-base font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors break-all"
                                    >
                                      {contact.email}
                                    </a>
                                  </div>
                                </div>

                                {contact.privacyEmail && (
                                  <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Privacy Concerns</p>
                                      <a
                                        href={`mailto:${contact.privacyEmail}`}
                                        className="text-gray-900 dark:text-white text-sm md:text-base font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors break-all"
                                      >
                                        {contact.privacyEmail}
                                      </a>
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center gap-3">
                                  <Phone className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                    <span className="text-gray-900 dark:text-white text-sm md:text-base font-medium">{contact.phone}</span>
                                  </div>
                                </div>

                                {contact.website && (
                                  <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Website</p>
                                      <a
                                        href={contact.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-900 dark:text-white text-sm md:text-base font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors break-all"
                                      >
                                        {contact.website}
                                      </a>
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-start gap-3">
                                  <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Registered Office</p>
                                    <span className="text-gray-900 dark:text-white text-sm md:text-base block">{contact.address}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}

                    {section.note && (
                      <div className="mt-6 p-4 md:p-6 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl border border-orange-200 dark:border-orange-900/30">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <p
                            className="text-gray-800 dark:text-gray-200 text-sm md:text-base leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: section.note }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
