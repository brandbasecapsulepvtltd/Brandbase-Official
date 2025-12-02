import React from 'react';
import { ChevronRight } from 'lucide-react'; // Using lucide-react for the arrow icon

// Using the image URLs provided by the user
const stripeImageUrls = [
  "https://images.stripeassets.com/fzn2n1nzq965/5ajrOXU86ZfILeE5fvcLi4/1eacdd1a983ad3104a028d0afd937484/download.jpg?q=80&fm=webp&w=960", // Main center image
  "https://images.stripeassets.com/fzn2n1nzq965/6rBEr4BoSE581fsYZp97Xh/64ca94469c5918436b9ada22574c8f0d/tats.jpg?q=80&fm=webp&w=960", // Top right image
  "https://images.stripeassets.com/fzn2n1nzq965/41WZOIX6IuJeM1HgjPMrC0/4c3fd00fb18131f7e95252176aa86888/stripe_037.jpg?q=80&fm=webp&w=960", // Middle right image
  "https://images.stripeassets.com/fzn2n1nzq965/2nFBS1auy6yT1zs2OmBXfQ/f740d1bb9ddfbdf3bae0b793317e7b07/20_Engineer.jpg?q=80&fm=webp&w=960", // Bottom right image
  "https://images.stripeassets.com/fzn2n1nzq965/29jCqfvYZOFHItd7QrDEUx/11cc99876b887523724b3d14bf4de9f6/09_Balcony_1295.jpg?q=80&fm=webp&w=960", // Bottom center image
];

const LeadershipAvatar = ({ url }) => (
  <img 
    src={url} 
    alt="Leadership member" 
    className="w-10 h-10 rounded-full object-cover border-2 border-white"
  />
);

const CareerHero = () => {
  return (
    <div className="bg-white font-sans overflow-hidden mt-5">
      <div className="max-w-[1400px] mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          
          {/* --- Left Content Column --- */}
          <div className="lg:w-5/12 xl:w-4/12 flex flex-col pt-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#303236] leading-tight mb-8">
              Join the mission that needs your talent
            </h1>

            <p className="text-lg text-gray-900 mb-8 max-w-lg">
              At <span className="font-semibold text-orange-500">BrandBase Capsule</span>, we're not just building products—we're architecting the future of digital identity. 
          Your unique talent is the missing piece in our mission to redefine how brands connect in the metaverse. 
          This is where your skills become legacy and your code writes history.
            </p>

            <button className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors w-fit flex items-center">
              See open roles
            </button>
          </div>

          {/* --- Right Image Grid Column (Layout mimicking the screenshot) --- */}
          <div className="lg:w-7/12 xl:w-8/12 relative -mr-16 md:-mr-24 lg:-mr-32 xl:-mr-48 2xl:-mr-64 pt-4">
            
            {/* Image Grid Container - using Tailwind's arbitrary values for precise grid setup */}
            <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto auto auto' }}>
              
              {/* Image 1: Top Center (Tall & wide-ish) */}
              <div 
                className="rounded-xl overflow-hidden shadow-lg h-[280px] lg:h-[350px] row-span-2 col-span-1" 
                style={{ transform: 'translateY(16px)' }} // Slight offset down to match screenshot
              >
                <img 
                  src={stripeImageUrls[0]} 
                  alt="Three colleagues talking" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 2: Top Right */}
              <div className="rounded-xl overflow-hidden shadow-lg h-[130px] lg:h-[160px] col-span-1">
                <img 
                  src={stripeImageUrls[1]} 
                  alt="Person working at a computer" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Leadership Card (Fits where Image 3 is in the grid) */}
              <div className="bg-white rounded-xl shadow-xl p-4 flex flex-col justify-center border border-gray-100 col-span-1 h-[140px] lg:h-[180px]">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Hear from our leadership</h3>
                <div className="flex -space-x-2 mb-3">
                  {/* Random avatar placeholders */}
                  <LeadershipAvatar url="https://i.pravatar.cc/150?img=68" />
                  <LeadershipAvatar url="https://i.pravatar.cc/150?img=52" />
                  <LeadershipAvatar url="https://i.pravatar.cc/150?img=61" />
                  <LeadershipAvatar url="https://i.pravatar.cc/150?img=33" />
                </div>
                <a href="#" className="text-[#635BFF] text-sm font-medium flex items-center hover:underline">
                  Watch video 
                  <ChevronRight size={14} className="ml-1" />
                </a>
              </div>
              
              {/* Image 4: Bottom Center */}
              <div className="rounded-xl overflow-hidden shadow-lg h-[240px] lg:h-[280px] col-span-1">
                <img 
                  src={stripeImageUrls[4]} 
                  alt="Two people working outside" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 5: Bottom Right (Looks slightly taller than the center image) */}
              <div className="rounded-xl overflow-hidden shadow-lg h-[240px] lg:h-[280px] col-span-1">
                <img 
                  src={stripeImageUrls[3]} 
                  alt="Person working on a monitor" 
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CareerHero;