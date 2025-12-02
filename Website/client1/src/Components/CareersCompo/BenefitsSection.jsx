import React from 'react';

const BenefitsSection = () => {
  // Array of benefits for easy rendering
  const benefitsList = [
    'Competitive salary and equity',
    'Comprehensive medical, dental, and vision insurance',
    'One Medical Membership',
    '401(k) including an employer match',
    'Flexible PTO',
    'Parental leave',
    'Monthly wellness stipend',
    'WFH stipend',
    'Relocation support to move to NYC',
    'Pet insurance',
  ];

  return (
    // Outer container with the dark background color (#1A322C is a good close match)
    <section className="bg-orange-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flex container to hold the left column (title + image) and the right column (benefits list) */}
        <div className="flex flex-col lg:flex-row lg:space-x-20">
          
          {/* LEFT COLUMN: Title and Image */}
          <div className="mb-8 lg:mb-0 lg:w-1/2 flex flex-col items-start">
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#303236] leading-tight mb-8 items-center">
              Benefits
            </h2>
            {/* Image below the Benefits text */}
            <div className="w-full relative h-48 md:h-64 lg:h-85 rounded-lg overflow-hidden mt-4">
              <img
                src="https://images.pexels.com/photos/6774432/pexels-photo-6774432.jpeg"
                alt="People collaborating in an office"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Benefits List - shifted to the complete right */}
          <div className="lg:w-2/5 mt-5 lg:ml-auto"> {/* Added lg:ml-auto to push it to the right */}
            <ul className="list-none space-y-3">
              {benefitsList.map((benefit, index) => (
                <li key={index} className="flex items-start text-xl text-gray-900 font-semibold">
                  {/* Custom bullet point (mimicking the default list style with a custom color) */}
                  <span className="text-2xl mr-2 text-orange-500 font-extrabold -translate-y-1">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;