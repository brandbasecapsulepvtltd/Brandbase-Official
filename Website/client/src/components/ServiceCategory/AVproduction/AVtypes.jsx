"use client";

// Video production features data
const videoProductionFeatures = [
  {
    id: 1,
    title: "Corporate Video Production",
    description: "Professional corporate videos that communicate your brand's story with clarity and impact. From company profiles to executive messages, we create compelling narratives that resonate with stakeholders and enhance your corporate identity.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    imagePosition: 'right'
  },
  {
    id: 2,
    title: "Marketing & Promotional Videos",
    description: "High-conversion marketing videos designed to captivate your audience and drive results. Our data-driven approach combines creative storytelling with strategic marketing principles to deliver videos that boost engagement and ROI.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    imagePosition: 'left'
  },
  {
    id: 3,
    title: "Product Demo & Explainer Videos",
    description: "Clear, engaging product demonstrations that simplify complex features and highlight benefits. Using animation and live-action techniques, we create videos that educate customers and accelerate the buying journey.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    imagePosition: 'right'
  },
  {
    id: 4,
    title: "Event Coverage & Highlights",
    description: "Comprehensive event video coverage that captures the energy and essence of your occasion. From conferences to product launches, we deliver highlight reels and full recordings that extend your event's reach and impact.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    imagePosition: 'left'
  },
  {
    id: 5,
    title: "Social Media Video Content",
    description: "Platform-optimized video content tailored for maximum engagement on social media. From short-form TikTok/Reels to longer YouTube content, we create videos that stop the scroll and drive meaningful interactions.",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    imagePosition: 'right'
  },
  {
    id: 6,
    title: "Testimonial & Case Study Videos",
    description: "Authentic customer testimonials and case study videos that build trust and credibility. We professionally capture real stories that demonstrate your value proposition and influence potential customers.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    imagePosition: 'left'
  }
];

const AVtypes = () => {
  return (
    <div className="w-full bg-white dark:bg-black">
      {videoProductionFeatures.map((feature, index) => (
        <div
          key={feature.id}
          className={`flex flex-col ${
            feature.imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } items-center gap-8 lg:gap-12 px-6 sm:px-8 lg:px-16 py-12 lg:py-20 ${
            index % 2 === 0 ? 'bg-white dark:bg-black' : 'bg-white dark:bg-black'
          }`}
        >
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-orange-600 font-bold text-lg">0{feature.id}</span>
              <div className="h-0.5 w-8 bg-orange-600"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {feature.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
              {feature.description}
            </p>
            <button className="self-start px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-300">
              Start Project
            </button>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-md h-80 sm:h-96 lg:h-96 xl:h-[500px] overflow-hidden rounded-2xl shadow-xl">
              <img
                src={feature.image}
                alt={feature.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AVtypes;
