import React from 'react';
import { ChevronRight, Play } from 'lucide-react';

const BrandbaseCapsuleCareersSection = () => {
  // Provided media links
  const media = {
    video: 'https://www.pexels.com/download/video/6804649/',
    img_balloons: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg',
    img_group_party: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg',
    img_beach_couple: 'https://storage.googleapis.com/veed-dev-strapi-bucket/89e40ef7353df35649ae9135a9ca35eeec76a33a_be0a2d76d5/89e40ef7353df35649ae9135a9ca35eeec76a33a_be0a2d76d5.jpg',
    img_beach_group: 'https://storage.googleapis.com/veed-dev-strapi-bucket/73ace3a3708fbe68b8ef3b9a267e4d84966ded31_496c24cee3/73ace3a3708fbe68b8ef3b9a267e4d84966ded31_496c24cee3.jpg',
    img_dance_person: 'https://storage.googleapis.com/veed-dev-strapi-bucket/7209bf18ff9b211cc324a5d6810f9c2c9cfea52c_4b12295ea6/7209bf18ff9b211cc324a5d6810f9c2c9cfea52c_4b12295ea6.jpg',
    img_community_hug: 'https://storage.googleapis.com/veed-dev-strapi-bucket/73ace3a3708fbe68b8ef3b9a267e4d84966ded31_496c24cee3/73ace3a3708fbe68b8ef3b9a267e4d84966ded31_496c24cee3.jpg',
    img_community_dance: 'https://storage.googleapis.com/veed-dev-strapi-bucket/7209bf18ff9b211cc324a5d6810f9c2c9cfea52c_4b12295ea6/7209bf18ff9b211cc324a5d6810f9c2c9cfea52c_4b12295ea6.jpg',
  };

  return (
    <div className="bg-white font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* --- Hero-style Header --- */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#303236] leading-tight mb-6">
            STILL CURIOUS?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what it's like to be part of our story
          </p>
        </div>

        {/* --- Section 1: Life at Brandbase Capsule (Hero-style Layout) --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 mb-20">
          
          {/* Left Content Column */}
          <div className="lg:w-5/12 xl:w-4/12 flex flex-col pt-4">
            <h3 className="text-3xl md:text-4xl font-bold text-[#303236] leading-tight mb-6">
              Life at Brandbase Capsule
            </h3>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                From helping our users tell their stories through videos, to dancing to "Mamma Mia" during our last offsite in Mallorca, we are <span className="font-semibold text-orange-500">people-first</span>.
              </p>
              
              <p className="text-lg">
                Building a company from the ground up is hard work, which is why we value transparency, encourage you to embrace uncertainty and always seek to be the best in your career.
              </p>
              
              <p className="text-lg">
                If you seek autonomy and know good is never good enough, and you are comfortable being yourself and quirky is okay in the office, you will feel right at home.
              </p>
            </div>

            <button className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors w-fit flex items-center mt-8">
              Watch our culture video
              <Play size={18} className="ml-2" />
            </button>
          </div>

          {/* Right Media Column */}
          <div className="lg:w-7/12 xl:w-8/12 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px]">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
                poster={media.img_balloons}
              >
                <source src={media.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* --- Section 2: Where and how we work --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 mb-20">
          
          {/* Left Media Column */}
          <div className="lg:w-7/12 xl:w-8/12 relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px]">
              <img 
                src={media.img_group_party} 
                alt="Group of colleagues socializing outdoors" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:w-5/12 xl:w-4/12 flex flex-col pt-4 order-1 lg:order-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#303236] leading-tight mb-6">
              Where and how we work
            </h3>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                At Brandbase Capsule we are <span className="font-semibold text-orange-500">hybrid</span>, enabling teams and individuals to design their day and integrate work and life.
              </p>
              
              <p className="text-lg">
                Our hybrid approach gives team members the best of both worlds, with a minimum of <span className="font-semibold text-orange-500">2 days per week</span> in our offices to drive collaboration, connectivity, celebration and team rituals.
              </p>
            </div>

            <button className="bg-white text-orange-500 font-semibold py-3 px-6 rounded-lg shadow-md border border-orange-500 hover:bg-orange-50 transition-colors w-fit flex items-center mt-8">
              Explore our offices
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        </div>

        {/* --- Section 3: Compensation & Benefits --- */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
            
            {/* Left Content Column */}
            <div className="lg:w-5/12 xl:w-4/12 flex flex-col pt-4">
              <h3 className="text-3xl md:text-4xl font-bold text-[#303236] leading-tight mb-6">
                Compensation & Benefits
              </h3>
              
              <div className="space-y-4 text-gray-700 mb-8">
                <p className="text-lg">
                  We seek to hire, retain and develop exceptional talent. We have developed top-of-market compensation programs to support this, paying <span className="font-semibold text-orange-500">above market</span> base salaries and rewarding high performance.
                </p>
              </div>

              {/* Benefits List */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-[#303236] mb-4">Our global benefits</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    <span className="font-semibold">Unlimited PTO</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    <span className="font-semibold">Mental health Services</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    <span className="font-semibold">Flexible working hours</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    <span className="font-semibold">Learning & development budget</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-4 italic">
                  *Statutory benefits are mandated by each country's regulatory guidelines. These vary by country.
                </p>
              </div>
            </div>

            {/* Right Media Grid */}
            <div className="lg:w-7/12 xl:w-8/12 relative">
              <div className="grid grid-cols-2 gap-6 h-full">
                {/* Main Image */}
                <div className="col-span-2 rounded-2xl overflow-hidden shadow-2xl h-[300px]">
                  <img 
                    src={media.img_dance_person} 
                    alt="Person dancing on a stage" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Smaller Images */}
                <div className="rounded-2xl overflow-hidden shadow-2xl h-[250px]">
                  <img 
                    src={media.img_beach_couple} 
                    alt="Couple on the beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="rounded-2xl overflow-hidden shadow-2xl h-[250px]">
                  <img 
                    src={media.img_beach_group} 
                    alt="Group enjoying food outdoors" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Section 4: Community --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          
          {/* Left Content Column */}
          <div className="lg:w-5/12 xl:w-4/12 flex flex-col pt-4">
            <h3 className="text-3xl md:text-4xl font-bold text-[#303236] leading-tight mb-6">
              Community
            </h3>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                We host <span className="font-semibold text-orange-500">community-focused events</span> year-round, from our Garnier Women in Tech in London and virtual #coffee-buddies chats, to our annual company offsite.
              </p>
              
              <p className="text-lg">
                Whether remote or in-person, we're always fostering connection and belonging.
              </p>
            </div>

            <button className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors w-fit flex items-center mt-8">
              Join our community
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>

          {/* Right Media Column */}
          <div className="lg:w-7/12 xl:w-8/12 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px]">
              <img 
                src="https://images.pexels.com/photos/7888986/pexels-photo-7888986.jpeg" 
                alt="Colleagues hugging" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BrandbaseCapsuleCareersSection;