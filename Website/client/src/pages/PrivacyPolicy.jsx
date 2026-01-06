'use client';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Mail, Globe, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const privacyPolicyData = {
  title: 'Privacy Policy',
  lastUpdated: 'December 17, 2025',
  intro: 'At Brandbase Capsule, we prioritize your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data when you engage with our services.',
  sections: [
    {
      icon: <Eye className="w-5 h-5" />,
      heading: 'Information We Collect',
      points: [
        'We gather information through various interactions:',
        {
          list: [
            'Form submissions on our website',
            'Quote requests and callback inquiries',
            'Newsletter subscriptions',
            'Direct communications via email, chat, or phone',
          ],
        },
        'The data collected may include:',
        {
          list: [
            'Personal identification (name, email, phone)',
            'Professional details (company name, role)',
            'Project requirements and specifications',
            'Technical data (IP address, browser information)',
            'Usage patterns through analytics',
          ],
        },
      ],
      note: 'We do not collect sensitive financial or government identification data unless explicitly required for service delivery—and only with your express consent.',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      heading: 'How We Use Your Information',
      points: [
        'Your information enables us to:',
        {
          list: [
            'Facilitate effective communication',
            'Deliver tailored services and solutions',
            'Provide relevant updates (with your consent)',
            'Enhance website functionality and user experience',
            'Comply with legal and regulatory requirements',
          ],
        },
      ],
      note: 'We maintain strict confidentiality and never sell or trade your personal data. Third-party tools are employed only when necessary, with robust data protection measures in place.',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      heading: 'Data Protection & Security',
      points: [
        'We implement comprehensive security protocols including:',
        {
          list: [
            'Advanced encryption technologies',
            'Secure server infrastructure',
            'Regular security audits and updates',
            'Strict access controls and authentication',
          ],
        },
        'While we employ industry-best practices, we recommend exercising caution when sharing sensitive information online.',
      ],
    },
    {
      icon: <Lock className="w-5 h-5" />,
      heading: 'Cookies & Tracking Technologies',
      points: [
        'Our website utilizes:',
        {
          list: [
            'Essential cookies for core functionality',
            'Analytical cookies (Google Analytics)',
            'Performance optimization cookies',
            'Preference-based cookies',
          ],
        },
        'You retain full control over cookie preferences through your browser settings.',
      ],
    },
    {
      heading: 'Third-Party Services',
      points: [
        'We collaborate with trusted partners for enhanced service delivery:',
        {
          list: [
            'Communication platforms (Calendly, email services)',
            'Analytical tools (Google Analytics, Hotjar)',
            'Project management systems',
            'Cloud storage and backup solutions',
          ],
        },
        'All third-party providers are carefully vetted for compliance with data protection standards.',
      ],
    },
    {
      heading: 'Your Data Rights',
      points: [
        'You have the right to:',
        {
          list: [
            'Access your personal information',
            'Request data correction or updating',
            'Withdraw consent for data processing',
            'Request data deletion (subject to legal requirements)',
            'Opt-out of marketing communications',
          ],
        },
      ],
      note: `To exercise these rights, contact our Data Protection Officer at <a href="mailto:privacy@brandbasecapsule.com" class="text-orange-600 hover:text-orange-700 font-semibold transition-colors break-all">privacy@brandbasecapsule.com</a>.`,
    },
    {
      heading: 'Policy Updates',
      points: [
        'We regularly review and update this policy to reflect:',
        {
          list: [
            'Changes in regulatory requirements',
            'Technological advancements',
            'Evolving business practices',
            'User feedback and industry standards',
          ],
        },
        'Significant updates will be prominently communicated through our website.',
      ],
    },
    {
      heading: 'Contact Information',
      points: [
        'For privacy-related inquiries or concerns:',
        {
          contact: {
            company: 'Brandbase Capsule Pvt. Ltd.',
            tagline: 'Transforming Brands with Digital Excellence',
            email: 'info@brandbasecapsule.com',
            privacyEmail: 'privacy@brandbasecapsule.com',
            website: 'https://brandbasecapsule.com',
            phone: '+91 98922 11456',
            address: 'Office #204, 2nd Floor, Gulmohar Complex, Near Pimpleshwar Temple, Goregaon Railway Station, Mumbai - 400063',
          },
        },
      ],
    },
  ],
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative overflow-hidden bg-gradient-to-r from-orange-50 to-white pt-24 pb-12 md:py-20 mt-5"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-6">
              <Lock className="w-3 h-3 md:w-4 md:h-4" />
              Data Protection Policy
            </div>
            {/* Responsive Text Sizes */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Our Commitment to <span className="text-orange-600">Your Privacy</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Transparent practices for trusted partnerships
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-200">
              <span className="text-gray-500 font-medium text-sm">Last Updated:</span>
              <span className="text-gray-900 font-semibold text-sm">{privacyPolicyData.lastUpdated}</span>
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
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 md:mb-12 border border-gray-100"
        >
          {/* Stack vertically on mobile, row on tablet+ */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-xl flex-shrink-0">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Our Privacy Philosophy</h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {privacyPolicyData.intro}
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm md:text-base text-gray-600">
                  This policy applies to all information collected through our website, services, and communications.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-8 md:space-y-12">
          {privacyPolicyData.sections.map((section, index) => (
            <motion.section
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="scroll-mt-24"
              id={`section-${index + 1}`}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-orange-200 transition-colors duration-300">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-orange-50 to-white px-5 py-4 md:px-8 md:py-6 border-b border-gray-100">
                  <div className="flex items-start md:items-center gap-4">
                    {section.icon && (
                      <div className="bg-orange-600 text-white p-2.5 md:p-3 rounded-xl flex-shrink-0 mt-1 md:mt-0">
                        {section.icon}
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-lg md:text-2xl font-bold text-gray-900 leading-tight">
                        {section.heading}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-2">
                        <span className="text-xs md:text-sm font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-orange-100">
                          Section {index + 1}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 hidden sm:inline">
                          Updated {privacyPolicyData.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Content */}
                <div className="p-5 md:p-8">
                  <div className="space-y-5 md:space-y-6">
                    {section.points.map((point, i) => {
                      if (typeof point === 'string') {
                        return (
                          <p key={i} className="text-gray-700 leading-relaxed text-sm md:text-base">
                            {point}
                          </p>
                        );
                      }
                      if (point.list) {
                        return (
                          <div key={i} className="space-y-3 pl-1">
                            <ul className="space-y-3">
                              {point.list.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="bg-orange-100 rounded-full p-1 mt-1.5 flex-shrink-0">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-600 rounded-full"></div>
                                  </div>
                                  <span className="text-gray-700 text-sm md:text-base">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      if (point.contact) {
                        return (
                          <div 
                            key={i}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 md:p-8 border border-gray-200 mt-6"
                          >
                            <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="bg-orange-600 text-white p-3 rounded-xl">
                                    <Mail className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{point.contact.company}</h3>
                                    <p className="text-sm text-gray-600">{point.contact.tagline}</p>
                                  </div>
                                </div>
                                <p className="text-gray-700 mb-6 text-sm md:text-base">
                                  Our dedicated team is committed to protecting your privacy and ensuring transparent data practices.
                                </p>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <Mail className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-gray-500">General Inquiries</p>
                                    <a 
                                      href={`mailto:${point.contact.email}`}
                                      className="text-gray-900 text-sm md:text-base font-medium hover:text-orange-600 transition-colors break-all"
                                    >
                                      {point.contact.email}
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <Shield className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-gray-500">Privacy Concerns</p>
                                    <a 
                                      href={`mailto:${point.contact.privacyEmail}`}
                                      className="text-gray-900 text-sm md:text-base font-medium hover:text-orange-600 transition-colors break-all"
                                    >
                                      {point.contact.privacyEmail}
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <Phone className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-gray-500">Phone</p>
                                    <span className="text-gray-900 text-sm md:text-base font-medium">{point.contact.phone}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <Globe className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-gray-500">Website</p>
                                    <a 
                                      href={point.contact.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-900 text-sm md:text-base font-medium hover:text-orange-600 transition-colors break-all"
                                    >
                                      {point.contact.website}
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-gray-500">Registered Office</p>
                                    <span className="text-gray-900 text-sm md:text-base block">{point.contact.address}</span>
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
                      <div className="mt-6 p-4 md:p-6 bg-orange-50/50 rounded-xl border border-orange-200">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <p 
                            className="text-gray-800 text-sm md:text-base leading-relaxed"
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
