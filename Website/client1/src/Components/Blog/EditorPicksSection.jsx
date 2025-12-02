import React from 'react';

const largeImageUrl = "https://ramp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F6jz6vxxd%2Fproduction%2F6d3c4809dcfbf061fa4b8edd5954aa869935fb13-2400x1200.png%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75";
const governanceImageUrl = "https://ramp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F6jz6vxxd%2Fproduction%2Fc299a1209d45cff7578bcc95d20f2232aaa2ccae-2400x1200.png%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75";
const communityImageUrl = "https://ramp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F6jz6vxxd%2Fproduction%2F5fb6d584999c4f9852a55b0fdaa98e4f27cdcea4-1457x728.png%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75";
const postmarkImageUrl = "https://ramp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F6jz6vxxd%2Fproduction%2Fdfd350c4736954aace334bd159fc68ff2b90e283-1920x1280.webp%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75";

const EditorPicksSection = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-semibold mb-10 md:mb-12 text-gray-900">
          Editor's picks
        </h2>

        {/* Main Content Grid: 3 columns on large screens (2/3 large feature, 1/3 stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* LEFT: Large Featured Article (spans 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <a href="#" className="group block h-full">
              {/* Image Container: Aspect ratio set to roughly 2:1 to match the visual */}
              <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden mb-6">
                <img 
                  src={largeImageUrl} 
                  alt="Drop your invoice feature" 
                  className="object-cover w-full h-full transform transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Text Content */}
              <p className="text-sm font-semibold text-gray-500 mb-1">ARTICLE</p>
              <h3 className="text-2xl md:text-4xl font-bold mb-3 leading-snug text-gray-900 group-hover:text-indigo-600 transition duration-300">
                AP just became autonomous
              </h3>
              <p className="text-lg text-gray-700">
                Agents for AP can code line items, check for fraud, recommend approvals, and complete card payments.
              </p>
            </a>
          </div>

          {/* RIGHT: Stack of 3 smaller items (spans 1 column) */}
          <div className="lg:col-span-1 space-y-8 lg:space-y-10">

            {/* 1. From chaos to clarity: Governance that runs itself (Text then small image) */}
            
            {/* Divider (optional, but helps match the separation in the original image) */}
            <div className="border-t border-gray-200"></div>


            {/* 2. Introducing the Ramp Developer Community (Image then text) */}
            <a href="#" className="group flex items-start pt-8">
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden mr-4 bg-gray-100">
                <img 
                  src={communityImageUrl} 
                  alt="Ramp Developer Community logo" 
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">ARTICLE</p>
                <h3 className="text-lg font-bold mb-1 leading-tight text-gray-900 group-hover:text-indigo-600 transition duration-300">
                  Introducing the Ramp Developer Community
                </h3>
                <p className="text-sm text-gray-700">
                  Customers and partners can now build finance agents in Ramp with our new MCP.
                </p>
              </div>
            </a>
            
            {/* Divider (optional, but helps match the separation in the original image) */}
            <div className="border-t border-gray-200"></div>


            {/* 3. How Postmark exceeded their free cash flow goals (Image then text) */}
            <a href="#" className="group flex items-start pt-8">
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden mr-4 bg-gray-100">
                <img 
                  src={postmarkImageUrl} 
                  alt="Woman with phone for Postmark story" 
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">CUSTOMER STORY</p>
                <h3 className="text-lg font-bold mb-1 leading-tight text-gray-900 group-hover:text-indigo-600 transition duration-300">
                  How Postmark exceeded their free cash flow goals with Ramp
                </h3>
                <p className="text-sm text-gray-700">
                  Learn how Postmark achieved its free cash flow goals in seven months instead of 12 and cut its monthly close time in half after optimizing cash flow, forecasting, and financial strategy with Ramp.
                </p>
              </div>
            </a>

                        <a href="#" className="group flex items-start pt-8">
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden mr-4 bg-gray-100">
                <img 
                  src={communityImageUrl} 
                  alt="Ramp Developer Community logo" 
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">ARTICLE</p>
                <h3 className="text-lg font-bold mb-1 leading-tight text-gray-900 group-hover:text-indigo-600 transition duration-300">
                  Introducing the Ramp Developer Community
                </h3>
                <p className="text-sm text-gray-700">
                  Customers and partners can now build finance agents in Ramp with our new MCP.
                </p>
              </div>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorPicksSection;