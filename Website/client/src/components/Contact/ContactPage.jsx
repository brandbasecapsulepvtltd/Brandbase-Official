'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Calendar, ArrowRight, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import ContactInfo from './ContactInfo';
import ContactFAQ from './ContactFAQ';
import GlobalPresence from './GlobalPresence';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import { api } from '@/lib/api';
import { CONTACT, CONTACT_FAQS } from '@/lib/contactConstants';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  organization: '',
  contactNumber: '',
  region: '',
  industry: '',
  category: '',
  message: '',
  consent: false,
  marketing: false,
};

const FORM_OPTIONS = {
  regions: ['Asia', 'Europe', 'America', 'Africa', 'Oceania'],
  industries: ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Other'],
  categories: [
    'Web Design',
    'Web/Mobile Application',
    'Film Making',
    'Digital Marketing',
    'E-commerce Deployment',
    'SHM',
    'LMS',
    'Other',
  ],
};

const QUICK_CONTACT = [
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: CONTACT.whatsappUrl },
  { icon: FileText, label: 'Contact Form', value: 'Send a message', href: '#contact-form' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message || !formData.consent) {
      setStatus({ type: 'error', message: 'Please fill all required fields and accept the privacy consent.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (formData.contactNumber && !/^[\d\s\-\+\(\)]{10,}$/.test(formData.contactNumber)) {
      setStatus({ type: 'error', message: 'Please enter a valid phone number.' });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      const response = await api.createContact(formData);

      if (response.success) {
        setStatus({
          type: 'success',
          message: response.emailSent
            ? "Message sent! We've also emailed you a confirmation."
            : 'Message submitted successfully. Our team will get back to you within 24 hours.',
        });
        setFormData(INITIAL_FORM);
      } else {
        setStatus({ type: 'error', message: 'Failed to submit form. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 mt-15 bg-white dark:bg-zinc-950 relative">
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pb-20 px-4 md:px-8 overflow-hidden border-b border-gray-100 dark:border-zinc-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF6600]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact', href: '/contact' },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-widest text-[#FF6600] mb-4"
          >
            Let&apos;s Build What&apos;s Next
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
          >
            Ready to Unlock Growth?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] to-orange-500">
              So Are We.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Whether you&apos;re refining an idea or ready to launch, our team is here with strategic guidance
            and technical excellence. Let&apos;s turn your challenges into success stories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
            >
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Schedule a Call
            </Link>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white font-semibold rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Quick contact strip */}
      <section className="py-8 px-4 bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800" aria-label="Quick contact options">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-4">
          {QUICK_CONTACT.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-[#FF6600]/40 hover:shadow-md transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
            >
              <div className="p-3 rounded-lg bg-[#FF6600]/10 text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white transition-colors">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
          <ContactInfo />

          <div id="contact-form" className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800 p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Send us a Message</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {status && (
              <div
                role="alert"
                className={`flex items-start gap-3 p-4 rounded-xl text-sm ${
                  status.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                {['firstName', 'lastName'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="text-sm font-medium block mb-1">
                      {field === 'firstName' ? 'First Name *' : 'Last Name *'}
                    </label>
                    <input
                      id={field}
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      autoComplete={field === 'firstName' ? 'given-name' : 'family-name'}
                      className="w-full border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="text-sm font-medium block mb-1">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    className="w-full border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="text-sm font-medium block mb-1">Organization *</label>
                  <input
                    id="organization"
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    autoComplete="organization"
                    className="w-full border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactNumber" className="text-sm font-medium block mb-1">Contact Number *</label>
                <input
                  id="contactNumber"
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  autoComplete="tel"
                  className="w-full border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors"
                  required
                  placeholder="+91 12345 67890"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {['region', 'industry'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="text-sm font-medium block mb-1">
                      {field === 'region' ? 'Region *' : 'Industry *'}
                    </label>
                    <select
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors"
                      required
                    >
                      <option value="">Select</option>
                      {FORM_OPTIONS[field === 'region' ? 'regions' : 'industries'].map((opt) => (
                        <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="category" className="text-sm font-medium block mb-1">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors"
                  required
                >
                  <option value="">Select Category</option>
                  {FORM_OPTIONS.categories.map((opt) => (
                    <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium block mb-1">How can we help you? *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  maxLength={1500}
                  className="w-full border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors resize-y"
                  required
                  placeholder="Describe your project or inquiry..."
                />
                <div className="text-xs text-right text-gray-500 dark:text-gray-400 mt-1">
                  {formData.message.length}/1500
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <input
                    id="consent"
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 text-[#FF6600] focus:ring-[#FF6600]"
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-300">
                    I consent to processing of my personal data for Brandbase Capsule to contact me. *
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    id="marketing"
                    type="checkbox"
                    name="marketing"
                    checked={formData.marketing}
                    onChange={handleInputChange}
                    className="mt-1 text-[#FF6600] focus:ring-[#FF6600]"
                  />
                  <label htmlFor="marketing" className="text-sm text-gray-600 dark:text-gray-300">
                    I would like to receive details about products, services, and events from Brandbase Capsule.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-white py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
              >
                {loading ? (
                  <>
                    <span>Sending...</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-zinc-800 pt-4">
                For more information on how your data is processed, see our{' '}
                <Link href="/privacy-policy" className="text-[#FF6600] underline hover:no-underline">
                  Privacy Notice
                </Link>
                . * Mandatory fields
              </p>
            </form>
          </div>
        </div>
      </section>

      <GlobalPresence />
      <ContactFAQ items={CONTACT_FAQS} />
    </div>
  );
}
