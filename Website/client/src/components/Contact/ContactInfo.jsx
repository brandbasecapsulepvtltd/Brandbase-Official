'use client';
import React from 'react';

const ContactInfo = ({ contactData }) => {
  const getIcon = (type) => {
    const icons = {
      location: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      phone: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      email: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      clock: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };

    return icons[type] || null;
  };

  if (!contactData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          Ready to <span className="text-[#FF6600]">Connect?</span>
        </h2>
        <p className="text-gray-600">
          {contactData.contactInfo.description}
        </p>
      </div>

      {/* Contact Information Cards */}
      <div className="space-y-6">
        {contactData.contactInfo.items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white dark:bg-black p-6 rounded-xl shadow hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
          >
            <div className="bg-[#FFF0E6] p-3 rounded-xl flex-shrink-0">
              {getIcon(item.icon)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-gray-200">{item.title}</h3>
              {item.href ? (
                <a 
                  href={item.href} 
                  className="text-[#FF6600] hover:text-[#E55A00] hover:underline transition-colors duration-200"
                >
                  {item.content}
                </a>
              ) : (
                <p 
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Google Map */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <div className="bg-[#FF6600] p-4">
          <h3 className="text-white font-semibold text-lg">
            Visit Our {contactData.name} Office
          </h3>
        </div>
        <iframe
          title={`Map of ${contactData.name}`}
          className="w-full h-64"
          src={contactData.contactInfo.mapSrc}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactInfo;
