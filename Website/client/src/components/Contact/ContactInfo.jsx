'use client';

import React from 'react';
import {
  CONTACT,
  CONTACT_FORM_PROMPT,
  SHOW_PUBLIC_ADDRESS,
  SHOW_PUBLIC_PHONE,
} from '@/lib/contactConstants';

const ContactInfo = () => {
  const contactCards = [
    ...(SHOW_PUBLIC_PHONE
      ? [{ icon: 'phone', title: 'Phone Number', isPhone: true }]
      : []),
    {
      icon: 'email',
      title: 'Email Address',
      content: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: 'whatsapp',
      title: 'WhatsApp',
      content: 'Message us on WhatsApp',
      href: CONTACT.whatsappUrl,
      external: true,
    },
    {
      icon: 'clock',
      title: 'Business Hours',
      content: CONTACT.hours,
    },
  ];

  const getIcon = (type) => {
    const icons = {
      email: (
        <svg className="w-6 h-6 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      whatsapp: (
        <svg className="w-6 h-6 text-[#FF6600]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      clock: (
        <svg className="w-6 h-6 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      phone: (
        <svg className="w-6 h-6 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    };

    return icons[type] || null;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-3 tracking-tight text-gray-900 dark:text-white">
          Ready to <span className="text-[#FF6600]">Connect?</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {CONTACT_FORM_PROMPT}
        </p>
      </div>

      {(!SHOW_PUBLIC_PHONE || !SHOW_PUBLIC_ADDRESS) && (
        <div className="rounded-2xl border border-[#FF6600]/20 bg-[#FF6600]/5 p-5">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Use the form on this page to reach our team. Include your phone number in the form if you&apos;d like us to call you back.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {contactCards.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-5 p-5 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-[#FF6600]/30 transition-all duration-300 group"
          >
            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100 dark:border-zinc-700">
              {getIcon(item.icon)}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{item.title}</h3>
              {item.isPhone ? (
                <PhoneReveal
                  revealable
                  className="text-gray-600 dark:text-gray-300 font-medium"
                  linkClassName="text-gray-600 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600] transition-colors duration-200 font-medium"
                />
              ) : item.href ? (
                <a
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600] transition-colors duration-200 font-medium"
                >
                  {item.content}
                </a>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
