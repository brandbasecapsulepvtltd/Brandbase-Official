import { twMerge } from "tailwind-merge";

// FeatureCard Component
const FeatureCard = (props) => {
  const { className, title, description, children } = props;
  return (
    <div
      className={twMerge(
        "bg-white p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group",
        className
      )}
    >
      <div className="aspect-video overflow-hidden rounded-xl">
        {children}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#FF6600] transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 mt-3 leading-relaxed text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};

// Tag Component
const Tag = ({ children }) => {
  return (
    <span className="bg-[#FF6600] text-white inline-flex px-4 py-2 rounded-full font-medium text-xs md:text-sm tracking-wide">
      {children}
    </span>
  );
};

// Features Component
const Features = () => {
  const features = [
    "Custom Built Stalls",
    "Modular Exhibition Stalls",
    "Wooden Fabricated Stalls",
    "Maxima / Octonorm Stalls",
    "Hybrid Exhibition Stalls",
    "Raw Space Turnkey Setup",
  ];

  const stallImg1 = "https://www.brandbasecapsule.com/assets/img/Exhibition%20Management/Indian%20Exhibition/39.jpg";
  const stallImg2 = "https://www.brandbasecapsule.com/assets/img/Exhibition%20Management/Indian%20Exhibition/36.jpg";

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <Tag>Our Services</Tag>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-4 max-w-4xl mx-auto leading-tight">
            Exhibition Solutions That <span className="text-[#FF6600]">Stand Out</span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Professional exhibition stall designs that capture attention and drive meaningful engagement
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Left Card - Professional Stall Design */}
          <FeatureCard
            title="Professional Stall Design"
            description="From concept to creation, we build visually stunning, functional, and brand-focused exhibition stalls that make lasting impressions."
          >
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              <img
                src={stallImg1}
                alt="Professional exhibition stall design"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
            </div>
          </FeatureCard>

          {/* Center Card - Achievements */}
          <div className="bg-gradient-to-br from-[#FF6600] to-orange-600 p-6 rounded-2xl shadow-lg flex items-center justify-center">
            <div className="text-center text-white p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 font-serif">
                We've Achieved{" "}
                <span className="text-white">
                  Incredible
                </span>{" "}
                Growth
              </div>
              <p className="text-orange-100 text-sm sm:text-base md:text-lg font-medium">
                Delivering excellence in exhibition stall design nationwide
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">500+</div>
                  <div className="text-orange-100 text-xs sm:text-sm">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">50+</div>
                  <div className="text-orange-100 text-xs sm:text-sm">Cities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Fast Production & Setup */}
          <FeatureCard
            title="Fast Production & Setup"
            description="Quick fabrication, smooth installation, and timely delivery ensuring your exhibition success without delays."
          >
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              <img
                src={stallImg2}
                alt="Fast stall production and setup"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
            </div>
          </FeatureCard>
        </div>

        {/* Stall Types Section */}
        <div className="mt-16 md:mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-gray-900 mb-3">
              Our Exhibition Stall Types
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of stall solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature}
                className="bg-white border border-orange-100 hover:border-[#FF6600] hover:shadow-md transition-all duration-300 p-4 rounded-xl group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#FF6600] text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-900 group-hover:text-[#FF6600] transition-colors duration-300 text-sm md:text-base">
                    {feature}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;