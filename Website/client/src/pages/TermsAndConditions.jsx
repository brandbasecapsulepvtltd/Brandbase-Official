'use client';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, Shield, AlertCircle, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const termsData = {
  title: 'Terms and Conditions',
  lastUpdated: 'December 17, 2025',
  intro: 'Welcome to Brandbase Capsule. These Terms and Conditions govern your use of our website and services. Please read them carefully before accessing or using our platform.',
  sections: [
    {
      icon: <FileText className="w-5 h-5" />,
      heading: 'Interpretation and Definitions',
      content: [
        {
          type: 'paragraph',
          text: 'The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.'
        },
        {
          type: 'subheading',
          text: 'Definitions'
        },
        {
          type: 'list',
          items: [
            {
              term: 'Affiliate',
              definition: 'means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.'
            },
            {
              term: 'Country',
              definition: 'refers to: India'
            },
            {
              term: 'Company',
              definition: '(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Brandbase Capsule Pvt. Ltd.'
            },
            {
              term: 'Device',
              definition: 'means any device that can access the Service such as a computer, a cellphone or a digital tablet.'
            },
            {
              term: 'Service',
              definition: 'refers to the Website.'
            },
            {
              term: 'Terms and Conditions',
              definition: '(also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.'
            },
            {
              term: 'Third-party Social Media Service',
              definition: 'means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.'
            },
            {
              term: 'Website',
              definition: 'refers to Brandbase Capsule Pvt. Ltd, accessible from https://brandbasecapsule.com/'
            },
            {
              term: 'You',
              definition: 'means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.'
            }
          ]
        }
      ]
    },
    {
      icon: <Scale className="w-5 h-5" />,
      heading: 'Acknowledgment',
      content: [
        {
          type: 'paragraph',
          text: 'These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.'
        },
        {
          type: 'paragraph',
          text: 'Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms apply to all visitors, users and others who access or use the Service.'
        },
        {
          type: 'paragraph',
          text: 'By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms, then You may not access the Service.'
        },
        {
          type: 'warning',
          text: 'You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.'
        },
        {
          type: 'paragraph',
          text: 'Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company.'
        }
      ]
    },
    {
      icon: <Globe className="w-5 h-5" />,
      heading: 'Links to Other Websites',
      content: [
        {
          type: 'paragraph',
          text: 'Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.'
        },
        {
          type: 'paragraph',
          text: 'The Company assumes no responsibility for the content, privacy policies, or practices of any third-party websites or services.'
        }
      ]
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      heading: 'Termination',
      content: [
        {
          type: 'paragraph',
          text: 'We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.'
        },
        {
          type: 'paragraph',
          text: 'Upon termination, Your right to use the Service will cease immediately.'
        }
      ]
    },
    {
      heading: '"AS IS" and "AS AVAILABLE" Disclaimer',
      content: [
        {
          type: 'paragraph',
          text: 'The Service is provided to You "AS IS" and "AS AVAILABLE" without warranty of any kind, whether express or implied.'
        },
        {
          type: 'paragraph',
          text: 'The Company does not warrant that the Service will be uninterrupted, error-free, or free of harmful components.'
        }
      ]
    },
    {
      heading: 'Governing Law',
      content: [
        {
          type: 'paragraph',
          text: 'The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service.'
        }
      ]
    },
    {
      heading: 'Disputes Resolution',
      content: [
        {
          type: 'paragraph',
          text: 'If You have any dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.'
        }
      ]
    },
    {
      heading: 'Severability and Waiver',
      content: [
        {
          type: 'paragraph',
          text: 'If any provision of these Terms is held to be unenforceable, the remaining provisions will remain in effect.'
        }
      ]
    },
    {
      heading: 'Translation Interpretation',
      content: [
        {
          type: 'paragraph',
          text: 'The original English version shall prevail in case of dispute.'
        }
      ]
    },
    {
      heading: 'Changes to These Terms and Conditions',
      content: [
        {
          type: 'paragraph',
          text: 'We reserve the right to modify or replace these Terms at any time. Continued use of the Service means acceptance of the revised Terms.'
        }
      ]
    },
    {
      heading: 'Contact Us',
      content: [
        {
          type: 'paragraph',
          text: 'If you have any questions about these Terms and Conditions, You can contact us:'
        },
        {
          type: 'contact',
          details: {
            email: 'info@brandbasecapsule.com',
            phone: '+91 9892211456',
            address: 'Office #204, 2nd Floor, Near Bus Depot Pimpleshwar Temple, Gulmohar Complex, Goregaon Railway Station, Goregaon East, India',
            company: 'Brandbase Capsule Pvt. Ltd.'
          }
        }
      ]
    }
  ]
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative overflow-hidden bg-gradient-to-r from-orange-50 to-white py-16"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Scale className="w-4 h-4" />
              Legal Agreement
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Terms & <span className="text-orange-600">Conditions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Governing your use of our digital services and platform
            </p>
            <div className="inline-flex items-center gap-3 bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-200">
              <span className="text-gray-500 font-medium">Last Updated:</span>
              <span className="text-gray-900 font-semibold">{termsData.lastUpdated}</span>
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
        className="max-w-6xl mx-auto px-6 py-8"
      >
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Important Legal Notice</h3>
              <p className="text-amber-800">
                These Terms constitute a legally binding agreement between you and Brandbase Capsule Pvt. Ltd. 
                By accessing or using our services, you acknowledge that you have read, understood, and agree to 
                be bound by these Terms.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100"
        >
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {termsData.intro}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
                <div className="text-center p-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Legal Contract</h4>
                  <p className="text-sm text-gray-600 mt-1">Binding agreement between you and our company</p>
                </div>
                <div className="text-center p-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Global Standards</h4>
                  <p className="text-sm text-gray-600 mt-1">Complies with international legal frameworks</p>
                </div>
                <div className="text-center p-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Clear Guidelines</h4>
                  <p className="text-sm text-gray-600 mt-1">Transparent rules for service usage</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-12">
          {termsData.sections.map((section, index) => (
            <motion.section
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="scroll-mt-20"
              id={`section-${index + 1}`}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-orange-200 transition-colors duration-300">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-orange-50 to-white px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    {section.icon && (
                      <div className="bg-orange-600 text-white p-3 rounded-xl">
                        {section.icon}
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {section.heading}
                      </h2>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                          Clause {index + 1}
                        </span>
                        <span className="text-sm text-gray-500">
                          Effective {termsData.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Content */}
                <div className="p-8">
                  <div className="space-y-6">
                    {section.content.map((item, i) => {
                      if (item.type === 'paragraph') {
                        return (
                          <p key={i} className="text-gray-700 leading-relaxed">
                            {item.text}
                          </p>
                        );
                      }
                      
                      if (item.type === 'subheading') {
                        return (
                          <h3 key={i} className="text-xl font-semibold text-gray-900 mt-6 mb-4">
                            {item.text}
                          </h3>
                        );
                      }
                      
                      if (item.type === 'list') {
                        return (
                          <div key={i} className="mt-6">
                            <div className="space-y-4">
                              {item.items.map((listItem, idx) => (
                                <div key={idx} className="border-l-4 border-orange-200 pl-4 py-2">
                                  <dt className="font-semibold text-gray-900 text-lg mb-1">
                                    {listItem.term}
                                  </dt>
                                  <dd className="text-gray-700">
                                    {listItem.definition}
                                  </dd>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      
                      if (item.type === 'warning') {
                        return (
                          <div key={i} className="bg-red-50 border border-red-200 rounded-xl p-5 mt-4">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <p className="text-red-800 font-medium">
                                {item.text}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      
                      if (item.type === 'contact') {
                        return (
                          <div 
                            key={i}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 mt-6"
                          >
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                              {section.heading}
                            </h3>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="bg-orange-600 text-white p-3 rounded-xl">
                                    <FileText className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-bold text-gray-900">{item.details.company}</h3>
                                    <p className="text-gray-600">Legal Department</p>
                                  </div>
                                </div>
                                <p className="text-gray-700">
                                  For legal inquiries, contractual matters, or concerns regarding these Terms.
                                </p>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <Mail className="w-5 h-5 text-orange-600" />
                                  <div>
                                    <p className="text-sm text-gray-500">Legal Inquiries</p>
                                    <a 
                                      href={`mailto:${item.details.email}`}
                                      className="text-gray-900 font-medium hover:text-orange-600 transition-colors"
                                    >
                                      {item.details.email}
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <Phone className="w-5 h-5 text-orange-600" />
                                  <div>
                                    <p className="text-sm text-gray-500">Phone Support</p>
                                    <span className="text-gray-900 font-medium">{item.details.phone}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                                  <div>
                                    <p className="text-sm text-gray-500">Registered Office</p>
                                    <span className="text-gray-900">{item.details.address}</span>
                                  </div>
                                </div>
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
    </div>
  );
};

export default TermsAndConditions;