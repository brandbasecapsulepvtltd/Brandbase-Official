import React, { useState, useEffect } from 'react';
import { Globe, Phone, MapPin } from 'lucide-react';

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Data provided in the prompt
  const slides = [
    {
      id: 1,
      title: "Create Experiences That Stand Out",
      subtext: "From exhibitions to large-scale events, we craft immersive experiences that leave a lasting impact on your audience.",
      image: "https://ik.imagekit.io/vinayak06/11.jpg?updatedAt=1763372433537",
    },
    {
      id: 2,
      title: "Expert Web & App Development Solutions",
      subtext: "Get world-class website development, app creation, and modern interfaces designed to drive growth and engagement.",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
    },
    {
      id: 3,
      title: "Build a Brand That Truly Stands Out",
      subtext: "We craft powerful brand identities with strategic design, strong messaging, and visuals that resonate with your market.",
      image: "https://images.squarespace-cdn.com/content/v1/522ea6f5e4b074ba686e497c/1500331078775-8D05Q26X151528641198/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UHU9zBfL7d5y27eWwM1q8Z9a7n6k8t4k7e7d8e9f0g1h/image-asset.jpeg", // Replaced truncated URL with placeholder logic or valid ending for stability
    },
    {
      id: 4,
      title: "Grow Faster in the Digital World",
      subtext: "We handle everything—from SEO and social ads to social media setup, content creation, and performance tracking.",
      image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
    },
    {
      id: 5,
      title: "Create Stories That Captivate",
      subtext: "High-quality audio and video production services that bring your brand stories to life with cinematic excellence.",
      image: "https://images.pexels.com/photos/8412361/pexels-photo-8412361.jpeg",
    }
  ];

  // Auto-slide logic (5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-screen min-h-[600px] bg-white overflow-hidden flex flex-col justify-between font-sans">
      
      {/* --- LEFT CONTENT SECTION --- */}
      <div className="relative z-10 w-full lg:w-[50%] h-full flex flex-col justify-between px-8 md:px-16 py-12">
        
        {/* Header / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-sm bg-gray-200">
             {/* Placeholder Avatar based on image */}
            <img 
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100" 
              alt="Profile" 
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-black uppercase leading-tight">Your Logo</h3>
            <p className="text-[10px] text-gray-500 tracking-wider uppercase">ELEVATE YOUR PERSPECTIVE</p>
          </div>
        </div>

        {/* Main Text Content (Animated key ensures fade effect on change) */}
        <div key={currentSlide.id} className="animate-fade-in my-auto max-w-lg">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight mb-6">
            {currentSlide.title}
          </h1>
          
          {/* Black Separator Line */}
          <div className="w-16 h-1 bg-black mb-6"></div>

          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            {currentSlide.subtext}
          </p>

          <button className="text-sm font-bold tracking-widest text-black uppercase hover:text-gray-600 transition-colors flex items-center gap-2">
            JOIN US TO EXPLORE
          </button>
        </div>

        {/* Footer Info */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-xs text-gray-500 mt-auto">
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-black" />
            <span>yourwebsite.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-black" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-black" />
            <span>20 Fieldstone Dr, Roswell, GA</span>
          </div>
        </div>
      </div>

      {/* --- RIGHT IMAGE SECTION (The Slope) --- */}
      <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-0 pointer-events-none lg:pointer-events-auto">
        <div 
          className="w-full h-full relative"
          // This clip-path creates the diagonal slope: Top-left point starts 15% in, Bottom-left starts at 0%
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }} 
        >
            {/* Image Overlay/Gradient (Optional, to match contrast if needed) */}
            <div className="absolute inset-0 bg-black/10 z-10"></div>
            
            <img 
              key={currentSlide.id}
              src={currentSlide.image} 
              alt="Hero Slide" 
              className="w-full h-full object-cover animate-scale-in"
            />
        </div>
      </div>

      {/* Tailwind Custom Animations (Add these to your tailwind.config.js or use style tag below) */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(1.05); opacity: 0.8; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;